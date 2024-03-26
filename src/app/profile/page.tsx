"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage(){
    const router = useRouter();
    const [data, setData] = useState("Nothing");
    const Logout = async () => {
        try {
           await axios.get("/api/users/logout"); 
           toast.success('Logout Successfully');
           router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
            
        }
    } 

    const getUserData = async () =>{
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data._id);       
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <h2>{data==="Nothing"? "Nothing": <Link className="bg-green-500 hover:bg-green-700 p-2 m-2 rounded" href= {`/profile/${data}`}>{data}</Link>}</h2>
            <hr/>
            <button onClick={Logout} className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            <button onClick={getUserData} className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Get User Data</button>
        </div>
    )
}