import { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { selectProjectStatus } from "../../features/ProjectStatusSlice";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import { baseURL } from "../../helper/axios";
import { useNavigate } from "react-router";
import useGetVendors from "../../hooks/useGetVendors";
import eventOptionsReducer from "./projectFormReducer";
import { optionsInitialState } from "./projectFormReducer";
import {
  computeTotalDays,
  findSelectedOptions,
  findUniqueVendorsPerCity,
  whichDay,
} from "../../helper/HelperFunctions/HelperFunctions";
import {
  selectCompany,
  selectServiceType,
  selectTransferCounter,
  selectVehicleSize,
} from "../../features/TransfersSlice";

const useScheduleProjectForm = () => {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState([]);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [transferVendorsInACity, setTransferVendorsInACity] = useState([]);
  const [dayProgram, setDayProgram] = useState({});
  const [selectedOptions, dispatch] = useReducer(
    eventOptionsReducer,
    optionsInitialState
  );

  const [counter] = useState(1);

  const { vendorOptions: restaurantOptions } = useGetVendors("restaurants");
  const { vendorOptions: transferOptions } = useGetVendors("transfers");
  const { vendorOptions: eventOptions } = useGetVendors("events");
  const projectStatus = useSelector(selectProjectStatus);
  const {
    data: { project: projectByCode },
  } = useAxiosFetch(`${baseURL}/project/${projectStatus}`);
  const company = useSelector(selectCompany);
  const vehicleSize = useSelector(selectVehicleSize);
  const typeOfService = useSelector(selectServiceType);
  const transferCounter = useSelector(selectTransferCounter);

  const storeSelectedValues = (array, action) => {
    if (action.action === "select-option" || action.action === "remove-value") {
      dispatch({
        type: "select-option",
        payload: {
          name: action.name,
          value: array,
        },
      });
    } else if (action.action === "clear") {
      dispatch({
        type: "clear",
      });
    }
  };

  const handleTransferSubmit = (e, eventOfTheDay) => {
    e.preventDefault();
    if (
      company &&
      vehicleSize &&
      typeOfService &&
      transferOptions &&
      transferCounter &&
      dayProgram
    ) {
      console.log("transfers huhu", transferOptions);
      console.log("company", company, "vehicleSize", vehicleSize);
      const selectedOption = transferOptions.filter(
        (option) =>
          option.company === company &&
          option.vehicleCapacity === parseInt(vehicleSize)
      );

      const TransferObjToAdd = {
        [typeOfService]: selectedOption[0][typeOfService],
        vehicleCapacity: selectedOption[0]["vehicleCapacity"],
      };
      const transfersArr = [];
      if (transferCounter > 0) {
        for (let i = 0; i < transferCounter; i++) {
          transfersArr.push(TransferObjToAdd);
        }
      }
      const morningEvents = { ...dayProgram }.morningEvents;
      if (eventOfTheDay === "morningEvents") {
        morningEvents.transfer = [];
        setDayProgram({
          ...dayProgram,
          morningEvents: morningEvents.map((item) => {
            return {
              ...item,
              transfer: transfersArr,
            };
          }),
        });
        setTimeout(() => {
          navigate("/lunches");
        }, 1000);
      }
    }
  };

  /*  useEffect(() => {
    if (counter < totalDays) {
      dispatch({
        type: "clear",
      });
      setCounter((prevState) => prevState + 1);
    } else if (counter === totalDays) {
      navigate({
        pathname: "/schedule-check",
        state: schedule,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]); */

  useEffect(() => {
    setSchedule([...schedule, dayProgram]);
    console.log("super console log", dayProgram);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayProgram]);

  const updateInputData = () => {
    const totalDays = computeTotalDays(
      projectByCode.arrivalDay,
      projectByCode.departureDay
    );
    const morningEvents = findSelectedOptions(
      selectedOptions["morning-event"],
      eventOptions
    );
    setDayProgram({
      ...dayProgram,
      date: whichDay(counter, totalDays),
      morningEvents,
      lunch: findSelectedOptions(selectedOptions.lunch, restaurantOptions),
      afternoonEvents: findSelectedOptions(
        selectedOptions["afternoon-event"],
        eventOptions
      ),
      dinner: findSelectedOptions(selectedOptions.dinner, restaurantOptions),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateInputData();
    const uniqueTransferCompaniesPerCity = findUniqueVendorsPerCity(
      transferOptions,
      projectByCode.groupLocation
    );
    setShowSubMenu(true);
    setTransferVendorsInACity(uniqueTransferCompaniesPerCity);
    dispatch({
      type: "clear",
    });
  };

  return {
    handleSubmit,
    projectByCode,
    eventOptions,
    restaurantOptions,
    transferOptions,
    storeSelectedValues,
    counter,
    whichDay,
    selectedOptions,
    showSubMenu,
    transferVendorsInACity,
    handleTransferSubmit,
  };
};

export default useScheduleProjectForm;
