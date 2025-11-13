import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { useState } from 'react';


const Register = () => {

  const navigate = useNavigate()
 

     const [loding, setloding] = useState(false)

      const { register, handleSubmit, formState: { errors } } = useForm();

     const onsubmit = async (userdata)=>{
  try {
     setloding(true)
      const response  =  await axios.post("http://localhost:3000/api/v1/auth/register",userdata,{
        withCredentials : true
      })
       console.log("user register",response.data);
        navigate("/")  

  } catch (error) {
    console.log("register error",error);
    
  }
       setloding(false)

     }

      

  return (
    <div>
      
       <div className="flex  bg-gray-700 items-center  justify-center h-screen">
      <form
       onsubmit = {handleSubmit(onsubmit)}
      className=" px-8 py-5 bg-gray-600 sm:w-full lg:[40vw] md:w-[38vw] rounded-md " onSubmit={handleSubmit(onsubmit)}>
           <h1 className='text-center text-3xl font-semibold mt-5' >Register </h1>
         <div className='h-full  flex flex-col ' >
         
            

       <div className='flex flex-col gap-y-5' >

         <div className="pt-10">
          <h3 className="font-medium text-lg ">Enter Your username</h3>
          <input
            {...register("username", {
              required: "username is required",
              minLength: {
                value: 3,
                message: " minimum 6 character required",
              },
            })}
            placeholder="username"
            type="text"
            className="p-2 rounded-md  bg-[#eeeeee]  w-full"
          />
          {errors.username && (
            <p className="text-red-600 text-sm">{errors.username.message}</p>
          )}
        </div>

         <div className="">
          <h3 className="font-medium text-lg ">What's your email</h3>
          <input
            {...register("email", {
              required: "email is required",
              minLength: {
                value: 5,
                message: " minimum 5 character required",
              },
            })}
            placeholder="jhona@email.com"
            type="email"
            className="p-2 rounded-md  bg-[#eeeeee]  w-full"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="">
          <h3 className="font-medium text-lg ">Enter Password</h3>
          <input
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 6,
                message: " minimum 6 character required",
              },
            })}
            placeholder="password"
            type="password"
            className="p-2 rounded-md  bg-[#eeeeee]  w-full"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>
       </div>

        <div className='pt-8 pb-8' >
            <button 
             type='submit'
            className="bg-black cursor-pointer rounded text-white w-full py-2 active:scale-105 ">
        { loding? (
           
          <div className="flex justify-center items-center gap-2">
    <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
    Creating...
  </div>
      ) : ("Create account")}
        </button>

        <p className="text-center pt-2" >
          Already have an account ? <Link className="text-blue-500" to="/login">Login here</Link>
        </p>
        </div>
         </div>
      </form>
     
    </div>

    </div>
  )
}

export default Register