export function updateVal(e, index, allData, setAllData) {
  const key = e.target.name;
  const val = e.target.value;

  const new_array = [...allData];
  
  new_array[index] = {
    ...new_array[index],
    [key]: val,
  };
  setAllData(new_array);
  // console.log(new_array);
}
