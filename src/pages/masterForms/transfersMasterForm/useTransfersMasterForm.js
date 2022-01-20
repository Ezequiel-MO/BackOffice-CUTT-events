import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { baseURL } from "../../../helper/axios";
import { useNavigate } from "react-router-dom";

const useTransfersMasterForm = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("typing");
  const [submitReady, setSubmitReady] = useState(false);
  const [services, setServices] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [companyValues, setCompanyValues] = useState({
    city: "",
    company: "",
    vehicleCapacity: "",
    dispo_4h: "",
    transfer_in_out: "",
    hextra: "",
    hextra_night: "",
    dispo_5h_out: "",
    dispo_4h_airport: "",
    dispo_4h_night: "",
    transfer_in_out_night: "",
    dispo_6h_night: "",
  });

  const handleAddService = (value) => {
    const newServiceIsUnique = !services.some(
      (service) => service.vehicleCapacity === value
    );
    const valueIsValid = value > 0;

    if (valueIsValid && newServiceIsUnique) {
      setStatus("typing");
      setServices([
        ...services,
        {
          id: uuidv4(),
          vehicleCapacity: value,
          saved: false,
          ids: [
            { label: "4hrs At Disposal", name: "dispo_4h" },
            { label: "Transfers In/Out", name: "transfer_in_out" },
            { label: "Overtime Hours", name: "hextra" },
            { label: "Night Overtime Hours", name: "hextra_night" },
            { label: "5hrs At Disposal", name: "dispo_5h_out" },
            { label: "4hrs At Dispo / Airport", name: "dispo_4h_airport" },
            { label: "4hrs Dispo / night", name: "dispo_4h_night" },
            { label: "Transfers In/Out Night", name: "transfer_in_out_night" },
            { label: "6hrs Dispo / night", name: "dispo_6h_night" },
          ],
        },
      ]);
      setErrorMessage("");
    } else if (!valueIsValid) {
      setErrorMessage("Please select a valid service");
    } else if (!newServiceIsUnique) {
      setErrorMessage("This Size of Vehicle is already added");
    }
  };

  const postServices = () => {
    setStatus("submitting");
    setSubmitReady(true);
    try {
      axios.post(`${baseURL}/transfers`, companyValues).then((res) => {
        console.log(res);
        setStatus("success");
      });
    } catch (error) {
      setStatus("error");
    }
  };

  const handleLeave = () => {
    setStatus("leaving");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedServices = services?.map((service) => {
      if (service.vehicleCapacity === companyValues.vehicleCapacity) {
        return { ...service, saved: true };
      } else {
        return service;
      }
    });
    setServices(updatedServices);
    postServices();
  };
  return {
    handleSubmit,
    companyValues,
    setCompanyValues,
    handleAddService,
    status,
    setStatus,
    setSubmitReady,
    submitReady,
    services,
    handleLeave,
    errorMessage,
  };
};

export default useTransfersMasterForm;
