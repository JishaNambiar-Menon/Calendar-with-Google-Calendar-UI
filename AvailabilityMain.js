import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiFillInfoCircle, AiFillDelete } from "react-icons/ai";
import trash from "../frontend-ui-kit-main-src-icons/src/icons/trash.svg";
import { GrAdd } from "react-icons/gr";
import axios from "axios";
import Modal from "./ModalMain";
import "../App.css";
import "../index.css";
import moment from "moment";
import GlobalContext from "../context/GlobalContext";
import GeneralSettings from "./GeneralSettings";

export default function Availability() {
  const [showtab, setShowtab] = useState("general");
  const [showInnertab, setShowInnertab] = useState("weekly");
  const [offDayWindow, setOffDayWindow] = useState(false);
  const { days, setDays } = useContext(GlobalContext);
  const [defaultSettings, setDefaultSettings] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { offDays, setOffDays } = useContext(GlobalContext);
  const [tempOffDays, setTempOffDays] = useState();
  const { setShowAvailabilityModal } = useContext(GlobalContext);

  useEffect(() => {
    const fetchOffDays = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3007/calendar?id=1",
          {
            responseType: "json",
          }
        );
        setTempOffDays(response.data[0].offDays);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchOffDays();
  }, [offDays]);

  
  useEffect(() => {
    const fetchAvailabilitySettings = async () => {
      try {
        const response = await axios.get("http://localhost:3006/availability", {
          responseType: "json",
        });
        setDefaultSettings(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };

    fetchAvailabilitySettings();
  }, []);

  const active =
    "w-40 block font-sans text-xs leading-tight text-justify text-black pl-2 border-x-0 border-t-0 border-transparent -pl-8 py-3 my-2 focus: border-r-4 border-purple-400 bg-gray-200";
  const nonActive =
    "w-40 block font-sans text-xs leading-tight text-gray-500 text-justify pl-2 border-x-0 border-t-0 border-transparent py-3 my-2 focus: border-transparent bg-white-100";

  const active1 =
    "w-40 inline-block align-middle text-center font-sans font-bold text-xs leading-tight text-justify text-gray-800 pl-2 border-x-0 border-t-0 border-transparent -pl-8 py-1 my-2 focus: border-b-4 border-purple-400 bg-gray-100";
  const nonActive1 =
    "w-40 inline-block align-middle text-center font-sans font-bold text-xs leading-tight text-gray-500 text-justify pl-2 border-x-0 border-t-0 border-transparent py-1 my-2 focus: border-transparent bg-white-100";

  const dateActive = "py-2 text-black font-serif text-sm w-full";
  const dateNonActive = "py-3 text-gray-400 font-serif text-sm w-full";
  const handletab = (e) => {
    setShowtab(e);
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    console.log(e.target.id);
    if (name === "allSelect") {
      let tempDay = days.map((day) => {
        return { ...day, isChecked: checked };
      });
      setDays(tempDay);
    } else if (name === "startTime") {
      let tempDay = days.map((day) =>
        day.dayOfWeek === e.target.id
          ? { ...day, startTime: e.target.value }
          : day
      );
      setDays(tempDay);
    } else if (name === "endTime") {
      let tempDay = days.map((day) =>
        day.dayOfWeek === e.target.id
          ? { ...day, endTime: e.target.value }
          : day
      );
      setDays(tempDay);
    } else {
      let tempDay = days.map((day) =>
        day.dayOfWeek === name ? { ...day, isChecked: checked } : day
      );
      setDays(tempDay);
    }
  };

  const removeById = (arr, id) => {
    const requiredIndex = arr.findIndex((el) => {
      return el.oid === id;
    });
    if (requiredIndex === -1) {
      return false;
    }
    return !!arr.splice(requiredIndex, 1);
  };

  const deleteOffDays = async () => {
    setOffDays(tempOffDays);
    console.log("deleting");
    try {
      const response = await axios.put(`http://localhost:3007/calendar/${1}`, {
        offDays: tempOffDays,
      });

      console.log(response);

      //window.location.reload();
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const updateAvailability = async (e) => {
    e.preventDefault();
    console.log(days);
    console.log(defaultSettings);

    let tempDay = days.map((day) => {
      if (!day.isChecked) {
        return { ...day, startTime: "09:00", endTime: "18:00" };
      } else {
        return day;
      }
    });
    setDays(tempDay);

    days.map(async (day) => {
      const id = day.id;

      try {
        const response = await axios.patch(
          `http://localhost:3006/availability/${id}`,
          day
        );
        console.log(response);

        //window.location.reload();
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
      console.log("close")
      setShowAvailabilityModal(false);
    });

    /*days.forEach((day, index) => {
      if (day.isChecked === true) {
        console.log(day);
        return <p key={index}>{day.dayOfWeek}</p>;
      } else {
        return;
      }
    });*/
  };

  const returnDefaultSetting = (e) => {
    e.preventDefault();
    setDays(defaultSettings);
    console.log("def settings", defaultSettings);
  };

  return (
    <div className="h-screen w-full h-[40em] fixed flex pt-20 pl-16 items-center z-10 overflow-y-auto scrollbar-hide  ">
      <form className="ml-80 relative rounded border-2 w-[36.7em] fixed h-full my-auto font-sans bg-white">
        <header className="bg-white px-3 -ml-0.5 -mt-0.5 flex rounded  w-[36.8em] fixed justify-between items-center border-2 border-gray-300 z-50">
          <div className="text-gray-600 text-sm font-bold">
            Calendar Settings
          </div>
          <button
            onClick={(e) => {
              updateAvailability(e);
            }}
          >
            <AiOutlineClose
              style={{ color: "gray", fontSize: "1em", fontWeight: "bold" }}
            />
          </button>
        </header>

        <div className="flex fixed items-start justify-left w-[40em] fixed z-20">
          <ul
            className="nav nav-tabs flex flex-col flex-wrap list-none border-b-0 pl-0 mt-4"
            id="tabs-tabVertical"
            role="tablist"
          >
            <li className="nav-item flex-grow" role="presentation">
              <button
                className={showtab === "general" ? active : nonActive}
                onClick={(e) => {
                  e.preventDefault();
                  setShowtab("general");
                  console.log(moment().toDate());
                }}
              >
                General
              </button>
            </li>
            <li className="nav-item flex-grow text-center" role="presentation">
              <button
                className={showtab === "date&time" ? active : nonActive}
                onClick={(e) => {
                  e.preventDefault();
                  setShowtab("date&time");
                }}
              >
                Date and time
              </button>
            </li>
            <li className="nav-item flex-grow text-center" role="presentation">
              <button
                className={showtab === "availability" ? active : nonActive}
                onClick={(e) => {
                  e.preventDefault();
                  setShowtab("availability");
                }}
              >
                Availability
              </button>
            </li>

            <li className="nav-item flex-grow text-center" role="presentation">
              <button
                className={showtab === "event" ? active : nonActive}
                onClick={(e) => {
                  e.preventDefault();
                  setShowtab("event");
                }}
              >
                Event Settings
              </button>
            </li>
            <li className="nav-item flex-grow text-center" role="presentation">
              <button
                className={showtab === "calendarSharing" ? active : nonActive}
                onClick={(e) => {
                  e.preventDefault();
                  setShowtab("calendarSharing");
                }}
              >
                Calendar Sharing
              </button>
            </li>
          </ul>

          <div className="w-8/12 h-[46.5em] items-center bg-gray-100 break-normal p-4 rounded text-xs leading-tight text-gray-600">
            {showtab === "general" && <GeneralSettings />}
            {showtab === "date&time" && (
              <div className="tab-pane fade show active  mt-4">Date & Time</div>
            )}
            {showtab === "availability" && (
              <div className="w-full h-full tab-pane break-normal fade show active flex-wrap mt-4">
                <p>
                  Set the time when you are available to accept the appointments
                  and orders
                </p>
                <br></br>

                <div className=" flex flex-row overflow-y-auto break-normal mt-0">
                  <AiFillInfoCircle
                    style={{ color: "gray", fontSize: "2.5em", marginTop: -2 }}
                  />
                  <p className="pl-3">
                    Service events won't be booked on your weekly days off or
                    off-time. Time is specified according to your current time
                    zone.
                  </p>
                </div>
                <br></br>
                <div className="bg-gray-200 w-56 text-center rounded pt-2 h-8">
                  (GMT +00:00) Greenwich Mean Time
                </div>

                <ul
                  className="nav nav-tabs flex flex-row flex-wrap list-none border-b-0 pl-0 "
                  id="tabs-tabVertical"
                  role="tablist"
                >
                  <li className="nav-item flex-grow" role="presentation">
                    <button
                      className={
                        showInnertab === "weekly" ? active1 : nonActive1
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setShowInnertab("weekly");
                      }}
                    >
                      Weekly Schedule
                    </button>
                  </li>
                  <li
                    className="nav-item flex-grow text-center"
                    role="presentation"
                  >
                    <button
                      className={
                        showInnertab === "offtime" ? active1 : nonActive1
                      }
                      onClick={(e) => {
                        e.preventDefault();
                        setShowInnertab("offtime");
                      }}
                    >
                      Off-time
                    </button>
                  </li>
                </ul>
                {showInnertab === "weekly" && (
                  <div className="h-3/5 tab-pane fade show active text-xs border-2 -mt-2 pl-2 pt-2 overflow-hidden overflow-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                    <div className="flex flex-row pb-4 mt-1">
                      <input
                        type="checkbox"
                        className={`form -checkbox ml-2 h-4 w-4 text-black border-black focus: ring-1 cursor-pointer border-gray-200`}
                        name="allSelect"
                        checked={
                          days.filter((day) => day?.isChecked !== true).length <
                          1
                        }
                        //checked={!days.some((day) => day?.isChecked !== true)}
                        onChange={handleChange}
                      />
                      <label className="form-check-label ml-3 text-xs font-sans ">
                        All days
                      </label>
                    </div>
                    {days.map((day, index) => (
                      <div className="form-check flex pb-4" key={index}>
                        <input
                          //id={day.dayOfWeek}
                          type="checkbox"
                          className={`form -checkbox ml-2 h-4 w-4 text-black border-black focus: ring-1 cursor-pointer border-gray-200`}
                          name={day.dayOfWeek}
                          checked={day?.isChecked || false}
                          onChange={handleChange}
                        />

                        <label className="text-xs font-sans ml-2 pl-1 w-24">
                          {day.dayOfWeek}
                        </label>

                        <div className="flex flex-row w-1/2 items-right -mt-2 flex-end">
                          <div className="border-2 w-24 h-8 rounded mr-1 text-center bg-white  ">
                            <input
                              id={day.dayOfWeek}
                              type="time"
                              className={
                                day.dayOfWeek === "Saturday" ||
                                day.dayOfWeek === "Sunday"
                                  ? "w-22 h-6 text-xs font-sans mt-[0.2em] text-gray-200 border-none"
                                  : "w-22 h-6 text-xs font-sans mt-[0.2em] border-none"
                              }
                              name="startTime"
                              value={day.isChecked ? day.startTime : "09:00"}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="pt-1 text-center text-sm mr-1">-</div>

                          <div className="border-2 w-24 h-8 mr-2 rounded text-center bg-white">
                            <input
                              id={day.dayOfWeek}
                              type="time"
                              className={
                                day.dayOfWeek === "Saturday" ||
                                day.dayOfWeek === "Sunday"
                                  ? "w-22 h-6 text-xs font-sans mt-[0.2em] text-gray-200 border-none"
                                  : "w-22 h-6 text-xs font-sans mt-[0.2em] border-none"
                              }
                              name="endTime"
                              value={day.isChecked ? day.endTime : "18:00"}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      className="bg-white w-28 h-6 mb-2 rounded text-gray-400"
                      onClick={(e) => {
                        returnDefaultSetting(e);
                      }}
                    >
                      Default settings
                    </button>
                  </div>
                )}
                {showInnertab === "offtime" && (
                  <div className="font-sans text-xs border-2 pl-2 pt-1 -mt-2 rounded">
                    {offDays.map((day, key) => (
                      <div className="flex flex-row w-full ">
                        <div
                          className={
                            moment(day.endDate).format("YYYY-MM-DD") >
                            moment().format("YYYY-MM-DD")
                              ? dateActive
                              : dateNonActive
                          }
                          key={day.oid}
                        >
                          {moment(day.startDate).format("MMM D, YYYY")} -{" "}
                          {moment(day.endDate).format("MMM D, YYYY")}
                          <br />
                        </div>
                        <button
                          className=""
                          onClick={(e) => {
                            e.preventDefault();
                            removeById(tempOffDays, day.oid);
                            console.log(tempOffDays);
                            deleteOffDays();
                          }}
                        >
                          <img
                            alt="trash"
                            src={trash}
                            className="w-6 h-6 pl-2 mr-12"
                          />
                        </button>
                      </div>
                    ))}

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenModal(true);
                      }}
                      className="flex flex-row bg-white w-32 h-6 rounded text-black"
                    >
                      <GrAdd
                        style={{
                          color: "black",
                          fontSize: "1em",
                          fontWeight: "bold",
                          marginLeft: "8px",
                          marginTop: "5px",
                        }}
                      />
                      <p className="ml-2 font-serif text-sm">Add off-time</p>
                    </button>

                    <Modal
                      open={openModal}
                      onClose={() => setOpenModal(false)}
                    />
                    <br />
                  </div>
                )}
              </div>
            )}

            {showtab === "event" && (
              <div className="tab-pane fade show active">Event Settings</div>
            )}
            {showtab === "calendarSharing" && (
              <div className="tab-pane fade show active">Calendar Sharing</div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
