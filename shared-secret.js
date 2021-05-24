const shamirs = require('shamirs-secret-sharing');

/**
 * Asumimos que tenemos una contraseña, que queremos repartir entre 3 hermanos.
 * Como mínimo se necesitan 2 hermanos para que puedan recuperar la contraseña.
 */

// La clave que queremos partir
const password = "incredibly_hard_password";

// La librería requiere que se pase la password como un buffer
const bufferPassword = Buffer.from(password);

// Partimos la clave en 3 cachos diferentes, siendo necesarias 2 de ellas
const passwordPieces = shamirs.split(bufferPassword, {shares: 3, threshold: 2});
console.log("Se ha separado la clave en las siguientes piezas:");
console.log(passwordPieces);

// La reconstruímos usando las 2 primeras piezas
const recovered = shamirs.combine([
    passwordPieces[0],
    passwordPieces[1]
]);

console.log("Clave recuperada:");
console.log(recovered.toString())