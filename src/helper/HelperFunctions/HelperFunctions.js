import { baseAPI } from "../axios";

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

//Hotels
export const findSelectedOptions = (array, fullArray) => {
  let selectedOptionsFullObject = [];

  let flatArray = array?.map((item) => item.value);
  fullArray.forEach((item) => {
    if (flatArray.includes(item.name)) {
      selectedOptionsFullObject.push(item);
    }
  });
  return selectedOptionsFullObject;
};

//masterForms

export const transformValues = (valuesObj) => {
  const transformedValues = { ...valuesObj };
  transformedValues.textContent = JSON.stringify(valuesObj.textContent);
  transformedValues.introduction = JSON.stringify(valuesObj.introduction);
  transformedValues.coordinates = JSON.stringify([
    valuesObj.latitude,
    valuesObj.longitude,
  ]);
  delete transformedValues.latitude;
  delete transformedValues.longitude;

  return transformedValues;
};

export const fillFormData = (values, files) => {
  console.log("values", values, typeof values);
  let formData = new FormData();
  for (let key in values) {
    formData.append(key, values[key]);
  }
  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }
  return formData;
};

export const PostToEndpoint = (data, endpoint) => {
  baseAPI
    .post(endpoint, data)
    .then((res) => {
      console.log("res", res);
      return res.status;
    })
    .catch((err) => console.log("error", err));
};
