import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader2 from "./components/CalendarHeader2";
import CalendarHeader from "./components/CalendarHeader";

import Sidebar from "./components/Sidebar";
import Month from "./components/Month";

import EventModal from "./components/EventModal";
import EditEvent from "./components/EditEvent";
import GlobalContext from "./context/GlobalContext";

//import DatePicker from "./components/DatePicker";
//import DatePicker1 from "./components/DatePicker1";
import DatePicker2 from "./components/DatePicker2";
import DatePicker3 from "./components/DatePicker3";
import Location from './components/Location';

import Availability from "./components/AvailabilityMain";
import ConnectGoogleScreen from "./components/ConnectGoogleScreen";
import GoogleAuthScreen from "./components/GoogleAuthScreen";
import GooglePullPushScreen from "./components/GooglePullPushScreen";
    
  


import TextEditor from "./components/TextEditor";
//import TE from "./components/TE";

function App() {
  
  const [selected, setSelected] = useState("Month");
  
  //console.log("Hello")
  //console.table(getMonth())

  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const { monthIndex, showEventModal, showAvailabilityModal,setShowAvailabilityModal,showDatePicker, showDatePicker1, selectedEvent, showMap, setOpenConnectGoogleScreen, openConnectGoogleScreen, openGoogleAuth, setOpenGoogleAuth, openGooglePullPushScreen } = useContext(GlobalContext);

  //every time the global context monthIndex changes
  //setCurrentMonth will call the function getMonth()
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  
   
  
  return (
    <React.Fragment>
      {showEventModal && <EditEvent />}
      {showDatePicker && <DatePicker2 />}
      {showDatePicker1 && <DatePicker3 />}
      {showAvailabilityModal && <Availability/>}
      {openGoogleAuth && <GoogleAuthScreen/>}
      {openConnectGoogleScreen && <ConnectGoogleScreen/>}
      {openGooglePullPushScreen && <GooglePullPushScreen/>}

      
      <div className="h-screen flex grow flex-col bg-header-bggray scrollbar-hide  ">
        <CalendarHeader2 selected={selected} setSelected={setSelected} />

        <div className="flex flex-1 ml-16">
          <div className="-mt-10 bg-header-white mr-3 rounded-lg">
            <Sidebar />
          </div>
          <div className="flex flex-col grow -mt-10 rounded-lg bg-header-white mr-10 pt-3 pb-2 pl-3 pr-3">
            <CalendarHeader />
            <Month month={currentMonth} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;

//<Month month={currentMonth} />




