import React, { useState } from "react";
import './index.css';
import axios from "axios";

export default function ResetPassword () {

  const [step, setStep] = useState(1); // لتتبع المرحلة الحالية (1: تغيير كلمة السر، 2: إدخال رمز التحقق)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [accept, setAccept] = useState(false);

   const[num1,setN1]=useState("");
    const[num2,setN2]=useState("");
    const[num3,setN3]=useState("");
    const[num4,setN4]=useState("");

   //دالة الانتقال للحقل في الرمز 
    function moveToNext(e, nextInputId) {
      if (e.target.value.length === e.target.maxLength) {
        const nextInput = document.getElementById(nextInputId);
        if (nextInput) nextInput.focus();
      }
    }
    //دالة ارسال الرمز 
    async function  handleSubmit (e) {
      
      let flag=true;
      const code = num1 + num2 + num3 + num4;
      console.log(code);
      if(!num1||!num2||!num3||!num4){
        flag=false;
      }
     
      try {
        if(flag){
        // let response = await axios.post('https://your-api-endpoint.com/verify', {
          // code: code,
        // });
        // console.log('API Response:', response.data);
        setStep(3);
      }
      } catch (error) {
        console.error('API Error:', error);
      }
     
    };
  
    
  // إرسال البريد الإلكتروني
  async function sendEmail(e)  {
    if (!email) {
      setErrorMessage("pleasse enter email");
      return;
    }

    // try {
    //   let response = await axios.post("http://localhost:8000/api/send-verification-code", {
    //       email:email
          
        
    //   });

    //   if (!response.ok) {
    //     throw new Error("فشل في إرسال رمز التحقق");
    //   }

      setStep(2);
    // } catch (error) {
    //   setErrorMessage(error.message);
    // }
  };

  // إرسال طلب لتغيير كلمة المرور
  async function sendNewPassword () {
    if (!password || password !== confirmPassword) {
      setErrorMessage(" Password does not match");
      return;
    }
    if(password.length<8){
      setErrorMessage("password must be more 8 char ");
      return;
    }
    setAccept(true);
    // هنا يمكنك إرسال طلب API لتغيير كلمة المرور
    try {
      // let response = await axios.post("http://localhost:8000/api/change-password", {
      //   email:email,
      //   password:password,
      //   confirmPassword:confirmPassword
        
      // });

      // if (!response.ok) {
      //   throw new Error("فشل في تغيير كلمة المرور");
      // }

      alert("تم تغيير كلمة المرور بنجاح!");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>

      {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
      {step===1?
      <div className={`step ${step === 2 ? "active-step" : ""}`}>
            <div className="email-verifi">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
              <input
                    type="email"
                    placeholder="Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={sendEmail}>Send OTP Code </button>
            </div>
      </div>
      :<div></div>}

      {step===2?
      <div className={`step ${step === 2 ? "active-step" : ""}`}>
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
          </div>
      :<div></div>}
          
        {step===3?
        <div className={`step ${step === 2 ? "active-step" : ""}`}>
            <div className="rePassword-verifi">
                  <input
                  type="password"
                  placeholder="password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}                 
                <input
                  type="password"
                  placeholder="confirmPassword..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}          
                      <button onClick={sendNewPassword}>Change  Password</button>
            </div>
        </div>
          :<div></div>}

     
    </div>
  );
};


