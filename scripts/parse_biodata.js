const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile('C:\\Users\\Fayaz\\OneDrive\\Desktop\\2006\\kew\\Kashmir_Eco_Watch_2452_Biodiversity_Database.xlsx');
const sheetNames = workbook.SheetNames;
console.log('Sheets:', sheetNames);

const output = {};
for (const sheet of sheetNames) {
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
  output[sheet] = {
    rowCount: data.length,
    columns: data.length > 0 ? Object.keys(data[0]) : [],
    sample: data.slice(0, 2)
  };
}

fs.writeFileSync('biodata_summary.json', JSON.stringify(output, null, 2));
console.log('Saved summary to biodata_summary.json');
