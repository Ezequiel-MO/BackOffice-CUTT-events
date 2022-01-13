import { useReducer, useState } from "react";
import useGetVendors from "../../../hooks/useGetVendors";
import ProjectSelector from "../../../ui/Select/ProjectSelector";
import eventOptionsReducer, {
  optionsInitialState,
} from "../projectFormReducer";
import { SaveButton } from "../../../ui/buttons/saveButton/SaveButton";
import { findSelectedOptions } from "../../../helper/HelperFunctions/HelperFunctions";
import HotelRatesTable from "../../../components/projectConfig/HotelRatesTable/HotelRatesTable";

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
    <div>
      <form onSubmit={handleFormSubmit}>
        <ProjectSelector
          name='hotel'
          icon='bx:bx-hotel'
          options={hotelOptions}
          placeholder='ex : Hotel Options'
          storeSelectedValues={storeSelectedValues}
        />
        <SaveButton text={"Add Hotels to project"} type='submit' />
      </form>
      {hotels.length > 0 && <HotelRatesTable hotels={hotels} />}
    </div>
  );
};

export default Hotels;
