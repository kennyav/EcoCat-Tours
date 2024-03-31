import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducers/loginSlice'
import developmenReducer from './reducers/developmentSlice'
import calendarReducer from './reducers/calendarSlice'

export default configureStore({
  reducer: {
    loginTitle: loginReducer,
    development: developmenReducer,
    calendarInformation: calendarReducer
  },
})