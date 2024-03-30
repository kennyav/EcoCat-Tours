import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducers/loginSlice'
import developmenReducer from './reducers/developmentSlice'

export default configureStore({
  reducer: {
    loginTitle: loginReducer,
    development: developmenReducer
  },
})