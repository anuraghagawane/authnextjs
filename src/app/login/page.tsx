'use client';
import Link from 'next/link'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user]);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);

            toast.success("Login success");

            router.push("/profile");
            
            
        } catch (error: any) {
            console.log("login failed", error.message);
            toast.error(error.message)
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col h-full justify-center items-center w-1/3'>
    <h1 className='text-3xl font-bold mb-4'>{loading ? "Processing" : "Login"}</h1>
    <hr className='w-full mb-4' />
    <label htmlFor='email' className='mb-2'>Email</label>
    <input type='email' id='email' value={user.email} onChange={(e)=> {setUser({...user, email: e.target.value})}} placeholder='Email' className='border border-gray-300 rounded-md px-3 py-2 mb-2 w-full focus:outline-none focus:border-blue-500'/>
    <label htmlFor='password' className='mb-2'>Password</label>
    <input type='password' id='password' value={user.password} onChange={(e)=> {setUser({...user, password: e.target.value})}} placeholder='Password' className='border border-gray-300 rounded-md px-3 py-2 mb-2 w-full focus:outline-none focus:border-blue-500'/>
    <button onClick={onLogin} className='bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>{buttonDisabled? "No Login": "Login"}</button>
    <Link href='signup' className='text-blue-500 mt-2'>Visit Signup page</Link>
</div>

    )
}