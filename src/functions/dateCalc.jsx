export function getDatesArray(startDate, numDays) {
  const datesArray = [];

  // Create a new Date object from the start date
  let currentDate = new Date(startDate);

  // Add the start date to the array
  datesArray.push(new Date(currentDate));

  // Loop through the remaining days and add them to the array
  for (let i = 1; i < numDays; i++) {
    currentDate.setDate(currentDate.getDate() + 1);
    datesArray.push(new Date(currentDate));
  }

  return datesArray;
}

export const getCurrentFinancialYear = () => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  let financialYear = "";

  // Financial year starts from April
  if (currentMonth >= 4) {
    financialYear = currentYear.toString() + "-" + (currentYear + 1).toString();
  } else {
    financialYear = (currentYear - 1).toString() + "-" + currentYear.toString();
  }

  return { financialYear, currentMonth, currentYear };
};
