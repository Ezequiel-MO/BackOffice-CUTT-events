import { baseAPI } from "../axios";

export const checkForDuplicates = (string, array) => {
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

//Hotels, morning events, afternoon events, lunches and dinners
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

export const PostToEndpoint = async (data, endpoint) => {
  try {
    const response = await baseAPI.post(endpoint, data);
    return response;
  } catch (err) {
    console.log(err);
  }
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

//useScheduleProjectForm

export const computeTotalDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
};

export const whichDay = (counter, daydifference) => {
  if (counter === 1) {
    return "Arrival Day";
  } else if (counter === daydifference) {
    return "Departure Day";
  } else {
    return "Day " + counter;
  }
};

//useTransferOptions.js

export const findUniqueCitiesinDB = (array) => {
  return [...new Set(array.map((item) => item.city))];
};

export const findUniqueVendorsPerCity = (array, city) => {
  const filteredVendors = array.filter((item) => item.city === city);
  return [...new Set(filteredVendors.map((item) => item.company))];
};

export const findUniqueCapacitiesPerVendor = (array, vendor) => {
  const filteredCapacities = array.filter((item) => item.company === vendor);
  return [...new Set(filteredCapacities.map((item) => item.vehicleCapacity))];
};

export const findServicesPerVendorAndCapacity = (array, vendor, capacity) => {
  const filteredServices = array.filter(
    (item) =>
      item.company === vendor && item.vehicleCapacity === parseInt(capacity)
  );
  let services = [];
  for (let key in filteredServices[0]) {
    if (
      key !== "city" &&
      key !== "company" &&
      key !== "vehicleCapacity" &&
      key !== "_id" &&
      key !== "__v"
    ) {
      services.push(key);
    }
  }
  return services;
};
