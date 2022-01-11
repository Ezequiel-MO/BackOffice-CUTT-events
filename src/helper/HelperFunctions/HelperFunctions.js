export const checkForDuplicates = (string, array) => {
  let codeIsUnique = true;
  for (let i = 0; i < array.length; i++) {
    if (array[i].toLowerCase() === string.toLowerCase()) {
      codeIsUnique = false;
    }
  }
  return codeIsUnique;
};

export const checkCodeIsUnique = (code, array) => {
  const codeArr = array?.map((project) => project.code);
  const codeIsUnique = checkForDuplicates(code, codeArr);
  return codeIsUnique;
};
