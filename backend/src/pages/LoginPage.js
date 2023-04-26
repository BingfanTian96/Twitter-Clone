import LoginHeader from "../components/loginHeader"
import Login from "../components/login"
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