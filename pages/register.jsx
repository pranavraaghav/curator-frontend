import React from "react";
import Head from "next/dist/shared/lib/head";
import signup from "../services/auth/signup";
import storeJWT from "../services/auth/storeJWT";
import { useState } from "react";

export default function Register() {
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevstate) => ({
      ...prevstate,
      [id]: value,
    }));
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    try {
      var response = await signup(
        credentials.email,
        credentials.username,
        credentials.password
      );
    } catch (error) {
      console.log("Error in signUpHandler", error);
      return;
    }

    storeJWT(response.jwt);

    console.log("Response to Signup in register", response);
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex flex-col items-center justify-center">
        <div className="p-10 text-white text-center rounded bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500">
          <h1 className="text-5xl font-noto-serif">
            An Exquistely Crafted Sign Up Page
          </h1>
          <input
            type="text"
            id="email"
            placeholder="email"
            value={credentials.email}
            onChange={handleFormChange}
            className="m-4 mx-auto p-2 block text-black"
          />
          <input
            type="text"
            id="username"
            placeholder="username"
            value={credentials.username}
            onChange={handleFormChange}
            className="m-4 mx-auto p-2 block text-black"
          />
          <input
            type="text" // TODO: change this to password
            id="password"
            placeholder="password"
            value={credentials.password}
            onChange={handleFormChange}
            className="m-4 mx-auto p-2 block text-black"
          />
          <button
            onClick={handleSubmitClick}
            className="m-4 p-2 px-4 rounded-md bg-green-400 text-white"
          >
            SIGNUP
          </button>
        </div>
      </div>
    </>
  );
}
