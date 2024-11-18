import React, { useEffect, useState } from "react";
import "./Body.css";
import RestaurantCard,{withPromotedLabel} from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState();

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.1017167&lng=77.634826600000011"
      );
      const json = await data.json();
      const restaurants =
        json?.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      if (restaurants) {
        setListOfRestaurants(restaurants);
        setFilteredRes(restaurants);
      } else {
        console.error("Could not find restaurants in the response.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchText.trim() === "") {
      setFilteredRes(listOfRestaurants);
    } else {
      const filteredRestaurant = listOfRestaurants.filter((res) =>
        res.info.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRes(filteredRestaurant);
    }
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return <h1>Looks like you're Offline!! Check your Internet</h1>;

  return (
    <div className="body-container">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            setListOfRestaurants(filteredList);
          }}
        >
          Top Rated Restaurants ⭐
        </button>
      </div>
      <div className="resContainer">
        {loading
          ? Array(8) // Show 8 shimmer cards while loading
              .fill("")
              .map((_, index) => <Shimmer key={index} />)
          : filteredRes.map((restaurant) => (
              <Link
                key={restaurant.info.id}
                to={"/restaurants/" + restaurant.info.id}
              >
                {}
                <RestaurantCard resData={restaurant} />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Body;
