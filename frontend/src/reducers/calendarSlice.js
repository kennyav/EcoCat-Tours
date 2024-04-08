import { createSlice } from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
   name: 'calendarInformation',
   initialState: {
      eventInfo: {},
      id: "",
      date: {
         month: "",
         day: 0,
         year: 0,
         time: ""
      },
      clicked: false
   },
   reducers: {
      update: (state, action) => {
         state.eventInfo = action.payload.eventInfo
         state.id = action.payload.id
         state.date = action.payload.date
         state.clicked = action.payload.clicked
      }
   },
})

export const { update } = calendarSlice.actions


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export default calendarSlice.reducer
