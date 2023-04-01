import { React, useState } from "react";
import { loginUser } from "../Healper/apihit";
import Swal from "sweetalert2";
import Loader from "../common/Loader";
import { Validation } from "../Healper/helper";
export default function Login() {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  async function handerlProcess(values, e) {
    let valid = await Validation(values, e);
    setErrors(valid);
    if (Object.keys(valid).length <= 0) {
      setShowLoader(() => true);
      loginUser(values).then((e) => {
        if (e.success === true) {
          setTimeout(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Login Successfull`,
              showConfirmButton: false,
              timer: 3000,
            });
            setShowLoader(false);
          }, 2500);
        }
      });
    }
  }

  return (
    <div className="login-container">
      <h1>Sign-In</h1>
      <form>
        <label htmlFor="email">Email or mobile phone number</label>

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
        <label htmlFor="password">Password</label>
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
        <button type="submit" onClick={(e) => handerlProcess(formData, e)}>
          Sign-In
          {showLoader ? <Loader /> : ""}
        </button>
        <div className="remember-forgot">
          <input type="checkbox" id="remember" name="remember" />
          <label htmlFor="remember">Keep me signed in</label>
          <a href="/">Forgot your password?</a>
        </div>
      </form>
    </div>
  );
}
