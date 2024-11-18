import React from "react";
import { CDN_URL } from "../utils/constants";
import "./RestaurantCard.css";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cloudinaryImageId, avgRating, sla, cuisines, costForTwo } =
    resData?.info;

  return (
    <div className="restaurant-card">
      <div className="image-container">
        <img
          className="restaurant-image"
          alt={name}
          src={CDN_URL + cloudinaryImageId}
        />
      </div>
      <div className="restaurant-details">
        <h3 className="restaurant-name">{name}</h3>
        <p className="restaurant-cuisines">{cuisines.join(", ")}</p>
        <div className="restaurant-info">
          <span
            className={`rating ${
              avgRating >= 4 ? "high-rating" : "low-rating"
            }`}
          >
            ⭐ {avgRating}
          </span>
          <span>{sla?.slaString}</span>
        </div>
        <p className="cost-for-two">{costForTwo} FOR TWO</p>
      </div>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return () => {
    return (
      <div>
        <label>Promoted</label>
        <RestaurantCard />
      </div>
    );
  };
};

export default RestaurantCard;
