import React, { useState, useEffect, useContext } from "react";
import trash from "../frontend-ui-kit-main-src-icons/src/icons/trash.svg";
import pencil from "../frontend-ui-kit-main-src-icons/src/icons/pencil.svg";
import information from "../frontend-ui-kit-main-src-icons/src/icons/information-circle.svg";
import axios from "axios";
import { v4 as uuid } from "uuid";
import "../index.css";
import "../App.css";
import GoogleAuthScreen from "./GoogleAuthScreen";
import GlobalContext from "../context/GlobalContext";

const appleEmail = [
  {
    connectionId: 1,
    connectionCalendarId: "marketplugdeveloper@outlook.com",
    calendarId: "tester2@marketplug.com",
    platform: "OUTLOOK",
    pulledEvents: "true",
    pulledPrivateEvents: "PUBLIC",
    pulledPublicEvents: "PUBLIC",
    pulledFreeEvents: "BUSY",
    pulledBusyEvents: "BUSY",
    pulledEventsHomeConnected: "true",
    pulledEventsWorkConnected: "true",
    pulledEventsFamilyConnected: true,
    pushedEvents: true,
    pushedPrivateEvents: "PUBLIC",
    pushedPublicEvents: "PUBLIC",
    pushedFreeEvents: "PUBLIC",
    pushedBusyEvents: "PUBLIC",
    pushedEventsHomeConnected: false,
    pushedEventsWorkConnected: false,
    pushedEventsFamilyConnected: false,
  },
  {
    connectionId: 2,
    connectionCalendarId: "tester2@gmail.com",
    calendarId: "tester2@marketplug.com",
    platform: "GOOGLE",
    pulledEvents: "true",
    pulledPrivateEvents: "PUBLIC",
    pulledPublicEvents: "PUBLIC",
    pulledFreeEvents: "BUSY",
    pulledBusyEvents: "BUSY",
    pulledEventsHomeConnected: "true",
    pulledEventsWorkConnected: "true",
    pulledEventsFamilyConnected: true,
    pushedEvents: true,
    pushedPrivateEvents: "PUBLIC",
    pushedPublicEvents: "PUBLIC",
    pushedFreeEvents: "PUBLIC",
    pushedBusyEvents: "PUBLIC",
    pushedEventsHomeConnected: false,
    pushedEventsWorkConnected: false,
    pushedEventsFamilyConnected: false,
  },
];

const GeneralSettings = () => {
  const {openGoogleAuth, setOpenGoogleAuth} = useContext(GlobalContext);
  return (
    <div className="w-full h-full tab-pane break-all fade show active flex-wrap mt-4">
      <div className="flex flex-row">
        <p className="mt-2 w-72 text-gray-500 font-sans font-bold text-xs mr-3 py-1.5">
          Calendar Privacy
        </p>
        <button className="ml-8 text-gray-500 rounded border border-slate-300 font-sans bg-white w-28 py-1.5 font-medium px-1">
          Update privacy
        </button>
      </div>

      <br></br>

      <div className=" flex flex-row overflow-y-auto break-normal mt-0 border rounded py-2 bg-white">
        <p className="pl-3 my-1 w-36 text-gray-500 font-sans font-bold text-xs py-1 ">
          Google calendar
        </p>
        <p className="my-1 w-28 text-orange-500 text-center font-sans font-medium text-xs py-1 bg-orange-50 rounded px-2">
          Not connected
        </p>
        <button
          className="text-gray-500 ml-12 rounded border border-slate-300 font-sans bg-white w-20 py-1 font-medium px-1"
          onClick={(e) => {
            e.preventDefault();
            setOpenGoogleAuth(true);
          }}
        >
          Connect
        </button>
        
      </div>

      <div className=" flex flex-col overflow-y-auto break-normal mt-4 border rounded py-2 bg-white">
        <div className="flex flex-row overflow-y-auto break-normal bg-white">
          <p className="pl-3 my-1 w-36 text-gray-500 font-sans font-bold text-xs py-1 ">
            Apple calendar
          </p>
          <p className="my-1 w-28 text-green-500 text-center font-sans font-medium text-xs py-1 px-2 bg-green-50 rounded ">
            Connected
          </p>
          <button className="text-gray-500 ml-12 rounded border border-slate-300 font-sans bg-white w-20 py-1 font-medium px-1">
            Add
          </button>
        </div>

        <hr className="w-100 border-none h-0.5 bg-gray-200 rounded my-2 mx-3"></hr>
        <div className="pl-3 text-gray-500 py-1">
          {appleEmail.map((email, key) => (
            <div className="flex flex-row mt-1">
              <p className="font-sans pt-3 pb-3 w-96">
                {email.connectionCalendarId}
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  alert("pencil");
                }}
              >
                <img alt="pencil" src={pencil} className="w-7 h-7 pt-1" />
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  alert("trash");
                }}
              >
                <img
                  alt="trash"
                  src={trash}
                  className="w-6 h-7 ml-8 mr-8 pt-1"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className=" flex flex-row overflow-y-auto break-normal mt-4 border rounded py-2 bg-white">
        <p className="pl-3 my-1 w-36 text-gray-500 font-sans font-bold text-xs py-1 ">
          Outlook calendar
        </p>
        <p className="my-1 w-28 text-orange-500 text-center font-sans font-medium text-xs py-1.5 bg-orange-50 rounded px-2">
          Not connected
        </p>
        <button className="text-gray-500 ml-12 rounded border border-slate-300 font-sans bg-white w-20 py-1 font-medium px-1">
          Connect
        </button>
      </div>

      <hr className="w-full border-none h-0.5 bg-gray-200 rounded my-4"></hr>

      <p className="font-sans font-medium">
        Use this email to search me on Marketplug calendar
      </p>

      <br></br>
      <input
        type="email"
        placeholder="marketplugdeveloper@outlook.com"
        className="bg-white text-xs w-full rounded pt-2 h-8 border-gray-200"
      ></input>
    </div>
  );
};

export default GeneralSettings;
