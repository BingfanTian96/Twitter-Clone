import LoginHeader from "../components/loginHeader";
import Signup from "../components/signUp";
import React from 'react';

export default function SignUpPage(){
    return(
        <div className="login-signup-div">
            <div className = "items-align">
                <LoginHeader
                heading="Create a new account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/login"
                />
                <Signup/>
            </div>
        </div>
    )
}