import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  startDaySelected: null,
  endDaySelected: null,
  setStartDaySelected: () => {},
  setEndDaySelected: () => {},
  showEventModal: false,
  setShowEventModal: () => {},
  showAvailabilityModal: false,
  setShowAvailabilityModal: () => {},
  showMap: false,
  setShowMap: () => {},
  showDatePicker: false,
  showDatePicker1: false,
  setDatePicker: () => {},
  setDatePicker1: () => {},
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],
  setSavedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  labels: [],
  setLabels: () => {},
  updateLabel: () => {},
  filteredEvents: [],
  tempStart: [],
  setTempStart: () => {},
  tempEnd: [],
  setTempEnd: () => {},
  officeVal: null,
  setOfficeVal: () => {},
  office: null,
  setOffice: () => {},
  days: [],
  setDays: () => {},
  offDays: [],
  setOffDays: () => {},
  openGoogleAuth: false,
  setOpenGoogleAuth: () => {},
  openConnectGoogleScreen: false,
  setOpenConnectGoogleScreen: () => {},
  openGooglePullPushScreen : false,
  setOpenGooglePullPushScreen: () => {}
});

export default GlobalContext;