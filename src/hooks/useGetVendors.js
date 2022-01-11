import { useAxiosFetch } from "./useAxiosFetch";
import { useEffect, useState } from "react";
import { baseURL } from "../helper/axios";

const useGetVendors = (typeOfVendor) => {
  const [vendorOptions, setVendorOptions] = useState();

  const { data } = useAxiosFetch(`${baseURL}/${typeOfVendor}`);

  useEffect(() => {
    const vendorOptionData = data[typeOfVendor];
    setVendorOptions(vendorOptionData);
  }, [data, typeOfVendor]);

  return { vendorOptions };
};

export default useGetVendors;
