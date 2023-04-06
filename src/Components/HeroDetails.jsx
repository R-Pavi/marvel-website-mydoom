import React, { useEffect, useState } from "react";
import hulk from "./Images/imgbin-hulk-L9NMbmufEtNV6JjTcX5rRPpvg-removebg-preview.png";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const HeroDetails = () => {
  const [url, setUrl] = useState(
    "http://gateway.marvel.com/v1/public/characters/1017100?ts=1&apikey=ecb5b76db70043b36c65f8dc830aeab1&hash=65d325a029afb4ac68f2a2d5ce99ce21"
  );
  const [heroItem, setHeroItem] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(url);
      console.log(response.data.data.results);
      setHeroItem(response.data.data.results);
    };
    fetch();
  }, [url]);

  return (
    <>
      {/* ISSUE: Uncaught TypeError: Cannot read properties of undefined (reading 'map'): RESOLVED */}
      {heroItem?.map((item) => {
        return (
          <div className="hero-details">
            {/* ISSUE: Warning: Each child in a list should have a unique "key" prop.*/}
            <div className="hero-img">
              {/* $ is used to access the value */}
              <img
                src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                alt={item.name}
                key={item.id}
                className="image"
              />
              <div className="overlay-bookmark">
                <FontAwesomeIcon icon={faBookmark} />
              </div>
            </div>

            <div className="hero-information">
              <h1 className="hero-information-name" key={item.id}>
                {item.name}
              </h1>
              <div>
                <h3 className="hero-information-description" key={item.id}>
                  {item.description}
                </h3>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default HeroDetails;