import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";

const StyledLogin = styled.main`
  min-height: 100vh;
  background-color: #0b0e0f;
  color: #fff;
`;

const Login = () => {

  const [isUnsuccessful, setIsUnsuccessful] = useState(false);
  const { users } = useContext(UsersContext);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, "Username has to be 4-20 symbols long.")
      .max(20, "Username has to be 4-20 symbols long.")
      .required("Username is required"),
    password: Yup.string()
      .required("Password is required."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const loggedInUser = users.find(user => user.username === values.username && user.password === values.password);
      if(loggedInUser){
        console.log(loggedInUser);
      } else {
        setIsUnsuccessful(true);
      }
    },
  });

  return (
    <StyledLogin>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" onChange={e => {setIsUnsuccessful(false); formik.handleChange(e);}} onBlur={formik.handleBlur} value={formik.values.username}/>
            {
              formik.touched.username && formik.errors.username && <p>{formik.errors.username}</p>
            }
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={e => {setIsUnsuccessful(false); formik.handleChange(e);}} onBlur={formik.handleBlur} value={formik.values.password}/>
            {
              formik.touched.password && formik.errors.password && <p>{formik.errors.password}</p>
            }
          </div>
          <input type="submit" value="Log In" />
          {
            isUnsuccessful && <p>Invalid username or password.</p>
          }
        </form>
      </div>
    </StyledLogin>
  );
};

export default Login;
