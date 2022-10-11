import React, { useState, useEffect, useContext } from "react";
import eye from "../frontend-ui-kit-main-src-icons/src/icons/eye.svg";
import information from "../frontend-ui-kit-main-src-icons/src/icons/information-circle.svg";
import axios from "axios";
import { v4 as uuid } from "uuid";
import "../index.css";
import "../App.css";
import GlobalContext from "../context/GlobalContext";
import ConnectGoogleScreen from "./ConnectGoogleScreen";

const GoogleAuthScreen = () => {

  const {openConnectGoogleScreen, setOpenConnectGoogleScreen, openGoogleAuth, setOpenGoogleAuth} = useContext(GlobalContext);

  if (!openGoogleAuth) return null;
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
              //onClose();
              setOpenGoogleAuth(false);
            }}
          >
            X
          </p>

          <div className="content">
            <h1 className="text-base text-gray-700 font-bold font-sans">
              Google authorization
            </h1>
            <br />
            <div className="flex flex-col">
              <p className="font-sans text-xs pb-2 font-medium">Email*</p>
              <input
                className="h-10 text-xs text-gray-400 border border-gray-400 rounded"
                type="email"
                placeholder="abc@gmail.com"
              />

              <br></br>

              <p className="font-sans text-xs pb-2 font-medium">Password*</p>
              <div className="flex flex-row w-auto border border-gray-400 rounded">
                <input
                  className="w-4/5 mt-1 mr-6 block px-3 py-2 bg-white border-none text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-white disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  type="password"
                  placeholder="****"
                />
                <img alt="eye" src={eye} className="w-10 h-5 mt-2.5 pl-4" />
              </div>
            </div>
          </div>

          <div className="flex flex-row">
            <button
              className="btnCancel rounded border shadow"
              onClick={(e) => {
                setOpenGoogleAuth(false);
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

                setOpenGoogleAuth(false);
                setOpenConnectGoogleScreen(true);
                //updateOffDays();
              }}
            >
              <span className="font-medium font-sans justify-center text-center text-white text-xs">
                Confirm
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuthScreen;
