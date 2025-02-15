import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companies:[],
        searchQuery:""
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany = action.payload
        },
        setCompanies:(state,action)=>{
            state.companies = action.payload
        },
        setSearchQuery:(state,action)=>{
            state.searchQuery = action.payload
        }
    }
})

export const {setSingleCompany, setCompanies, setSearchQuery} = companySlice.actions
export default companySlice.reducer