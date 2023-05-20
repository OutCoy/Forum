import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";

const StyledLogin = styled.main`
  min-height: calc(100vh - 75px);
  background-color: #0b0e0f;
  color: #fff;
  display: flex;
  align-items: center;
`;

const LoginContent = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  margin: 0 auto;
  form {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    padding-bottom: 75px;
    > div {
      width: 500px;
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      > input {
        width: 70%;
        min-width: 200px;
        background-color: #393b4e;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        color: #fff;
        font-size: 1rem;
      }
    }
    input[type="submit"] {
      padding: 5px 10px;
      background-color: #35d100;
      border: none;
      font-size: 1.1rem;
      border-radius: 5px;
      cursor: pointer;
    }
    input[type="submit"]:hover{
      background-color: #2384fc;
      color: #fff;
    }
  }
  p {
        margin: 0;
        color: red;
        font-size: 0.9rem;
        padding: 0;
      }
`;

const Login = () => {
  const navigate = useNavigate();
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);
  const { users, setLogedUser } = useContext(UsersContext);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, "Username has to be 4-20 symbols long.")
      .max(20, "Username has to be 4-20 symbols long.")
      .required("Username is required"),
    password: Yup.string().required("Password is required."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const loggedInUser = users.find(
        (user) =>
          user.username === values.username && user.password === values.password
      );
      if (loggedInUser) {
        setLogedUser(loggedInUser);
        navigate(-1);
      } else {
        setIsUnsuccessful(true);
      }
    },
  });

  return (
    <StyledLogin>
      <LoginContent>
        <h1>Log In</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => {
                setIsUnsuccessful(false);
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <p>{formik.errors.username}</p>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => {
                setIsUnsuccessful(false);
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p>{formik.errors.password}</p>
            )}
          </div>
          <input type="submit" value="Log In" />
          {isUnsuccessful && <p>Invalid username or password.</p>}
        </form>
      </LoginContent>
    </StyledLogin>
  );
};

export default Login;
