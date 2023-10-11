import { useState, useEffect } from "react";
import { SWIGGY_MENU_API_URL } from "../constants";

const useRestaurant = (resId) => {
        const [resInfo, setResInfo] = useState(null);

    // fetchdata
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(SWIGGY_MENU_API_URL + resId);
        const json = await data.json();
        setResInfo(json.data);
    };

    return resInfo;
};

export default useRestaurant;