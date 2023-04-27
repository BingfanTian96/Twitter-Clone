import LoginHeader from "../components/loginHeader.js"
import Login from "../components/login.js"
import React from 'react';

export default function LoginPage(){

  return (
    <div className="login-signup-div">
      <div className = "items-align">
        <LoginHeader
            heading="Login to your account"
            paragraph="Don't have an account yet? "
            linkName="Signup"
            linkUrl="/signup"
        />
        <Login/>
      </div>
    </div>
  );
};