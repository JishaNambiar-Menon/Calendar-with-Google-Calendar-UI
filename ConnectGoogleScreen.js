import React, { useState, useEffect, useContext } from "react";
import eye from "../frontend-ui-kit-main-src-icons/src/icons/eye.svg";
import information from "../frontend-ui-kit-main-src-icons/src/icons/information-circle.svg";
import axios from "axios";
import { v4 as uuid } from "uuid";
import "../index.css";
import "../App.css";
import GlobalContext from "../context/GlobalContext";


const ConnectGoogleScreen = () => {
    const {openConnectGoogleScreen, setOpenConnectGoogleScreen, openGooglePullPushScreen, setOpenGooglePullPushScreen} = useContext(GlobalContext);

  if (!openConnectGoogleScreen) return null;
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
              setOpenConnectGoogleScreen(false);
            }}
          >
            X
          </p>

          <div className="content">
            <h1 className="text-base text-gray-700 font-bold font-sans">
              Connect Google calendar
            </h1>
            <br />
            <div className="flex flex-row">
              <span className="font-sans text-gray-900 font-medium text-xs">
                {"{"}
              </span>
              <p className="font-sans text-gray-900 text-xs font-medium ">
                Select synchronization options for the calendar
              </p>
              <span className="font-sans text-gray-900 font-medium text-xs">
                {"}"}
              </span>
            </div>
            <br />

            <div className="flex mb-2">
              <img
                alt="information"
                src={information}
                className="w-5 h-5 -ml-2 -mt-0.5"
              />
              <p className="text-gray-500 text-xs ml-1">
                You need to select at least one option to connect the calendar.
              </p>
            </div>

            <label className="flex m-2">
              <input
                type="checkbox"
                className={`form -ml-3 -checkbox h-4 w-4 text-black focus: ring-1 cursor-pointer`}
              />
              <p className="ml-2 text-xs text-gray-500">
                I let Marketplug to pull Google Calendar events
              </p>
            </label>
            <label className="flex m-2">
              <input
                type="checkbox"
                className={`form -ml-3 -checkbox h-4 w-4 text-black focus: ring-0 cursor-pointer`}
              />
              <p className="ml-2 text-xs text-gray-500">
                I let Marketplug to send events to Google Calendar
              </p>
            </label>
          </div>

          <div className="flex flex-row">
            <button
              className="btnCancel rounded border shadow"
              onClick={(e) => {
                setOpenConnectGoogleScreen(false);
              }}
            >
              <span className="font-medium font-sans justify-center text-center text-gray-600 text-xs">
                Cancel
              </span>
            </button>
            <button
              className="btnSetup rounded border shadow"
              onClick={(e) => {
                
                setOpenGooglePullPushScreen(true);
                setOpenConnectGoogleScreen(false);
              }}
            >
              <span className="font-medium font-sans justify-center text-center text-gray-600 text-xs">
                Set up calendar
              </span>
            </button>
            <button
              className="btnGoogleAuth rounded shadow"
              onClick={(e) => {
                e.preventDefault();
                setOpenConnectGoogleScreen(false);
                //updateOffDays();
              }}
            >
              <span className="font-medium font-sans justify-center text-center text-white text-xs">
                Connect
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectGoogleScreen;
