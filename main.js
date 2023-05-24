const XLSX = require("xlsx");
const fs = require("fs");

function xlsxToObj(filePath, outputFilePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Lê a primeira planilha apenas
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  const headers = jsonData[0];
  const rows = jsonData.slice(1);

  const objects = rows.map((row) => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });

  const jsonContent = JSON.stringify(objects, null, 2);
  fs.writeFileSync(outputFilePath, jsonContent);

  console.log("Arquivo JSON gerado com sucesso!");
}

// Exemplo de uso
const filePath = "me-converta.xlsx";
const outputFilePath = "output/arquivo.json";
xlsxToObj(filePath, outputFilePath);
