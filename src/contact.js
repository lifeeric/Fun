import React from "react";
import { useState, useRef } from "react";
import "./App.css";
import avater from "./avatar.png";
import emailjs from "emailjs-com";
import Snackbar from "./snackbar";

export const Contact = () => {
  const [isSent, setIsSent] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const [file, setFile] = useState();
  const [profile, setProfile] = useState(avater);
  const [imageURL, setImageURL] = useState();
  async function submitForm(e) {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const form = new FormData();
    form.append("image", profile);

    // console.log(img);

    //   // form data to be submitted

    const data = fetch(
      "https://api.imgbb.com/1/upload?key=c8642c8ab9379b07f8b11f95b672af2e",
      {
        method: "POST",
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        body: form,
      }
    );
    const formData = {
      from_name: name,
      from_email: email,
      message_body: `BabForYou.netlify.app =>  ${phone}`,
    };

    sendingEmaliTo(
      process.env.REACT_APP_TEMP_ID2,
      process.env.REACT_APP_ID2,
      formData
    ).then((res) => {
      // show success message, and show proccessing icon, clear form data
      resetInputs();
      setIsSent(true);

      setTimeout(() => setIsSent(false), 5000);
      return;
    });
  }

  const resetInputs = () => {
    nameRef.current.value = "";
    emailRef.current.value = "";
    phoneRef.current.value = "";
  };

  // sending email
  const sendingEmaliTo = async (template, userId, data) => {
    return await emailjs.send("gmail", template, data, userId).then(
      function (response) {
        //   console.log("SUCCESS!", response.status, response.text)
        return response;
      },
      function (error) {
        //   console.log("FAILED...", error)
        return error;
      }
    );
  };

  // file uploading
  const fileHandler = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
    setProfile(event.target.files[0]);
  };

  return (
    <>
      {isSent && <Snackbar />}
      <h2 className="contact__title">Say Hello to Me!</h2>
      <div className="contact">
        <form encType="multipart/form-data" className="contact__form" method="POST" onSubmit={submitForm}>
          <div className="contact__label">
            <input type="text" ref={nameRef} placeholder="Full Name" />
          </div>

          <div className="contact__label">
            <input type="text" ref={emailRef} placeholder="Email" />
          </div>

          <div className="contact__label">
            <input type="text" ref={phoneRef} placeholder="Your Zong Number" />
          </div>

          <div className="contact__profile">
            <label>Your Image</label>
            <input
              onChange={fileHandler}
              type="file"
              className="contact__file"
              accept="image/*"
            />
            <div className="contact__img">
              <img src={file ? file : profile} alt="" />
            </div>
          </div>

          <button className="contact__button" type="submit">
            Send Me bab`!
          </button>
        </form>
      </div>
    </>
  );
};
