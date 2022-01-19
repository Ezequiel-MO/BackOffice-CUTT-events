import { useState, useReducer, useEffect } from "react";
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
  PostToEndpoint,
  whichDay,
} from "../../helper/HelperFunctions/HelperFunctions";
import {
  selectCompany,
  selectServiceType,
  selectTransferCounter,
  selectVehicleSize,
} from "../../features/TransfersSlice";
import { INCREMENT, selectDayCounter } from "../../features/DayCounterSlice";
import {
  ADD_DAY,
  selectSchedule,
  UPDATE_AFTERNOON,
  UPDATE_DINNER,
  UPDATE_LUNCH,
  UPDATE_MORNING,
} from "../../features/ScheduleSlice";

const useScheduleProjectForm = () => {
  const navigate = useNavigate();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [transferVendorsInACity, setTransferVendorsInACity] = useState([]);
  const [selectedOptions, dispatch] = useReducer(
    eventOptionsReducer,
    optionsInitialState
  );

  const { vendorOptions: restaurantOptions } = useGetVendors("restaurants");
  const { vendorOptions: transferOptions } = useGetVendors("transfers");
  const { vendorOptions: eventOptions } = useGetVendors("events");
  const projectStatus = useSelector(selectProjectStatus);
  const {
    data: { project: projectByCode },
  } = useAxiosFetch(`${baseURL}/project/${projectStatus}`);
  const [evaluate, setEvaluate] = useState(false);
  const company = useSelector(selectCompany);
  const vehicleSize = useSelector(selectVehicleSize);
  const typeOfService = useSelector(selectServiceType);
  const transferCounter = useSelector(selectTransferCounter);
  const dayCounter = useSelector(selectDayCounter);
  const schedule = useSelector(selectSchedule);
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

  const totalDays =
    projectByCode &&
    computeTotalDays(projectByCode.arrivalDay, projectByCode.departureDay);

  const handleTransferSubmit = (e, eventOfTheDay) => {
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
        const newDay = {
          date: whichDay(dayCounter, totalDays),
          morningEvents: [],
          lunch: [],
          afternoonEvents: [],
          dinner: [],
        };
        dispatch_schedule(ADD_DAY(newDay));
        const morningEventsPayload = findSelectedOptions(
          selectedOptions["morning-event"],
          eventOptions
        ).map((item) => {
          return {
            ...item,
            transfer: transfersArr,
          };
        });
        dispatch_schedule(
          UPDATE_MORNING({
            date: whichDay(dayCounter, totalDays),
            morningEvents: morningEventsPayload,
          })
        );
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

        dispatch_schedule(
          UPDATE_LUNCH({
            date: whichDay(dayCounter, totalDays),
            lunch: lunchPayload,
          })
        );
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

        dispatch_schedule(
          UPDATE_AFTERNOON({
            date: whichDay(dayCounter, totalDays),
            afternoonEvents: afternoonEventsPayload,
          })
        );

        setTimeout(() => {
          navigate("/dinners");
        }, 1000);
      }

      if (eventOfTheDay === "dinner") {
        const dinnerEventsPayload = findSelectedOptions(
          selectedOptions.dinner,
          restaurantOptions
        ).map((item) => {
          return {
            ...item,
            transfer: transfersArr,
          };
        });

        dispatch_schedule(
          UPDATE_DINNER({
            date: whichDay(dayCounter, totalDays),
            dinner: dinnerEventsPayload,
          })
        );
        setEvaluate(true);
      }
    }
  };

  useEffect(() => {
    if (evaluate === true) {
      if (dayCounter < totalDays) {
        alert(
          "You have added all the events for today. Please proceed to the next day"
        );
        dispatch_dayCounter(INCREMENT());
        setEvaluate(false);
        setTimeout(() => {
          navigate("/morning-events");
        }, 1000);
      } else if (dayCounter === totalDays) {
        alert("You have reached the end of your trip");
        PostToEndpoint(schedule, `${baseURL}/addSchedule/${projectByCode._id}`);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluate]);

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
