import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducers/loginSlice'
import developmenReducer from './reducers/developmentSlice'
import calendarReducer from './reducers/calendarSlice'
import dateReducer from './reducers/dateSlice'
import refreshReducer from './reducers/refreshSlice'
import salesmanReducer from './reducers/salesmanSlice'
import dateViewReducer from './reducers/dateViewSlice'
import sideMenuReducer from './reducers/sideMenuSlice'


export default configureStore({
  reducer: {
    loginTitle: loginReducer,
    development: developmenReducer,
    calendarInformation: calendarReducer,
    dateValue: dateReducer,
    refresh: refreshReducer,
    salesman: salesmanReducer,
    dateView: dateViewReducer,
    sideMenu: sideMenuReducer
  },
})