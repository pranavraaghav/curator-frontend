import React from "react";
import Head from "next/dist/shared/lib/head";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { TextField } from "@mui/material";

import login from "../services/auth/login";
import storeCredentials from "../services/auth/storeCredentials";
import AuthErrorAlert from "../components/Auth/AuthErrorAlert";
import navigateToDashboard from "../services/Hooks/navigateToDashboard";

export default function Login() {
    
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    initial: true
  });
  
  const [errors, setErrors] = useState({
    credentialInvalid : false,
    usernameInvalid: credentials.username === "",
    passwordInvalid: credentials.password.length <= 8,
  })
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevstate) => ({
      ...prevstate,
      [id]: value,
      initial: false,
    }));
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    if(credentials.username === "" || credentials.password.length <= 8){
      return;
    }

    try {
      var response = await login(credentials.username, credentials.password);
    } catch (error) {
      console.log("Error in loginHandler", error);

      setErrors((prevstate) => ({
        ...prevstate,
        credentialInvalid: true,
      }))
      
      return;
    }

    storeCredentials(response.jwt, credentials.username);

    console.log("Response to Login", response);
    navigateToDashboard();
  };

  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>
      <div className="w-full h-screen bg-blue-100 fcc">
        <div className="flex flex-col items-center justify-center ">
          <div className="flex flex-col items-center justify-between h-auto p-10 m-4 text-center text-white rounded lg:m-0 lg:w-auth-form bg-sidebar">

            <div className="my-4 space-y-4 lg:mb-8">
              <h1 className="text-3xl font-bold lg:text-5xl font-noto-serif text-primary">
                Welcome Back!
              </h1>
              <h2 className="font-light tracking-wide text-ash font-noto-sans lg:text-2xl">
                Enter your credentials to login to your account
              </h2>
            </div>
            
            {
              errors.credentialInvalid &&
              <AuthErrorAlert label="Sorry, we couldnt find a match for these credentials!" />
            }

            <div className="flex flex-col items-center justify-around w-full space-y-4">
              

                <TextField 
                type="text" 
                id="username" 
                value={credentials.username}
                placeholder={"Username"}
                onChange={handleFormChange}
                className="w-full my-4 rounded-md text-coal bg-block"
                label="Username" 
                variant="outlined"
                error={credentials.username === "" && !credentials.initial}
                helperText={credentials.username === "" && !credentials.initial ? 'Please enter a username' : null}
                
                />


                <TextField 
                type="password" 
                id="password" 
                value={credentials.password}
                onChange={handleFormChange}
                className="w-full my-4 rounded-md text-coal bg-block"
                label="Password" 
                variant="outlined"
                error={credentials.password.length <= 8 && !credentials.initial}
                helperText={credentials.password.length <= 8 && !credentials.initial ? 'Please enter a valid password' : null}
                
                />

                <button
                  onClick={handleSubmitClick}
                  className="w-full py-2 text-lg font-medium text-white bg-blue-500 rounded-md font-noto-sans lg:text-2xl hover:brightness-110"
                >
                  LOG IN
                </button>

                <div className="text-lg font-normal frc lg:text-2xl text-coal">
                  Not a member yet? &nbsp;  
                  <p className="underline">
                    <Link href="/register">Sign Up </Link>
                  </p>
                </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}
