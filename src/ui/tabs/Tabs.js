import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HotelRatesTable from "../../components/projectConfig/HotelRatesTable/HotelRatesTable";
import { selectHotelRates } from "../../features/HotelRatesSlice";
import { PostToEndpoint } from "../../helper/HelperFunctions/HelperFunctions";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";
import { baseURL } from "../../helper/axios";
import { selectProjectStatus } from "../../features/ProjectStatusSlice";
import "./tabStyles.css";
/* import { useNavigate } from "react-router-dom"; */

const Tabs = ({ hotels }) => {
  /* const navigate = useNavigate(); */
  const [visibleTab, setVisibleTab] = useState(hotels[0]._id);
  const [hotelRates, setHotelRates] = useState(hotels);
  const hotelsArr = useSelector(selectHotelRates);
  const projectStatus = useSelector(selectProjectStatus);
  const {
    data: { project: projectByCode },
  } = useAxiosFetch(`${baseURL}/project/${projectStatus}`);

  useEffect(() => {
    if (hotelRates.length === 0 && projectByCode) {
      PostToEndpoint(hotelsArr, `/addHotels/${projectByCode._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelRates]);

  useEffect(() => {
    const filteredHotels = hotels?.filter((hotel) => {
      return !hotelsArr.find((hotelArr) => hotelArr._id === hotel._id);
    });
    setVisibleTab(filteredHotels.length > 0 ? filteredHotels[0]._id : null);
    setHotelRates(filteredHotels);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelsArr]);

  const listTitles = hotelRates.map((hotel) => (
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

  const listContent = hotelRates.map((hotel) => (
    <div
      key={hotel._id}
      className={
        visibleTab === hotel._id
          ? "tab-content"
          : "tab-content tab-content--hidden"
      }
    >
      <HotelRatesTable hotel={hotel} />
    </div>
  ));

  if (hotelRates.length === 0) return <h1>Thanks for submitting</h1>;

  return (
    <div className='tabs'>
      <ul className='tabs-titles'>{listTitles}</ul>
      <div className='tab-content'>{listContent}</div>
    </div>
  );
};

export default Tabs;
