import React from "react";
import Head from "next/dist/shared/lib/head";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import login from "../services/auth/login";
import storeJWT from "../services/auth/storeJWT";

export default function Login() {
  const router = useRouter()

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
    navigateToDashboard()
  };

  const navigateToDashboard = () => {
    const username = credentials.username;
    router.push("/dashboard/"+username);

  }

  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>
      <div className="flex flex-col items-center justify-center">
        <div className="p-10 text-center text-white rounded bg-gradient-to-br from-purple-600 via-blue-500 to-green-400">
          <h1 className="text-5xl font-noto-serif">
            An Adequately Made Login Page
          </h1>
          <input
            type="text"
            id="username"
            placeholder="username"
            value={credentials.username}
            onChange={handleFormChange}
            className="block p-2 m-4 mx-auto text-black"
          />
          <input
            type="text" // TODO: change this to password
            id="password"
            placeholder="password"
            value={credentials.password}
            onChange={handleFormChange}
            className="block p-2 m-4 mx-auto text-black"
          />
          <button
            onClick={handleSubmitClick}
            className="p-2 px-4 m-4 text-white bg-green-400 rounded-md"
          >
            LOGIN
          </button>
        </div>
      </div>
    </>
  );
}
