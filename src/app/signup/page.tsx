'use client';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(user.email.length>0 && user.username.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user]);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("SignUp Success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup Failed", error.message);
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col h-full justify-center items-center w-1/3'>
    <h1 className='text-3xl font-bold mb-4'>{loading ? "Processing" : "Sign Up"}</h1>
    <hr className='w-full mb-4' />
    <label htmlFor='username' className='mb-2'>Username</label>
    <input type='text' id='username' value={user.username} onChange={(e)=> {setUser({...user, username: e.target.value})}} placeholder='Username' className='border border-gray-300 rounded-md px-3 py-2 mb-2 w-full focus:outline-none focus:border-blue-500'/>
    <label htmlFor='email' className='mb-2'>Email</label>
    <input type='email' id='email' value={user.email} onChange={(e)=> {setUser({...user, email: e.target.value})}} placeholder='Email' className='border border-gray-300 rounded-md px-3 py-2 mb-2 w-full focus:outline-none focus:border-blue-500'/>
    <label htmlFor='password' className='mb-2'>Password</label>
    <input type='password' id='password' value={user.password} onChange={(e)=> {setUser({...user, password: e.target.value})}} placeholder='Password' className='border border-gray-300 rounded-md px-3 py-2 mb-2 w-full focus:outline-none focus:border-blue-500'/>
    <button onClick={onSignup} className='bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>{buttonDisabled? "No Signup": "Signup"}</button>
    <Link href='login' className='text-blue-500 mt-2'>Visit login page</Link>
</div>

    )
}