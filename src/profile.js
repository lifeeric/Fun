import React from "react";
import "./App.css";
import img from "./index.png";

export const Profile = () => {
  return (
    <div className="baby">
      <div className="baby__container">
        <div className="baby__img">
          <img
            src={img}
            alt="It's friday, I'm doing this for fun. I got free time so I thought I spend some time!"
          />
        </div>
        <div className="baby__body">
          <h2>Hey, Afghan baby!</h2>
          <p>Just for fun, I hope you'd love it!</p>
        </div>
      </div>
    </div>
  );
};
