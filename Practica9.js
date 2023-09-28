const readline = require('readline');

// Crear una interfaz de lectura para la entrada estándar
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para leer una matriz 2x2 desde el usuario
function leerMatriz() {
  return new Promise((resolve, reject) => {
    const matriz = [];
    let fila = 0;

    const leerValor = () => {
      rl.question(`Ingrese el valor de la fila ${fila + 1}, columna 1: `, (valor1) => {
        rl.question(`Ingrese el valor de la fila ${fila + 1}, columna 2: `, (valor2) => {
          matriz[fila] = [parseFloat(valor1), parseFloat(valor2)];
          fila++;

          if (fila < 2) {
            leerValor();
          } else {
            resolve(matriz);
          }
        });
      });
    };

    leerValor();
  });
}

// Funciones para realizar operaciones con matrices
function sumarMatrices(matriz1, matriz2) {
  const resultado = [];
  for (let i = 0; i < 2; i++) {
    resultado[i] = [];
    for (let j = 0; j < 2; j++) {
      resultado[i][j] = matriz1[i][j] + matriz2[i][j];
    }
  }
  return resultado;
}

function restarMatrices(matriz1, matriz2) {
  const resultado = [];
  for (let i = 0; i < 2; i++) {
    resultado[i] = [];
    for (let j = 0; j < 2; j++) {
      resultado[i][j] = matriz1[i][j] - matriz2[i][j];
    }
  }
  return resultado;
}

function multiplicarMatrices(matriz1, matriz2) {
  const resultado = [];
  for (let i = 0; i < 2; i++) {
    resultado[i] = [];
    for (let j = 0; j < 2; j++) {
      resultado[i][j] = matriz1[i][j] * matriz2[i][j];
    }
  }
  return resultado;
}

function dividirMatrices(matriz1, matriz2) {
  const resultado = [];
  for (let i = 0; i < 2; i++) {
    resultado[i] = [];
    for (let j = 0; j < 2; j++) {
      if (matriz2[i][j] === 0) {
        throw new Error('No se puede dividir por cero. Ingrese matrices válidas.');
      }
      resultado[i][j] = matriz1[i][j] / matriz2[i][j];
    }
  }
  return resultado;
}

// Leer las dos matrices desde el usuario
console.log('Ingrese la primera matriz:');
leerMatriz()
  .then(matriz1 => {
    console.log('Ingrese la segunda matriz:');
    return leerMatriz()
      .then(matriz2 => {
        rl.close(); // Cerrar la interfaz después de leer ambas matrices
        return { matriz1, matriz2 };
      });
  })
  .then(({ matriz1, matriz2 }) => {
    // Calcular y mostrar los resultados
    const suma = sumarMatrices(matriz1, matriz2);
    const resta = restarMatrices(matriz1, matriz2);
    const producto = multiplicarMatrices(matriz1, matriz2);
    const division = dividirMatrices(matriz1, matriz2);

    console.log('Suma de las matrices:');
    console.table(suma);

    console.log('Resta de las matrices:');
    console.table(resta);

    console.log('Producto de las matrices:');
    console.table(producto);

    console.log('División de las matrices:');
    console.table(division);
  })
  .catch(error => {
    console.error('Ocurrió un error:', error.message);
  });
