import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper"
import useOnline from "../utils/useOnline";


const Body = () => {
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        getRestaurants();
    }, []);

    async function getRestaurants() {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.2313434&lng=77.4326473&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();

        async function checkJsonData(jsonData) {
            for (let i = 0; i < jsonData?.data?.cards.length; i++) {

                // initialize checkData for Swiggy Restaurant data
                let checkData = json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

                // if checkData is not undefined then return it
                if (checkData !== undefined) {
                    return checkData;
                }
            }
        }
        // call the checkJsonData() function which return Swiggy Restaurant data
        const resData = await checkJsonData(json);
        setAllRestaurants(resData);
        setFilteredRestaurants(resData);

    }

    const isOnline = useOnline();
    if (!isOnline) {
        return <h1>🔴 Offline, Please check your internet!</h1>
    }
    //not render component(early return)
    if (!allRestaurants) return null;

    // if(filteredRestaurants?.length===0) return<h1>No restaurant found !!!</h1>
    return (allRestaurants?.length === 0) ? <Shimmer /> : (
        <>
            <div className="search-container p-5 ml-96 mt-2">
                <input type="text"
                    className="w-96 border border-black p-2 rounded-lg focus:p-2"
                    placeholder="Search a restaurant you want ..."
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                />
                <button
                    className=" p-1 m-1 bg-orange-500 hover:bg-orange-700 text-white rounded-md"
                    onClick={() => {
                        const data = filterData(searchText, allRestaurants);
                        setFilteredRestaurants(data);
                    }}
                >
                    Search
                </button>
            </div>

            <div className="restaurant-list ml-10 mr-10 flex flex-wrap justify-evenly p-5">
                {filteredRestaurants.map((restaurant) => {
                    return (
                        <Link
                            to={"/restaurant/" + restaurant?.info?.id}
                            key={restaurant?.info?.id}
                        >
                            <RestaurantCard {...restaurant?.info} />
                        </Link>
                    );
                })
                }
            </div>
        </>
    )
};

export default Body;