import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

const initialDate = moment();

export const dateSlice = createSlice({
   name: 'dateValue',
   initialState: {
      date: initialDate.format('YYYY-MM-DD')
   },
   reducers: {
      updateDate: (state, action) => {
         state.date = action.payload.date
      }
   },
})

export const { updateDate } = dateSlice.actions

export default dateSlice.reducer
