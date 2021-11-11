import React from "react";
import Head from "next/dist/shared/lib/head";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { TextField } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

import storeCredentials from "../services/auth/storeCredentials";
import signup from "../services/auth/signup";
import AuthErrorAlert from "../components/Auth/AuthErrorAlert";
import navigateToDashboard from "../services/Hooks/navigateToDashboard";

export default function Register() {
  const router = useRouter()
  
  const [errors, setErrors] = useState({
    signUpError: false,
    tncError: false,
  })

  
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
    initial: true,
    tnc: false,
  });
  

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

    if(!credentials.tnc){
      setErrors((prevstate) => ({
        ...prevstate,
        tncError: true,
      }))
    }

    if(credentials.email === "" || credentials.username === "" || credentials.password.length <= 8){
      return;
    }


    try {
      var response = await signup(
        credentials.email,
        credentials.username,
        credentials.password
      );
    } catch (error) {
      console.log("Error in signUpHandler", error);

      setErrors((prevstate) => ({
        ...prevstate,
        signUpError: true,
      }))

      return;
    }

    storeCredentials(response.jwt, credentials.username);
    

    console.log("Response to Signup in register", response);
    navigateToDashboard(router);
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="w-full h-screen bg-blue-100 fcc">
        <div className="flex flex-col items-center justify-center ">
          <div className="flex flex-col items-center justify-between h-auto p-10 m-4 text-center text-white rounded lg:m-0 lg:w-1/2 bg-sidebar">
            
            <div className="my-4 space-y-4 lg:mb-8">
                <h1 className="text-3xl font-bold lg:text-5xl font-noto-serif text-primary">
                  Hello There!
                </h1>
                <h2 className="font-light tracking-wide text-ash font-noto-sans lg:text-2xl">
                  Please fill out these fields to get started!
                </h2>
            </div>
            
            {
              errors.signUpError &&
              <AuthErrorAlert label="There was an error signing up. Please try again later!" />
            }

            {
              errors.tncError &&
              <AuthErrorAlert label="Please agree to the Terms and Conditions" />
            }

            <div className="flex flex-col items-center justify-around w-full space-y-4 ">
              

              <TextField 
              type="text" 
              id="email" 
              value={credentials.email}
              placeholder={"Email"}
              onChange={handleFormChange}
              className="w-full rounded-md w-f text-coal bg-block"
              label="Email" 
              variant="outlined"   
              error={credentials.email === "" && !credentials.initial}
              helperText={credentials.email === "" && !credentials.initial ? 'Please enter an email' : null}           
              />

              <TextField 
              type="text" 
              id="username" 
              value={credentials.username}
              placeholder={"Username"}
              onChange={handleFormChange}
              className="w-full rounded-md text-coal bg-block"
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
              className="w-full rounded-md text-coal bg-block"
              label="Password" 
              variant="outlined"
              error={credentials.password.length <= 8 && !credentials.initial}
              helperText={credentials.password.length <= 8 && !credentials.initial ? 'Please enter a valid password' : null}
              
              />

              <div className="space-x-2 frc">
                <Checkbox 
                id="tnc" 
                value={credentials.tnc}
                onChange={handleFormChange} 
                name="tnc" 
                sx={{ '& .MuiSvgIcon-root': { fontSize: 32 } }}
                />
                <h3 className="text-base text-coal lg:text-xl">I agree to the <a className="underline" href="https://en.wikipedia.org/wiki/Terms_of_service">Terms and Conditions</a></h3> 
              </div>

              <button
                onClick={handleSubmitClick}
                className="w-full py-2 text-lg font-medium text-white bg-blue-500 rounded-md font-noto-sans lg:text-2xl hover:brightness-110"
              >
                SIGN UP
              </button>

              <div className="text-lg font-normal frc lg:text-2xl text-coal">
                Already been here? &nbsp;  
                <p className="underline">
                  <Link href="/login">Login here</Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
