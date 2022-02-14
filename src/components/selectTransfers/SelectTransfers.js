import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
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
  findUniqueVendorsPerCity,
} from "../../helper/HelperFunctions/HelperFunctions";
import { selectCity } from "../../features/ProjectStatusSlice";
import styles from "./selectTransfersStyles.module.css";

const SelectTransfers = ({
  transferOptions,
  handleTransferSubmit,
  eventOfTheDay,
}) => {
  const [companies, setCompanies] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const dispatch = useDispatch();
  const city = useSelector(selectCity);
  const company = useSelector(selectCompany);
  const typeOfService = useSelector(selectServiceType);
  const vehicleSize = useSelector(selectVehicleSize);
  const counter = useSelector(selectTransferCounter);

  useEffect(() => {
    if (city) {
      const uniqueTransferCompaniesPerCity = findUniqueVendorsPerCity(
        transferOptions,
        city
      );
      setCompanies(uniqueTransferCompaniesPerCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

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
      <h3>Add Transfers to your services</h3>
      <form onSubmit={(e) => handleTransferSubmit(e, eventOfTheDay)}>
        <div className={styles.transfers_container}>
          <div className={styles.button_group}>
            <button type='button' onClick={() => increase(-1)}>
              <Icon
                className={styles.icon}
                icon='akar-icons:minus'
                color='#ea5933'
              />
            </button>
            <h2>{counter}</h2>
            <button type='button' onClick={() => increase(1)}>
              <Icon
                className={styles.icon}
                icon='akar-icons:plus'
                color='#ea5933'
              />
            </button>
          </div>
          <div className={styles.box}>
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
          </div>

          <Button variant='contained' color='inherit' type='submit'>
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SelectTransfers;
