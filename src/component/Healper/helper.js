export const Validation = async (values, e) => {
  e.preventDefault();
  let error = {};
  /* eslint-disable no-useless-escape */
  const email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const password_pattern =
    /^(?=.*[0-9])(?=.*[!@#$_%^&*])[a-zA-Z0-9!@#_$%^&*]{6,16}$/;

  if (values.username === "") {
    error.name = "Name should not be empty";
  }
  if (values.email === "") {
    error.email = "Email should not be empty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email Didn't match";
  }
  if (values.password === "" && !password_pattern.test(values.password)) {
    error.password = "Password should not be empty";
  } else if (!password_pattern.test(values.password)) {
    console.log(values.password)
    error.password = "Password didn't match";
  }
  return error;
};
console.log("here")
