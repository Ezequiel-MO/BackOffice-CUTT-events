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
import { selectCity } from "../../../features/ProjectStatusSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const Hotels = () => {
  const city = useSelector(selectCity);
  const { vendorOptions: hotelOptions } = useGetVendors("hotels");
  const [hotelOptionsByCity, setHotelOptionsByCity] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedOptions, dispatch] = useReducer(
    eventOptionsReducer,
    optionsInitialState
  );

  useEffect(() => {
    if (city && hotelOptions) {
      const hotelOptionsByCity = hotelOptions.filter(
        (hotel) => hotel.city === city
      );
      setHotelOptionsByCity(hotelOptionsByCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

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
          options={hotelOptionsByCity}
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
