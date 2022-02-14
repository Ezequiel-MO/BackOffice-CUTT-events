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
  UPDATE_TRANSFER_IN,
  UPDATE_TRANSFER_OUT,
  /*   UPDATE_TRANSFER_OUT, */
} from "../../features/ScheduleSlice";

const useScheduleProjectForm = () => {
  const navigate = useNavigate();
  const [showSubMenu, setShowSubMenu] = useState(false);
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
  } = useAxiosFetch(`${baseURL}/projects/${projectStatus}`);
  const [evaluate, setEvaluate] = useState(false);
  const [post, setPost] = useState(false);
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

      if (eventOfTheDay === "transfers-in") {
        dispatch_schedule(
          UPDATE_TRANSFER_IN({
            date: whichDay(1, totalDays),
            transfer_in: transfersArr,
          })
        );
        setTimeout(() => {
          navigate("/transfers-out");
        }, 1000);
      }

      if (eventOfTheDay === "transfers-out") {
        dispatch_schedule(
          UPDATE_TRANSFER_OUT({
            date: whichDay(dayCounter, totalDays),
            transfer_out: transfersArr,
          })
        );
        setPost(true);
      }

      if (eventOfTheDay === "morningEvents") {
        const newDay = {
          date: whichDay(dayCounter, totalDays),
          morningEvents: [],
          lunch: [],
          afternoonEvents: [],
          dinner: [],
          transfer_in: [],
          transfer_out: [],
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
    if (post) {
      PostToEndpoint(schedule, `${baseURL}/addSchedule/${projectByCode._id}`);
      alert("Schedule has been successfully added");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

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
        setTimeout(() => {
          navigate("/transfers-in");
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSubMenu(true);
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
    handleTransferSubmit,
  };
};

export default useScheduleProjectForm;
