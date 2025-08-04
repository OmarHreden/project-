import axios from "axios";
import "../Style/AdmainReg.css";
import { useState, useRef } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function SingUp() {
  const [accept, setAccept] = useState(false);
  const [emailError2, setEmailerror] = useState();
  const [successMessage, setSuccessMessage] = useState("");

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordRRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmali] = useState("");
  const [password, setPassord] = useState("");
  const [passordR, setPassordR] = useState("");

  const token = window.localStorage.getItem("token");

  async function submit(e) {
    e.preventDefault();
    let flag = true;
    let emailError;

    if (name === "" || password.length < 8 || passordR !== password) {
      flag = false;
    } else {
      flag = true;
      emailError = 200;
    }

    setAccept(true);
    setSuccessMessage("");

    try {
      if (flag) {
        let res = await axios.post(
          "http://localhost:8080/super_admin/auth/admin-register",
          {
            fullName: name,
            email: email,
            password: password,
            latitude: "23232.3",
            longitude: "23232.23"
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            withCredentials: true
          }
        );

        if (res.status === 200) {
          setSuccessMessage("تمت الإضافة بنجاح");

          // تفريغ الحقول في الواجهة (DOM) مباشرة
          nameRef.current.value = "";
          emailRef.current.value = "";
          passwordRef.current.value = "";
          passwordRRef.current.value = "";

          // إعادة القيم الفعلية في useState لحالة فارغة
          setName("");
          setEmali("");
          setPassord("");
          setPassordR("");
          setAccept(false);
          setEmailerror(null);
        }
      }
    } catch (err) {
      emailError = err.response?.status;
      setEmailerror(emailError);
    }
  }

  return (
    <div className="parent">
      <div className="register">
        <caption>Create Admin</caption>
        <form onSubmit={submit}>
          <label htmlFor="name">Name :</label>
          <div className="input-icon-a">
            <FaUser className="icon-a" />
            <input
              id="name"
              type="text"
              placeholder="name..."
              required
              ref={nameRef}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <label htmlFor="email">Email :</label>
          <div className="input-icon-a">
            <FaEnvelope className="icon-a" />
            <input
              id="email"
              type="email"
              placeholder="email..."
              required
              ref={emailRef}
              onChange={(e) => setEmali(e.target.value)}
            />
          </div>
          {emailError2 === 422 && accept && (
            <p className="error">The email has already been taken</p>
          )}

          <label htmlFor="pass">Password:</label>
          <div className="input-icon-a">
            <FaLock className="icon-a" />
            <input
              id="pass"
              type="password"
              placeholder="password..."
              required
              ref={passwordRef}
              onChange={(e) => setPassord(e.target.value)}
            />
          </div>
          {password.length < 8 && accept && (
            <p className="error">Password must be more than 8 characters</p>
          )}

          <label htmlFor="R-pass">Repeat Password:</label>
          <div className="input-icon-a">
            <FaLock className="icon-a" />
            <input
              id="R-pass"
              type="password"
              placeholder="repeat password..."
              required
              ref={passwordRRef}
              onChange={(e) => setPassordR(e.target.value)}
            />
          </div>
          {password !== passordR && accept && (
            <p className="error">Passwords do not match</p>
          )}

          <div>
            <button type="submit">Create</button>
          </div>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
