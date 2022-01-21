import { useReducer, useState } from "react";
import useGetVendors from "../../../hooks/useGetVendors";
import ProjectSelector from "../../../ui/Select/ProjectSelector";
import eventOptionsReducer, {
  optionsInitialState,
} from "../projectFormReducer";
import { SaveButton } from "../../../ui/buttons/saveButton/SaveButton";
import { findSelectedOptions } from "../../../helper/HelperFunctions/HelperFunctions";
import styles from "../configStyles.module.css";
import Tabs from "../../../ui/tabs/Tabs";

export const Hotels = () => {
  const { vendorOptions: hotelOptions } = useGetVendors("hotels");
  const [hotels, setHotels] = useState([]);
  const [selectedOptions, dispatch] = useReducer(
    eventOptionsReducer,
    optionsInitialState
  );
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setHotels(findSelectedOptions(selectedOptions.hotel, hotelOptions));
  };

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
  return (
    <div className={styles.config__container}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <ProjectSelector
          name='hotel'
          icon='bx:bx-hotel'
          options={hotelOptions}
          placeholder='ex : Hotel Options'
          storeSelectedValues={storeSelectedValues}
        />
        <div className={styles.save__button}>
          <SaveButton text={"Add Hotels to project"} type='submit' />
        </div>
      </form>
      {hotels.length > 0 && <Tabs hotels={hotels} />}
    </div>
  );
};

export default Hotels;
