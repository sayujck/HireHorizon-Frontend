import {createSlice} from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        alljobs: [],
    },
    reducers: {
        setAlljobs: (state, action) => {
            state.jobs = action.payload;
        },
    }
});

export const {setAlljobs} = jobSlice.actions;
export default jobSlice.reducer;