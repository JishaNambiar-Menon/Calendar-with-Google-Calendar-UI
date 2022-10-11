import React, { useEffect, useState} from 'react';
import GlobalContext from './GlobalContext';
import dayjs from 'dayjs';
import axios from 'axios';

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [startDaySelected, setStartDaySelected] = useState(dayjs());
  //const [startDaySelected, setStartDaySelected] = useState(dayjs());
  const [endDaySelected, setEndDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showDatePicker, setDatePicker] = useState(false);
  const [showDatePicker1, setDatePicker1] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [labels, setLabels] = useState([]);
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [tempStart, setTempStart] = useState([]);
  const [tempEnd, setTempEnd] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [officeVal, setOfficeVal] = useState(null);
  const [office, setOffice] = useState(null);

  //Settings Availabality
  const [days, setDays] = useState([]);
  const [offDays, setOffDays] = useState([])
  
  //Google Calendar
  const [openConnectGoogleScreen, setOpenConnectGoogleScreen] = useState(false);
  const [openGoogleAuth, setOpenGoogleAuth] = useState(false);
  const [openGooglePullPushScreen, setOpenGooglePullPushScreen] = useState(false)

  
  useEffect(() => {
    const fetchAvailabilitySettings = async () => {
      try {
        const response = await axios.get("http://localhost:3006/availability", {
          responseType: "json",
        });
        setDays(response.data);
        
        console.log(response.data);
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

    useEffect(() => {
      const fetchOffDays = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3007/calendar?id=1",
            {
              responseType: "json",
            }
          );
          setOffDays(response.data[0].offDays);
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
    }, []);
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3005/event", {
          responseType: "json",
        });
        setSavedEvents(response.data);
        console.log(response.data);
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

    fetchEvents();
  }, []);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (tempStart.length !== 0) {
      //setEventStart(eventStart.set("hour", temp[0]).set("minute", temp[1]));
      setStartDaySelected(
        startDaySelected.set("hour", tempStart[0]).set("minute", tempStart[1])
      );
      // setNewDate(newDate.set("hour", temp[0]).set("minute", temp[1]));
    }
  });

  useEffect(() => {
    if (tempEnd.length !== 0) {
      //setEventStart(eventStart.set("hour", temp[0]).set("minute", temp[1]));
      setEndDaySelected(
        endDaySelected.set("hour", tempEnd[0]).set("minute", tempEnd[1])
      );
      // setNewDate(newDate.set("hour", temp[0]).set("minute", temp[1]));
    }
  });

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        startDaySelected,
        setStartDaySelected,
        endDaySelected,
        setEndDaySelected,
        showEventModal,
        setShowEventModal,
        showAvailabilityModal,
        setShowAvailabilityModal,
        showDatePicker,
        setDatePicker,
        showDatePicker1,
        setDatePicker1,
        selectedEvent,
        setSelectedEvent,
        //dispatchCalEvent,
        savedEvents,
        setLabels,
        labels,
        tempEnd,
        tempStart,
        setTempEnd,
        setTempStart,
        showMap,
        setShowMap,
        officeVal,
        setOfficeVal,
        office,
        setOffice,
        days,
        setDays,
        offDays,
        setOffDays,
        openGoogleAuth,
        openConnectGoogleScreen,
        openGooglePullPushScreen,
        setOpenGoogleAuth,
        setOpenConnectGoogleScreen,
        setOpenGooglePullPushScreen
        

        // updateLabel,
        // filteredEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
