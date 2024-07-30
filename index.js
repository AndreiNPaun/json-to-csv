const fs = require('fs');

// Read JSON file
const rawData = fs.readFileSync('data.json');
const jsonData = JSON.parse(rawData);

// Extract the relevant data
const data = jsonData[1];

// Restructure data
const transformedData = data.map((item) => ({
  indicatorValue: item.indicator.value,
  countryValue: item.country.value,
  countryiso3code: item.countryiso3code,
  date: item.date,
  value: item.value,
}));

// Define the fields for the CSV
const fields = [
  'indicatorValue',
  'countryValue',
  'countryiso3code',
  'date',
  'value',
];

// Create CSV
let csv = fields.join(',') + '\n';
transformedData.forEach((row) => {
  csv +=
    fields
      .map((field) =>
        JSON.stringify(row[field], (key, value) =>
          value === null ? '' : value
        )
      )
      .join(',') + '\n';
});

// console.log(csv);

// Write CSV to a file
fs.writeFileSync('output.csv', csv);
