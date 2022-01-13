import { useState } from "react";
import HotelRatesTable from "../../components/projectConfig/HotelRatesTable/HotelRatesTable";
import "./tabStyles.css";

const Tabs = ({ hotels }) => {
  const [visibleTab, setVisibleTab] = useState(hotels[0]._id);
  console.log("hotels", hotels);

  const listTitles = hotels.map((hotel) => (
    <li
      key={hotel._id}
      onClick={() => setVisibleTab(hotel._id)}
      className={
        visibleTab === hotel._id ? "tab-title tab-title--active" : "tab-title"
      }
    >
      {hotel.name}
    </li>
  ));

  const listContent = hotels.map((hotel) => (
    <div
      key={hotel._id}
      style={visibleTab === hotel._id ? {} : { display: "none" }}
    >
      <HotelRatesTable hotel={hotel.name} />
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
