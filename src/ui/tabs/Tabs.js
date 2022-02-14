import { useEffect, useState } from "react";
import { Alert, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HotelRatesTable from "../../components/projectConfig/HotelRatesTable/HotelRatesTable";
import { selectProjectStatus } from "../../features/ProjectStatusSlice";
import { selectHotelRates } from "../../features/HotelRatesSlice";
import { baseAPI, baseURL } from "../../helper/axios";
import { useAxiosFetch } from "../../hooks/useAxiosFetch";

import "./tabStyles.css";

const Tabs = ({ hotels }) => {
  const [visibleTab, setVisibleTab] = useState(hotels[0]._id);
  const hotelsArr = useSelector(selectHotelRates);
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const projectStatus = useSelector(selectProjectStatus);
  const {
    data: { project: projectByCode },
  } = useAxiosFetch(`${baseURL}/projects/${projectStatus}`);

  const postToHotels = async () => {
    try {
      await baseAPI.post(`/addHotels/${projectByCode._id}`, hotelsArr);
      setSuccess(true);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (filteredHotels.length === 0 && projectByCode) {
      postToHotels();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredHotels]);

  useEffect(() => {
    const filteredHotels = hotels?.filter((hotel) => {
      return !hotelsArr.find((hotelArr) => hotelArr._id === hotel._id);
    });
    setVisibleTab(filteredHotels.length > 0 ? filteredHotels[0]._id : null);
    setFilteredHotels(filteredHotels);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelsArr]);

  const listTitles = filteredHotels.map((hotel) => (
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

  const listContent = filteredHotels.map((hotel) => (
    <div
      key={hotel._id}
      className={
        visibleTab === hotel._id
          ? "tab-content"
          : "tab-content tab-content--hidden"
      }
    >
      <HotelRatesTable
        hotel={hotel}
        nrHotels={hotels.length}
        postToHotels={postToHotels}
      />
    </div>
  ));

  return (
    <div className='tabs'>
      {success && (
        <Alert severity='success' onClose={() => navigate("/morning-events")}>
          Hotels added successfully
        </Alert>
      )}

      <ul className='tabs-titles'>{listTitles}</ul>
      <div className='tab-content'>{listContent}</div>
    </div>
  );
};

export default Tabs;
