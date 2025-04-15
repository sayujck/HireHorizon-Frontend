import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const [query, setQuery] = useState({title:'',location:''})

    const getJobUpdateStatus=(updatedAt)=> {
        const jobDate = new Date(updatedAt);
        const currentDate = new Date();
        const timeDiff = currentDate - jobDate;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const monthDiff = Math.floor(daysDiff / 30);
        const yearDiff = currentDate.getFullYear() - jobDate.getFullYear();

        if (daysDiff < 1) {
            return "Updated today";
        } else if (daysDiff === 1) {
            return "Updated yesterday";
        } else if (daysDiff < 30) {
            return `Updated ${daysDiff} days ago`;
        } else if (monthDiff < 12) {
            return `Updated ${monthDiff} month${monthDiff > 1 ? 's' : ''} ago`;
        } else {
            return `Updated ${yearDiff} year${yearDiff > 1 ? 's' : ''} ago`;
        }
    }
    

    const value = { query, setQuery, getJobUpdateStatus }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}