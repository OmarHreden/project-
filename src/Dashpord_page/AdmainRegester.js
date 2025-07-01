import axios from "axios";
import "../Style/AdmainReg.css"
import { useState } from "react";

export default function SingUp() {

    const [name, setName] = useState("");
    const [email, setEmali] = useState("");
    const [password, setPassord] = useState("");
    const [passordR, setPassordR] = useState("");
    const [accept, setAccept] = useState(false);
    const [emailError2, setEmailerror] = useState();

  

   async function submit(e) {
        let flag=true;
        let emailError;
        e.preventDefault();
        if(name===""|| password<8||passordR !==password ||emailError===422){
           flag=false;
        }else {flag=true
            emailError=200;
        };
        setAccept(true);
        try{
        if(flag){
        let ser= await axios.post("http://localhost:8080/super_admin/auth/admin-register", { 
            fullName: name,
            email: email,
            password: password,
            // password_confirmation:passordR
            latitude:"lk",
            longitude:"kj"
        })
        if(ser.status===200){
            window.localStorage.setItem('email',email);
            window.location.pathname='/';
        }
        }
    }catch(err){
        emailError=(err.response.status)
        setEmailerror(emailError);
    }
    }
    
    
    // console.log(name);
    // console.log(password);
    // // console.log(flag);
    return (
      
        <div className="parent">
            <div className="register">
                <caption>Create Admian </caption>
                <form onSubmit={submit}>

                    <label htmlFor="name">Name :</label>
                    <input id="name" type="text" placeholder="name..." required value={name} onChange={(e) => setName(e.target.value)}></input>

                    <label htmlFor="eamil"> Email :</label>
                    <input id="email" type="email" placeholder="email..." required value={email} onChange={(e) => setEmali(e.target.value)}></input>
                    { emailError2===422 && accept &&<p className="error">The email has already been taken</p>}

                    <label htmlFor="pass"> Passord </label>
                    <input id="pass" type="password" placeholder="pass..." required value={password} onChange={(e) => setPassord(e.target.value)}></input>
                    {password.length < 8 && accept && <p className="error">password must be more 8 char  </p>}

                    <label htmlFor="R-pass"> R-passord </label>
                    <input id="R-pass" type="password" placeholder="r-pass..." required value={passordR} onChange={(e) => setPassordR(e.target.value)}></input>
                    {password !== passordR && accept && <p className="error">password not means  </p>}
                    <div>
                        <button type="submit"> Create </button>
                    </div>
                </form>
            </div>
        </div>

    );
}
