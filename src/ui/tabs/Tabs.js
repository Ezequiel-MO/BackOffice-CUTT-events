import { useState } from "react";
import { useSelector } from "react-redux";
import HotelRatesTable from "../../components/projectConfig/HotelRatesTable/HotelRatesTable";
import { selectHotelRates } from "../../features/HotelRatesSlice";
import { checkVendorIsUnique } from "../../helper/HelperFunctions/HelperFunctions";
import "./tabStyles.css";

const Tabs = ({ hotels }) => {
  const [visibleTab, setVisibleTab] = useState(hotels[0]._id);
  const hotelsArr = useSelector(selectHotelRates);

  const listTitles = hotels.map((hotel) => (
    <>
      {checkVendorIsUnique("_id", hotel._id, hotelsArr) && (
        <li
          key={hotel._id}
          onClick={() => setVisibleTab(hotel._id)}
          className={
            visibleTab === hotel._id
              ? "tab-title tab-title--active"
              : "tab-title"
          }
        >
          {hotel.name}
        </li>
      )}
    </>
  ));

  const listContent = hotels.map((hotel) => (
    <div
      key={hotel._id}
      style={visibleTab === hotel._id ? {} : { display: "none" }}
    >
      {checkVendorIsUnique("_id", hotel._id, hotelsArr) && (
        <HotelRatesTable hotel={hotel} />
      )}
    </div>
  ));

  return (
    <div className='tabs'>
      <ul className='tabs-titles'>{listTitles}</ul>
      <div className='tab-content'>{listContent}</div>
    </div>
  );
};

export default Tabs;
