import { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  InputLabel,
  Stack,
  Paper,
  Button,
} from "@mui/material";
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
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "1rem",
            minWidth: "700px",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Stack direction='row' spacing={2}>
            <Button
              variant='contained'
              color='inherit'
              onClick={() => increase(-1)}
            >
              <Icon
                className={styles.icon}
                icon='akar-icons:minus'
                color='#ea5933'
              />
            </Button>
            <h2>{counter}</h2>
            <Button
              variant='contained'
              color='inherit'
              onClick={() => increase(1)}
            >
              <Icon
                className={styles.icon}
                icon='akar-icons:plus'
                color='#ea5933'
              />
            </Button>
          </Stack>
          <Stack>
            <FormControl>
              <InputLabel id='company' sx={{ color: "#ea5933" }}>
                Company
              </InputLabel>
              <Select
                variant='standard'
                onChange={handleCompanyChange}
                className={styles.select}
                value={company}
                labelId='company'
                id='company'
              >
                <option value=''>Select a company</option>
                {companies?.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id='vehicleSize' sx={{ color: "#ea5933" }}>
                Vehicle Size
              </InputLabel>
              <Select
                variant='standard'
                onChange={handleCapacityChange}
                className={styles.select}
                value={vehicleSize}
                labelId='vehicleSize'
                id='vehicleSize'
              >
                <option value=''>Select Size of vehicle</option>
                {capacities?.map((capacity) => (
                  <option key={capacity} value={capacity}>
                    {capacity}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id='typeOfService' sx={{ color: "#ea5933" }}>
                Type of Service
              </InputLabel>
              <Select
                variant='standard'
                onChange={handleServiceChange}
                className={styles.select}
                value={typeOfService}
                labelId='typeOfService'
                id='typeOfService'
              >
                <option value=''>Select Type of Service</option>
                {serviceOptions?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Button variant='contained' color='inherit' type='submit'>
            Add
          </Button>
        </Paper>
      </form>
    </div>
  );
};

export default SelectTransfers;
