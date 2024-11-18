import { useEffect, useState } from "react";
import React from "react";
import Shimmer from "../Body/Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState(null); // State for error handling
  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState(0);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await fetch(MENU_API + resId);

      if (!data.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await data.json();

      setResInfo(json.data);
    } catch (err) {
      console.error("Error fetching menu:", err);
      setError("Failed to load restaurant menu. Please try again later.");
    }
  };

  const restaurantInfo = resInfo?.cards?.[2]?.card?.card?.info;
  
  const itemCards =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card
      ?.card?.itemCards;

  const categories =
    resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return resInfo === null ? (
    <Shimmer />
  ) : (
    <div className="text-center">
      {restaurantInfo ? (
        <>
          <h1 className="font-bold my-6 text-2xl">{restaurantInfo.name}</h1>
          <div className="">
            <h3>{restaurantInfo.avgRating}</h3>
            <h3>{restaurantInfo.costForTwoMessage}</h3>
            <h4>{restaurantInfo.sla.maxDeliveryTime} mins</h4>
          </div>
          {categories.map((category, index) => (
            <RestaurantCategory
              key={category?.card?.card.title}
              data={category?.card?.card}
              f
              showItems={index === showIndex ? true : false}
              setShowIndex = {()=>setShowIndex(index)}
            />
          ))}
        </>
      ) : (
        <div>No restaurant information available.</div>
      )}
    </div>
  );
};

export default RestaurantMenu;
