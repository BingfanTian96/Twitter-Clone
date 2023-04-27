import { useState } from 'react';
import { signupFields } from "../constants/formFields.js"
import LoginInput from "./loginInput.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from 'react';


const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const navigate = useNavigate();
  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount=()=>{
    axios.post('/api/users/signup',  {
            username: signupState["username"],
            password: signupState["password"],
            email: signupState["email-address"],
            name: signupState["name"],
            img: signupState["img"]
        }, { withCredentials: true })
        .then((response) => {
            navigate("/")
        })
        .catch((error) => {
            alert("Your username or email has been registered.");
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
                                value={signupState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                                autoComplete={field.autoComplete}
                        />
                    
                    )
                }
            
            <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-10"
            >
            Signup
            </button>
            </div>
        </form>
    )
}