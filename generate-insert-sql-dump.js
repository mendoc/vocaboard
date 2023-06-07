const fs = require('fs');
const csv = require('csv-parser');

const outputFilePath = 'insert-dump.sql';

// Création du fichier de sortie
const outputStream = fs.createWriteStream(outputFilePath, { flags: 'a' });

// Ajoute une requête SQL au fichier de sortie
function writeSqlQuery(query) {
  outputStream.write(query + '\n');
}

// Lecture du fichier CSV
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    const keys = Object.keys(row);
    const values = Object.values(row);
    const columns = keys.join(', ');
    const escapedValues = values.map((value) => {
      // Échappe les caractères spéciaux pour éviter les problèmes d'insertion
      return value.replace(/'/g, "\\'");
    });
    const sql = `INSERT INTO candidats (${columns}) VALUES ('${escapedValues.join("', '")}');`;
    writeSqlQuery(sql);
  })
  .on('end', () => {
    outputStream.end();
    console.log('Génération du fichier dump SQL terminée.');
  });
