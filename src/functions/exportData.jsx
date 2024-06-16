import * as xlsx from "xlsx";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
export const exportToExcel = (rows, table,name) => {
  const columnHeaders = table
    .getAllFlatColumns()
    .map((e) => e.columnDef.header);
  const new_row = rows.map((e, idx) => {
    e[0] = idx + 1;
    return e;
  });
  const worksheetData = [
    // Add the column headers
    columnHeaders,
    // Add the table data rows
    ...new_row,
  ];

  const worksheet = xlsx.utils.aoa_to_sheet(worksheetData);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = xlsx.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  saveAs(data, name+".xlsx");
  
};

export const exportToCSV = (table,name) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // Add headers
  const headers = table.getAllFlatColumns().map((e) => e.columnDef.header);
  worksheet.addRow(headers);

  // Add data
  let array = [];
  table.getFilteredRowModel().rows.forEach((row) => {
    const cells = row.getVisibleCells();
    const values = cells.map((cell) => cell.getValue());
    // console.log(values);
    array.push(values);
  });
  const new_row = array.map((e, idx) => {
    e[0] = idx + 1;
    return e;
  });

  worksheet.addRows(new_row);
  // Generate CSV
  workbook.csv.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, name+".csv");
  });
};
