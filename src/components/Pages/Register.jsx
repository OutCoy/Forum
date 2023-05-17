import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import {v4 as uuid} from 'uuid';

const StyledRegister = styled.main`
  background-color: #0b0e0f;
  min-height: 100vh;
  color: #fff;
`;

const Register = () => {

  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const { users, setUsers, UsersActionTypes } = useContext(UsersContext);

  const validationSchema = Yup.object({
    username: Yup.string().min(4, 'Username has to be 4-20 symbols long.').max(20, 'Username has to be 4-20 symbols long.').required('Username is required'),
    password: Yup.string().min(8, 'Password has to be at least 8 symbols long.').max(30, 'Password can not be longer than 30 symbols.').required('Password is required.'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match.').required('Password confirmation is required.'),
    avatarImg: Yup.string().url('Avatar url has to be valid.')
  });

  const formik = useFormik({
    initialValues:{
      username: '',
      password: '',
      passwordConfirm: '',
      avatarImg: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const isAvailable = users.find(user => user.username === values.username);
      if(isAvailable){
        setIsUsernameTaken(true);
      } else {
        const newUser = {
          id: uuid(),
          username: values.username,
          password: values.password,
          avatarImg: values.avatarImg === "" ? "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" : values.avatarImg
        }
        setUsers({
          type: UsersActionTypes.add,
          data: newUser
        });
      }
    }
  });

  return (
    <StyledRegister>
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" onChange={e => {setIsUsernameTaken(false); formik.handleChange(e);}} onBlur={formik.handleBlur} value={formik.values.username}/>
            {
              formik.touched.username && formik.errors.username && <p>{formik.errors.username}</p>
            }
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
            {
              formik.touched.password && formik.errors.password && <p>{formik.errors.password}</p>
            }
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm password</label>
            <input type="password" name="passwordConfirm" id="passwordConfirm" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordConfirm}/>
            {
              formik.touched.passwordConfirm && formik.errors.passwordConfirm && <p>{formik.errors.passwordConfirm}</p>
            }
          </div>
          <div>
            <label htmlFor="avatarImg">Avatar URL</label>
            <input type="url" name="avatarImg" id="avatarImg" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.avatarImg}/>
            {
              formik.touched.avatarImg && formik.errors.avatarImg && <p>{formik.errors.avatarImg}</p>
            }
          </div>
          <input type="submit" value="Sign Up" />
          {
            isUsernameTaken && <p>This Username is already taken.</p>
          }
        </form>
      </div>
    </StyledRegister>
  );
};

export default Register;
