// import React, { useEffect, useState } from "react";
// import { MENU_API } from "../utils/constants";

// const useRestaurantMenu = (resId) => {

//     const [resInfo,setResInfo]= useState(null)
//   useEffect(() => {
//     fetchMenu();
//   }, []);

//   const fetchMenu = async () => {
//     try {
//       const data = await fetch(MENU_API + resId);

//       if (!data.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const json = await data.json();
//       console.log(json.data);
//       setResInfo(json.data);
//     } catch (err) {
//       console.error("Error fetching menu:", err);
     
//     }
//   };

//   return resInfo;
// };

// export default useRestaurantMenu;
