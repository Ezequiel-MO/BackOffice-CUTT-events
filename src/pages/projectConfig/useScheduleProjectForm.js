import { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { selectProjectStatus } from "../../features/ProjectStatusSlice";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import { baseURL } from "../../helper/axios";
/* import { useNavigate } from "react-router"; */
import useGetVendors from "../../hooks/useGetVendors";
import eventOptionsReducer from "./projectFormReducer";
import { optionsInitialState } from "./projectFormReducer";
import {
  computeTotalDays,
  findSelectedOptions,
  whichDay,
} from "../../helper/HelperFunctions/HelperFunctions";

const useScheduleProjectForm = () => {
  /*  const navigate = useNavigate(); */
  const [schedule, setSchedule] = useState([]);
  const [dayProgram, setDayProgram] = useState({});
  const [showSubMenu, setShowSubMenu] = useState(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayProgram]);

  const updateInputData = () => {
    const totalDays = computeTotalDays(
      projectByCode.arrivalDay,
      projectByCode.departureDay
    );
    setDayProgram({
      ...dayProgram,
      date: whichDay(counter, totalDays),
      morningEvents: findSelectedOptions(
        selectedOptions["morning-event"],
        eventOptions
      ),
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
    setShowSubMenu(true);
    dispatch({
      type: "clear",
    });
  };

  return {
    handleSubmit,
    projectByCode,
    eventOptions,
    transferOptions,
    restaurantOptions,
    storeSelectedValues,
    counter,
    whichDay,
    selectedOptions,
    showSubMenu,
  };
};

export default useScheduleProjectForm;
