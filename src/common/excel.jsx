
import  { FC } from 'react';
import ExcelJS from 'exceljs';
import { RiFileExcel2Fill } from "react-icons/ri"



const ExportAsExcel= ({ getSheetData, sheetName, fileName, heading }) => {
  const realXlsx = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    const data = getSheetData();
      // Check if there is no data
      if (!data || data.length === 0) {
        alert('No data found for export.');
        return;
      }
// Add the heading row
if (heading) {
  const headingRow = worksheet.addRow([]);
  headingRow.getCell(1).value = heading;
  headingRow.getCell(1).font = { bold: true, size: 14 };
  headingRow.getCell(1).alignment = { horizontal: 'left' };
  headingRow.getCell(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'ADD8E6' },
  };
  const endColumn = String.fromCharCode(65 + data[0] ? Object.keys(data[0]).length - 1 : 0);
  worksheet.mergeCells(`A1:${endColumn}1`);
  worksheet.addRow([]); // Add an empty row after the heading
}


    if (data?.length > 0) {
      // Applying style to the header row
      const headerRow = worksheet.addRow(Object.keys(data[0]));
      headerRow.eachCell((cell) => {
        cell.font = { bold: true };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD7E4BC' } };
      });

      data.forEach((item) => {
        worksheet.addRow(Object.values(item));
      });

      // Adjust column widths based on content and heading
      worksheet.columns.forEach((column) => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell) => {
          const columnWidth = cell.value ? cell.value.toString().length : 10;
          if (columnWidth > maxLength) {
            maxLength = columnWidth;
          }
        });
        column.width = maxLength < 10 ? 10 : maxLength + 2;
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    if (navigator.msSaveBlob) {
      // For IE browser
      navigator.msSaveBlob(blob, fileName);
    } else {
      // For other browsers
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="col-12 col-lg-12 text-md-end">
      {/* Additional styling for the div */}

        {/* Modified button for exporting as Excel */}
        {/* <button  onClick={realXlsx}>
          <i className="bi bi-pencil-fill" /> Export As Excel
        </button> */}
   
      <div className='flex justify-end text-meta-3 text-3xl hover:scale-30 duration-300 hover:transition-all ease-in-out transform mx-3'>
            <button onClick={realXlsx}>
              <RiFileExcel2Fill />
            </button>
          </div> 
    </div>
  );
};

export default ExportAsExcel;
