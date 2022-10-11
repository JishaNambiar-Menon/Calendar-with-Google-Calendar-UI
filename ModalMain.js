import React, { useState, useEffect, useContext } from "react";
import calendar from "../frontend-ui-kit-main-src-icons/src/icons/calendar.svg";
import information from "../frontend-ui-kit-main-src-icons/src/icons/information-circle.svg";
import axios from "axios";
import { v4 as uuid } from "uuid";
import "../index.css";
import "../App.css";
import GlobalContext from "../context/GlobalContext";

const Modal = ({ open, onClose }) => {
  const { offDays, setOffDays } = useContext(GlobalContext);
  const [offStartDate, setOffStartDate] = useState(new Date());
  const [offEndDate, setOffEndDate] = useState(new Date());

  useEffect(() => {
    const updateDays = async () => {
      try {
        await axios.put(`http://localhost:3007/calendar/${1}`, { offDays });
        console.log(offDays);

        //window.location.reload();
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
  updateDays()
  }, [offDays]);

  const handleChange = (e) => {
    setOffStartDate(new Date());
    setOffEndDate(new Date());
    onClose();
    /*const { name, value } = e.target;
      
      
        //setOffDays({...offDays,[name]: value});
        setOffDays([ ...offDays, 
          {[name]: value }]);*/

    /*const temp = [];
    temp.push({
      oid: uuid().slice(0, 8),
      startDate: offStartDate,
      endDate: offEndDate,
    });
    console.log("temp after", temp);
    setOffDays((prev) => [...prev, ...temp]);*/
  };

  const updateOffDays = async () => {
    console.log(offDays);
    /*const temp = [];
    temp.push({
      oid: uuid().slice(0, 8),
      startDate: offStartDate,
      endDate: offEndDate,
    });*/
    //console.log("temp after", temp);
    setOffDays((prev) => [
      ...prev,
      {
        oid: uuid().slice(0, 8),
        startDate: offStartDate,
        endDate: offEndDate,
      },
    ]);

    //const temp = offDays

    //const id = offDays.id;
    //setOffDays("")
    setOffStartDate(new Date());
    setOffEndDate(new Date());
    onClose();
  };

  if (!open) return null;
  return (
    <div onClick={onClose}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modalRight">
          <p
            className="closeBtn"
            onClick={() => {
              handleChange();
            }}
          >
            X
          </p>

          <div className="content">
            <h1 className="text-base text-gray-700 font-bold font-sans">
              Add off-time
            </h1>
            <br />
            <div className="mcontainer">
              <div className="A">
                <p>Start date*</p>
                <div className="flex w-40 h-8 bg-white mt-1 border-2 rounded text-center">
                  <img
                    alt="calendar"
                    src={calendar}
                    className="w-5 h-5 ml-2 mt-1"
                  />
                  <input
                    type="date"
                    className="pl-2 text-gray-300 border-none font-sans text-xs"
                    name="offStartDate"
                    //value={offStartDate}
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    placeholder={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => {
                      e.preventDefault();
                      setOffStartDate(e.target.value);
                      console.log(offStartDate);
                    }}
                  />
                </div>
              </div>
              <div className="B">
                <p className="-ml-16">End date*</p>
                <div className="flex w-40 -ml-16 h-8 bg-white mt-1 border-2 rounded text-center">
                  <img
                    alt="calendar"
                    src={calendar}
                    className="w-5 h-5 ml-2 mt-1"
                  />
                  <input
                    type="date"
                    className="pl-2 text-gray-300 border-none font-sans text-xs"
                    name="offEndDate"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    //value={offEndDate}
                    placeholder={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => {
                      e.preventDefault();
                      setOffEndDate(e.target.value);
                      console.log(offEndDate);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <img
                alt="information"
                src={information}
                className="w-6 h-6 ml-2 -mt-1"
              />
              <p className="text-gray-500 ml-2 text-xs">
                Service events won't be booked during this period.
              </p>
            </div>
          </div>
          <div className="btnContainer">
            <button
              className="btnOutline rounded"
              onClick={(e) => {
                e.preventDefault();
                updateOffDays();
              }}
            >
              <span className="justify-center text-center text-white">
                Confirm
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
