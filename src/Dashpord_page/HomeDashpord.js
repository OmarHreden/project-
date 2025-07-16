import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, BarChart,
  Bar, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaHotel , FaPlane , FaUserShield , FaUser  } from 'react-icons/fa';
export default function Hdash (){
    const [data, setData] = useState([]);
    useEffect(() => {
        const fakeData = [
            { month: "يناير", hotels: 1200, airlines: 90 },
            { month: "فبراير", hotels: 100, airlines: 110 },
            { month: "مارس", hotels: 140, airlines: 130 },
            { month: "مارشس", hotels: 140, airlines: 130 },
            { month: "ايلول", hotels: 140, airlines: 130 },
        ];
        setData(fakeData);
        }, []);
    return(
        <div className="HomeDash">
            <div className="topPart">
            <bottom className="t"><FaUser /> User (4554)</bottom>
            <bottom className="t"><FaUserShield /> Admin</bottom>
            <bottom className="t"><FaPlane /> Airline</bottom>
            <bottom className="t"><FaHotel /> Hotel</bottom>
            </div>
            <div className="downPart">
                <div className="dataAnalist"  style={{ width: '100%', height: '400px' }}>
                
                        
                        <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                            data={data}
                            barSize={30} 
                            // barCategoryGap={50} 
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            layout="horizontal"
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis 
                            // domain={[0, 200]} 
                            // ticks={[0, 50, 100, 150, 200]} 
                            // tickFormatter={(value) => `${value} `} 
                            // tickCount={5} 
                            />

                            <Tooltip />
                            <Legend />
                            <Bar dataKey="hotels" fill="blue" name="الفنادق"  style={{width:"20px"}}/>
                            <Bar dataKey="airlines" fill="red" name="الطيران" />
                        </BarChart>
                        </ResponsiveContainer>
                        
                </div>
                <div></div>
            </div>
        </div>
    );
}