import { useEffect, useState } from "react";
import { useFetchers } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import{faTrash,faRotate,faEdit}  from '@fortawesome/free-solid-svg-icons';
export default function User(){
    const[users1,setUsers]=useState([]);
    const[run,setcont]=useState(0);

            useEffect(()=>{
                fetch("http://localhost:8000/api/user/show")
                .then((res) => res.json())
                .then((data) =>  setUsers(data))
            },[run]);
            
           async function delet(id){
                const res = await axios.delete
                (`http://localhost:8000/api/user/delete/${id}`);
                if(res.status===200){
                    setcont((prev)=>prev+1);
                }
            }
            const showusers=users1.map((e,index)=>(
            <tr key={index}>
                <td>{index+1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>
                <FontAwesomeIcon
                        icon={faTrash}
                        className="icontoggle-password"
                        onClick={()=>delet(e.id)}
                        />
                </td>
            </tr>));

            return(
                <table>
                <caption>User</caption>
                    <thead>
                        <tr>
                        <th>Id </th>
                        <th>Name </th>
                        <th>Email</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {showusers}
                    </tbody>
                </table>
            );
        }