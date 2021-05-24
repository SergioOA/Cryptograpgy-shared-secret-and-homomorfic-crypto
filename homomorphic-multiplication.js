const paillier = require('paillier-bigint')

async function init() {
    
    // Generamos el keyring de cifrado de paillier
    const {publicKey, privateKey} = await paillier.generateRandomKeys(512);

    /**
     * Para usar la firma homomórfica en la multiplicación tenemos que
     * multiplicar nuestro valor por el valor cifrado.
     */

    const startingValue = 10n;
    const multiplicationFactor = 5n;

    // Primero ciframos el primer valor para poder empezar a hacer multiplicaciones
    const encryptedFirstValue = publicKey.encrypt(startingValue);

    // Ahora ya podemos multiplicar por nuestro factor de multiplicado
    const result = publicKey.multiply(encryptedFirstValue, multiplicationFactor);

    // Desencriptamos para ver el resultado de la multiplicación
    const decrypt = privateKey.decrypt(result);
    console.log("Resultado de la multiplicación: ", decrypt.toString());

}

init();
