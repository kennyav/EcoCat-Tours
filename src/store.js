import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducers/loginSlice'
import developmenReducer from './reducers/developmentSlice'
import calendarReducer from './reducers/calendarSlice'
import dateReducer from './reducers/dateSlice'


export default configureStore({
  reducer: {
    loginTitle: loginReducer,
    development: developmenReducer,
    calendarInformation: calendarReducer,
    dateValue: dateReducer
  },
})