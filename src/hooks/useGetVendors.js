import { useAxiosFetch } from "./useAxiosFetch";
import { useEffect, useState } from "react";
import { newBaseURL } from "../helper/axios";

const useGetVendors = (typeOfVendor) => {
  const [vendorOptions, setVendorOptions] = useState();

  const { data } = useAxiosFetch(`${newBaseURL}/${typeOfVendor}`);
  console.log("data at useGet vendors", data);

  useEffect(() => {
    const vendorOptionData = data[typeOfVendor];
    setVendorOptions(vendorOptionData);
  }, [data, typeOfVendor]);

  return { vendorOptions };
};

export default useGetVendors;
