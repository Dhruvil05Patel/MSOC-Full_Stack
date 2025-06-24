import { createSlice } from '@reduxjs/toolkit'

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState: {
    paste:localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
  },
  reducers: {
    addToPastes: (state, action)  => {
    
    },
    updateToPastes: (state, action)  => {

    },
    ResetAllPastes: (state, action) => {
        
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, ResetAllPastes } = pasteSlice.actions

export default pasteSlice.reducer