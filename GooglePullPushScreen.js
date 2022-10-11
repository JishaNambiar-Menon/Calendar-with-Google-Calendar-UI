import React, { useContext, useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import save from "../frontend-ui-kit-main-src-icons/src/icons/save.svg";
import { GrAdd } from "react-icons/gr";
import axios from "axios";
import Modal from "./ModalMain";
import "../App.css";
import "../index.css";
import moment from "moment";
import GlobalContext from "../context/GlobalContext";
import GeneralSettings from "./GeneralSettings";

const googleCalendars = ["Home", "Work", "Family"];

export default function GooglePullPushScreen() {
  const [showtab, setShowtab] = useState("pull");
  const { openGooglePullPushScreen, setOpenGooglePullPushScreen } =
    useContext(GlobalContext);
  const [isActive, setIsActive] = useState(false);
  const privacyOptions = ["Private", "Public"];
  const availabilityOptions = ["Free", "Busy"];
  const [privacySelected, setPrivacySelected] = useState("Private");
  const [availabilitySelected, setAvailabilitySelected] = useState("Free");

  const active =
    "w-40 inline-block align-middle text-center font-sans font-bold text-xs leading-tight text-justify text-gray-800 pl-2 border-x-0 border-t-0 border-transparent -pl-8 py-1 my-2 focus: border-b-4 border-purple-400";
  const nonActive =
    "w-40 inline-block align-middle text-center font-sans font-bold text-xs leading-tight text-gray-500 text-justify pl-2 border-x-0 border-t-0 border-transparent py-1 my-2 focus: border-transparent";

  if (!openGooglePullPushScreen) return null;
  return (
    <div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <div className="modalRight">
          <p
            className="closeBtn text-gray-400"
            onClick={() => {
              setOpenGooglePullPushScreen(false);
            }}
          >
            X
          </p>

          <div className="content">
            <h1 className="text-base text-gray-700 font-bold font-sans">
              Set up Google calendar
            </h1>
            <br />

            <ul
              className="nav nav-tabs flex flex-row flex-wrap list-none border-b-0 pl-0 "
              id="tabs-tabVertical"
              role="tablist"
            >
              <li className="nav-item flex-grow" role="presentation">
                <button
                  className={showtab === "pull" ? active : nonActive}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowtab("pull");
                  }}
                >
                  Pull events
                </button>
              </li>
              <li
                className="nav-item flex-grow text-center"
                role="presentation"
              >
                <button
                  className={showtab === "push" ? active : nonActive}
                  onClick={(e) => {
                    e.preventDefault();
                    setShowtab("push");
                  }}
                >
                  Push events
                </button>
              </li>
            </ul>

            {showtab === "pull" && (
              <div className="flex flex-col">
                <div className="flex flex-row pb-4 mt-1">
                  <input
                    type="checkbox"
                    className={`form -checkbox ml-2 h-4 w-4 text-black border-black focus: ring-1 cursor-pointer`}
                    name="pullEvents"
                    onChange={() => {}}
                  />
                  <label className="form-check-label ml-3 text-xs font-sans ">
                    I let Marketplug to pull Google Calendar events
                  </label>
                </div>

                <div className="flex flex-row">
                  <div className="flex flex-col font-sans text-xs text-gray-500">
                    <p>Private events display as</p>
                    <div className="flex flex-end fixed order-none align-items-center font-mono inline-block relative w-40 h-10 pr-2">
                      <div className="dropdown w-40 h-8">
                        <div
                          className="dropdown-btn font-sans w-33 h-10"
                          onClick={(e) => {
                            setIsActive(!isActive);
                          }}
                        >
                          {privacySelected}
                          <FaCaretDown color="gray" fontSize="1.2em" />
                        </div>
                        {isActive && (
                          <div className="dropdown-content font-sans font-red-100">
                            {privacyOptions.map((option) => (
                              <div
                                onClick={(e) => {
                                  setPrivacySelected(option);
                                  setIsActive(false);
                                  //setSelType(option);
                                }}
                                className="dropdown-item font-sans text-xs text-purple-100"
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-8 font-sans text-xs text-gray-500 ">
                    <p>Public events display as</p>
                    <div className="flex flex-end fixed order-none align-items-center font-mono inline-block relative w-40 h-10 pr-2">
                      <div className="dropdown w-40 h-8">
                        <div
                          className="dropdown-btn font-sans w-33 h-10"
                          onClick={(e) => {
                            setIsActive(!isActive);
                          }}
                        >
                          {privacySelected}
                          <FaCaretDown color="gray" fontSize="1.2em" />
                        </div>
                        {isActive && (
                          <div className="dropdown-content font-sans font-red-100">
                            {privacyOptions.map((option) => (
                              <div
                                onClick={(e) => {
                                  setPrivacySelected(option);
                                  setIsActive(false);
                                  //setSelType(option);
                                }}
                                className="dropdown-item font-sans text-xs text-purple-100"
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <div className="flex flex-row">
                  <div className="flex flex-col font-sans text-xs text-gray-500">
                    <p>Private events display as</p>
                    <div className="flex flex-end fixed order-none align-items-center font-mono inline-block relative w-40 h-10 pr-2">
                      <div className="dropdown w-40 h-8">
                        <div
                          className="dropdown-btn font-sans w-33 h-10"
                          onClick={(e) => {
                            setIsActive(!isActive);
                          }}
                        >
                          {privacySelected}
                          <FaCaretDown color="gray" fontSize="1.2em" />
                        </div>
                        {isActive && (
                          <div className="dropdown-content font-sans font-red-100">
                            {privacyOptions.map((option) => (
                              <div
                                onClick={(e) => {
                                  setPrivacySelected(option);
                                  setIsActive(false);
                                  //setSelType(option);
                                }}
                                className="dropdown-item font-sans text-xs text-purple-100"
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-8 font-sans text-xs text-gray-500 ">
                    <p>Public events display as</p>
                    <div className="flex flex-end fixed order-none align-items-center font-mono inline-block relative w-40 h-10 pr-2">
                      <div className="dropdown w-40 h-8">
                        <div
                          className="dropdown-btn font-sans w-33 h-10"
                          onClick={(e) => {
                            setIsActive(!isActive);
                          }}
                        >
                          {privacySelected}
                          <FaCaretDown color="gray" fontSize="1.2em" />
                        </div>
                        {isActive && (
                          <div className="dropdown-content font-sans font-red-100">
                            {privacyOptions.map((option) => (
                              <div
                                onClick={(e) => {
                                  setPrivacySelected(option);
                                  setIsActive(false);
                                  //setSelType(option);
                                }}
                                className="dropdown-item font-sans text-xs text-purple-100"
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <br />
            <p className="mt-2 w-72 text-gray-500 font-sans font-bold text-xs mr-3 ">
              Calendars to be connected
            </p>

            <div className="flex flex-col">
            {googleCalendars.map((calendar, key)=> {
                <div className="flex flex-row">
                    <input
                        type="checkbox"
                        key={key}
                    />
                    <p>{calendar}</p>
                </div>
            })}

            </div>
            <div className="flex flex-row">
              <button
                className="btnCancel rounded border shadow"
                onClick={(e) => {
                  setOpenGooglePullPushScreen(false);
                }}
              >
                <span className="font-medium font-sans justify-center text-center text-gray-600 text-xs">
                  Cancel
                </span>
              </button>

              <button
                className="btnGoogleAuth rounded shadow"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenGooglePullPushScreen(false);
                  //updateOffDays();
                }}
              >
                <div className="flex flex-row">
                  <img alt="save" src={save} className="w-5 h-5 ml-2" />
                  <span className="font-medium font-sans justify-center text-center text-white text-xs ml-2 mt-0.5">
                    Save
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
