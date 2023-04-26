import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import LoginInput from "./loginInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from 'react';

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    const authenticateUser = () =>{
        axios.post('/api/users/login',  {
            username: loginState["username"],
            password: loginState["password"],
        })
        .then((response) => {
            navigate("/")
        })
        .catch((error) => {
            alert("Your password and username do not match.");
        })
    }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="">
                {
                    fields.map(field=>
                            <LoginInput
                                key={field.id}
                                handleChange={handleChange}
                                value={loginState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                        />
                    
                    )
                }
            
            <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
            >
                Login
            </button>
            </div>
      </form>
    )
}
