import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import {
  SET_COMPANY,
  SET_VEHICLE_SIZE,
  SET_TYPE_OF_SERVICE,
  selectCompany,
  selectVehicleSize,
  selectTransferCounter,
  selectServiceType,
  SET_COUNTER,
} from "../../features/TransfersSlice";
import {
  findServicesPerVendorAndCapacity,
  findUniqueCapacitiesPerVendor,
} from "../../helper/HelperFunctions/HelperFunctions";

const SelectTransfers = ({
  city,
  companies,
  transferOptions,
  handleTransferSubmit,
  eventOfTheDay,
}) => {
  const [capacities, setCapacities] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const dispatch = useDispatch();
  const company = useSelector(selectCompany);
  const typeOfService = useSelector(selectServiceType);
  const vehicleSize = useSelector(selectVehicleSize);
  const counter = useSelector(selectTransferCounter);

  const handleCompanyChange = (e) => {
    const { value } = e.target;
    localStorage.setItem("company", value);
    dispatch(SET_COMPANY(value));
  };

  const handleCapacityChange = (e) => {
    const { value } = e.target;
    localStorage.setItem("vehicleSize", value);
    dispatch(SET_VEHICLE_SIZE(value));
  };

  const handleServiceChange = (e) => {
    const { value } = e.target;
    localStorage.setItem("typeOfService", value);
    dispatch(SET_TYPE_OF_SERVICE(value));
  };

  const increase = (number) => {
    dispatch(SET_COUNTER(number));
  };

  useEffect(() => {
    const serviceOptions = findServicesPerVendorAndCapacity(
      transferOptions,
      company,
      vehicleSize
    );
    setServiceOptions(serviceOptions);
  }, [vehicleSize, company, transferOptions]);

  useEffect(() => {
    if (company) {
      const capacities = findUniqueCapacitiesPerVendor(
        transferOptions,
        company
      );
      setCapacities(capacities);
    }
  }, [transferOptions, company]);

  return (
    <div>
      <h2>
        Transfers available in <span>{city}</span>
      </h2>
      <form onSubmit={(e) => handleTransferSubmit(e, eventOfTheDay)}>
        <div>
          <button type='button' onClick={() => increase(-1)}>
            <Icon icon='akar-icons:minus' color='rgba(238, 170, 85, 0.6)' />
          </button>
          {counter}
          <button type='button' onClick={() => increase(1)}>
            <Icon icon='akar-icons:plus' color='rgba(238, 170, 85, 0.6)' />
          </button>
        </div>
        <select onChange={handleCompanyChange} value={company}>
          <option value=''>Select a company</option>
          {companies?.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
        <select onChange={handleCapacityChange} value={vehicleSize}>
          <option value=''>Select Size of vehicle</option>
          {capacities?.map((capacity) => (
            <option key={capacity} value={capacity}>
              {capacity}
            </option>
          ))}
        </select>
        <select onChange={handleServiceChange} value={typeOfService}>
          <option value=''>Select Type of Service</option>
          {serviceOptions?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button style={{ display: "block" }} type='submit'>
          Add
        </button>
      </form>
    </div>
  );
};

export default SelectTransfers;
