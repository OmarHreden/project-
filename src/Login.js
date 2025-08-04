import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import axios from "axios";

export default function Login(){
     const [showPassword, setShowPassword] = useState(false);
     const [email, setEmali] = useState("");
     const [password, setPassord] = useState("");
     const [emailError, setEmailerror] = useState();
     const [accept, setAccept] = useState(false);
    
     console.log(email);
     console.log(password);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  async function submit(e) {
    let flag=true;
    let emailError;
    e.preventDefault();
    if( password.length<8){
       flag=false;
    }else {flag=true
        emailError=200;
    };
    setAccept(true);
    try{
    if(flag){
    let ser= await axios.post("http://localhost:8080/auth/login", { 
       
        email: email,
        password: password,
    
    })
   if(ser.status===200){
        // window.localStorage.setItem('email',email);
        window.localStorage.setItem('token', ser.data.token);
        
        if(ser.data.roleName==="super_admin"){

            window.location.pathname='/dish/home';
        }
        
    }
    }
    
}catch(err){
    console.log(err.response.status);
    setEmailerror(err.response.status);
    
}
}

    return(
        
        <div className="container ">
                <div className="left">
                    <div className="left-content">
                        <h2>Welcome SkyNest {<br></br>}Admin Dashboard</h2>
                    </div>
            </div>
            <div className="right">

                <form className="login-form" onSubmit={submit}>
                    <h1 className="h1-login">Login</h1>

                    <div className="input-wrapper">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <input type="email" placeholder="Email" required  value={email} onChange={(e)=>setEmali(e.target.value)}/>
                        { emailError===422&& accept &&<p className="p-error">The email has already been taken</p>}

                    </div>

                        <div className="input-wrapper">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e)=>setPassord(e.target.value)}
                        />
                        {password.length < 8 && accept && <p className="p-error" >password must be more 8 char  </p>}

                        <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="icon toggle-password"
                        onClick={togglePassword}
                        />
                    </div>

                       <Link className="link-verifi" to="/verifi"> forget password</Link>
                        <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}