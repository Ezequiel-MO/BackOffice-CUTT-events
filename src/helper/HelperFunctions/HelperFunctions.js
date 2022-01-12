import { baseAPI } from "../axios";

export const checkForDuplicates = (string, array) => {
  console.log("checkForDuplicates", string, array);
  let codeIsUnique = true;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === string) {
      codeIsUnique = false;
    }
  }
  return codeIsUnique;
};

export const checkCodeIsUnique = (code, array) => {
  const codeArr = array?.map((project) => project[code]);
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

export const checkVendorIsUnique = (code, vendorName, array) => {
  const codeArr = array?.map((project) => project[code]);
  const codeIsUnique = checkForDuplicates(vendorName, codeArr);
  return codeIsUnique;
};

export const PostToEndpoint = (data, endpoint) => {
  baseAPI
    .post(endpoint, data)
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => console.log("error", err));
};

export const submitForm = (values, files, endpoint, options) => {
  const transformedValues = transformValues(values);
  const dataToPost = fillFormData(transformedValues, files);
  if (options) {
    let hotelIsUnique = checkVendorIsUnique("name", values["name"], options);

    if (hotelIsUnique) {
      PostToEndpoint(dataToPost, endpoint);
    } else {
      alert(`${values["name"]} already exists in the DB`);
    }
  }
};

//ListOfProjects - SortableProjectsTable

export const setSortOrder = (array, sortOrder) => {
  if (sortOrder === "asc") {
    const AscendingArray = [...array].sort((a, b) => {
      let c = new Date(a.createdAt);
      let d = new Date(b.createdAt);
      return c - d;
    });
    return AscendingArray;
  } else if (sortOrder === "desc") {
    const DescendingArray = [...array].sort((a, b) => {
      let c = new Date(a.createdAt);
      let d = new Date(b.createdAt);
      return d - c;
    });
    return DescendingArray;
  } else return array;
};

export const getDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.toLocaleString("default", { month: "short" });
  const year = newDate.getFullYear();
  return `${day}/${month}/${year}`;
};
