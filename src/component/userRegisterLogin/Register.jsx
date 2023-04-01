import React, { useState } from "react";
import { registerUser } from "../Healper/apihit";
import Swal from "sweetalert2";
import Loader from "../common/Loader";
import { Validation } from "../Healper/helper";
import OptVerification from "../otp/OtpVerification";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [showOtpPage , setshowOtpPage] = useState(false)

  async function handerlProcess(values, e) {
    let valid = await Validation(values, e);
    console.log(valid)
    setErrors(valid);
    
    if (Object.keys(valid).length <= 0) {
      setShowLoader(() => true);
      registerUser(values).then((e) => {
        if (e.success === true && e.code === 1) {
          setTimeout(() => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `User is already registered with us`,
              showConfirmButton: false,
              timer: 3000,
            });
            setShowLoader(false);
          }, 2500);
        } else {
          setShowLoader(() => true);
          setTimeout(() => {
            Swal.fire({
              position: "mid",
              icon: "success",
              title: `Verification Otp has been sent to you email`,
              showConfirmButton: false,
              timer: 3000,
            });
            setShowLoader(false);
            setshowOtpPage(true)
          }, 2500);
        }
      });
    }
  }

  return (<>
   {showOtpPage ? <OptVerification/>:   <div className="container_register">
      <h1>Register</h1>
      <form>
        <input
          type="text"
          placeholder="Name"
          required
          value={formData.username}
          onChange={(event) => 
            setformData({
              ...formData,
              username: event.target.value,
            })
          }
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <input
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={(event) =>
            setformData({
              ...formData,
              email: event.target.value,
            })
          }
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(event) =>
            setformData({
              ...formData,
              password: event.target.value,
            })
          }
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        <button
          id="btn_submit"
          type="submit"
          onClick={(e) => {
            handerlProcess(formData, e);
          }}
        >
          Register
          {showLoader ? <Loader /> : ""}
        </button>

        <p>
          Already have an account? <Link  to="/login">Log in</Link>
        </p>
      </form>
    </div>}
    </>
  );
}
