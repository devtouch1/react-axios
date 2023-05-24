const fs = require('fs');

// Ler o arquivo de texto
const data = fs.readFileSync('placas', 'utf-8');

// Dividir o texto em linhas
const linhas = data.split('\n');

// Criar um array para armazenar os objetos
const objetos = [];

// Iterar sobre cada linha
for (const linha of linhas) {
  // Separar a linha em chave e valor
  const [value, label] = linha.split('|');

  // Criar o objeto correspondente
  const objeto = {
    value: value.trim(),
    label: label.trim()
  };

  // Adicionar o objeto ao array
  objetos.push(objeto);
}

// Imprimir o array de objetos
console.log(objetos);
