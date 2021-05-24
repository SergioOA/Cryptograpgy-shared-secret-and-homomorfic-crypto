const paillier = require('paillier-bigint')

async function init() {

    // Generamos el keyring de cifrado de paillier
    const {publicKey, privateKey} = await paillier.generateRandomKeys(512);

    // Números que vamos a sumar usando cryptografía homomórfica
    const nums = [1n, 2n, 3n, 4n];

    // Resultado de la suma de las encriptaciones en pallier de el array de números "nums"\
    const result = nums.reduce((a, b) => {
        
        // Lo ciframos
        const crypted = publicKey.encrypt(b);
        console.log("Cifrado número: " + b);
        console.log("Valor cifrado: " + crypted.toString(16));

        // Lo sumamos al último valor
        return publicKey.addition(a, crypted);

    }, publicKey.encrypt(0n));

    // Desencriptamos el resultado
    const decrypted = privateKey.decrypt(result);
    console.log('Resultado:', decrypted.toString());

}

init();
