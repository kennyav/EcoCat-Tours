import { createSlice } from '@reduxjs/toolkit'

export const dateSlice = createSlice({
   name: 'dateValue',
   initialState: {
      year: 0,
      monthName: "",
      monthIndex: -1,
      
   },
   reducers: {
      updateDate: (state, action) => {
         state.year = action.payload.year
         state.monthName = action.payload.monthName
         state.monthIndex = action.payload.monthIndex
      }
   },
})

export const { updateDate } = dateSlice.actions

export default dateSlice.reducer
