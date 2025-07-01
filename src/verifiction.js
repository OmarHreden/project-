import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import v2 from "./Vierfi";
// import {handleChangePassword} from "./Vierfi";

export default function Verifi(){
  const[num1,setN1]=useState("");
  const[num2,setN2]=useState("");
  const[num3,setN3]=useState("");
  const[num4,setN4]=useState("");
 

  console.log(num1);
  console.log(num2);
  console.log(num4);
  function moveToNext(e, nextInputId) {
    if (e.target.value.length === e.target.maxLength) {
      const nextInput = document.getElementById(nextInputId);
      if (nextInput) nextInput.focus();
    }
  }
  

  async function  handleSubmit (e) {
    e.preventDefault();
    let flag=true;
    const code = num1 + num2 + num3 + num4;
    console.log(code);
    if(!num1||!num2||!num3||!num4){
      flag=false;
    }
   
    try {
    //   if(flag){
    //   let response = await axios.post('https://your-api-endpoint.com/verify', {
    //     code: code,
    //   });
    //   console.log('API Response:', response.data);
    // }
    } catch (error) {
      console.error('API Error:', error);
    }
  };
 {/* {step === 1 ? (
        <div>
      <p>{step === 1 ? "أدخل بريدك الإلكتروني لإرسال رمز التحقق." : "أدخل رمز التحقق وكلمة المرور الجديدة."}</p>
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendVerificationCode}>إرسال رمز التحقق</button>
        </div>
      ) : (
       
        <div>
        {step===2?  <VerifiOtp></VerifiOtp>:""
     
            }
          {step===3? <div>
            <input
            type="password"
            placeholder="كلمة المرور الجديدة"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        
          <input
            type="password"
            placeholder="تأكيد كلمة المرور"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleChangePassword}>تغيير كلمة المرور</button>
          </div>: ""}
         
        </div>
      )} */}
  return(
        // <div className="parent-verifi">
        <div className="container-verifi">
    <div className="icon-circle">
      
      <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h2>Enter OTP Code</h2>
    <div className="otp-inputs">
      <input type="text" maxlength="1" id="input1"  required value={num1}  onChange={(e)=>{setN1(e.target.value) ; moveToNext(e, "input2");}}/>
      <input type="text" maxlength="1" id="input2"  required value={num2}  onChange={(e)=>{setN2(e.target.value) ; moveToNext(e, "input3");}}/>
      <input type="text" maxlength="1" id="input3" required value={num3}  onChange={(e)=>{setN3(e.target.value) ; moveToNext(e, "input4");}}/>
      <input type="text" maxlength="1" id="input4" required value={num4}  onChange={(e)=>setN4(e.target.value)} />
    </div>
    <button onClick={() => {
  handleSubmit();
  
}}>Verify OTP</button>
  </div>
  // </div>
    );
}