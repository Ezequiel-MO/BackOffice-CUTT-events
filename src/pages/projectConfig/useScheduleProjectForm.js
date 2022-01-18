import { useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  SET_AFTERNOON_EVENTS,
  SET_DATE,
  SET_DINNER_EVENTS,
  SET_LUNCH_EVENTS,
  SET_MORNING_EVENTS,
  selectDayProgram,
} from "../../features/DayProgramSlice";
import { INCREMENT, selectDayCounter } from "../../features/DayCounterSlice";
import { ADD_DAY } from "../../features/ScheduleSlice";

const useScheduleProjectForm = () => {
  const navigate = useNavigate();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [transferVendorsInACity, setTransferVendorsInACity] = useState([]);
  const [selectedOptions, dispatch] = useReducer(
    eventOptionsReducer,
    optionsInitialState
  );

  const dayCounter = useSelector(selectDayCounter);
  const dayProgram = useSelector(selectDayProgram);

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
  const dispatch_dayProgram = useDispatch();
  const dispatch_dayCounter = useDispatch();
  const dispatch_schedule = useDispatch();
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
    const totalDays =
      projectByCode &&
      computeTotalDays(projectByCode.arrivalDay, projectByCode.departureDay);
    e.preventDefault();
    if (
      company &&
      vehicleSize &&
      typeOfService &&
      transferOptions &&
      transferCounter
    ) {
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

      if (eventOfTheDay === "morningEvents") {
        const morningEventsPayload = findSelectedOptions(
          selectedOptions["morning-event"],
          eventOptions
        ).map((item) => {
          return {
            ...item,
            transfer: transfersArr,
          };
        });
        dispatch_dayProgram(SET_DATE(whichDay(dayCounter, totalDays)));
        dispatch_dayProgram(SET_MORNING_EVENTS(morningEventsPayload));
        setTimeout(() => {
          navigate("/lunches");
        }, 1000);
      }

      if (eventOfTheDay === "lunch") {
        const lunchPayload = findSelectedOptions(
          selectedOptions.lunch,
          restaurantOptions
        ).map((item) => {
          return {
            ...item,
            transfer: transfersArr,
          };
        });

        dispatch_dayProgram(SET_LUNCH_EVENTS(lunchPayload));
        setTimeout(() => {
          navigate("/afternoon-events");
        }, 1000);
      }

      if (eventOfTheDay === "afternoonEvents") {
        const afternoonEventsPayload = findSelectedOptions(
          selectedOptions["afternoon-event"],
          eventOptions
        ).map((item) => {
          return {
            ...item,
            transfer: transfersArr,
          };
        });

        dispatch_dayProgram(SET_AFTERNOON_EVENTS(afternoonEventsPayload));

        setTimeout(() => {
          navigate("/dinners");
        }, 1000);
      }

      if (eventOfTheDay === "dinners") {
        const dinnerEventsPayload = findSelectedOptions(
          selectedOptions.dinner,
          restaurantOptions
        ).map((item) => {
          return {
            ...item,
            transfer: transfersArr,
          };
        });
        dispatch_dayProgram(SET_DINNER_EVENTS(dinnerEventsPayload));
        dispatch_schedule(ADD_DAY(dayProgram));
        if (dayCounter < totalDays) {
          dispatch_dayCounter(INCREMENT());
          dispatch_dayProgram(SET_DATE(whichDay(dayCounter, totalDays)));
          setTimeout(() => {
            navigate("/morning-events");
          }, 1000);
        } else if (dayCounter === totalDays) {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueTransferCompaniesPerCity = findUniqueVendorsPerCity(
      transferOptions,
      projectByCode.groupLocation
    );
    setShowSubMenu(true);
    setTransferVendorsInACity(uniqueTransferCompaniesPerCity);
  };

  return {
    handleSubmit,
    projectByCode,
    eventOptions,
    restaurantOptions,
    transferOptions,
    storeSelectedValues,
    whichDay,
    selectedOptions,
    showSubMenu,
    transferVendorsInACity,
    handleTransferSubmit,
  };
};

export default useScheduleProjectForm;
