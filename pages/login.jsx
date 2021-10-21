import React from "react";
import Head from "next/dist/shared/lib/head";
import { useState } from "react";
import login from "../services/auth/login";
import storeJWT from "../services/auth/storeJWT";

export default function Login() {
  const [credentials, setCredentials] = useState({
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
      var response = await login(credentials.username, credentials.password);
    } catch (error) {
      console.log("Error in loginHandler", error);
      return;
    }

    storeJWT(response.jwt);

    console.log("Response to Login", response);
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex flex-col items-center justify-center">
        <div className="p-10 text-white rounded text-center bg-gradient-to-br from-purple-600 via-blue-500 to-green-400">
          <h1 className="text-5xl font-noto-serif">
            An Adequately Made Login Page
          </h1>
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
            LOGIN
          </button>
        </div>
      </div>
    </>
  );
}
