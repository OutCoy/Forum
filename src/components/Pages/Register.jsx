import styled from "styled-components";

const StyledRegister = styled.main`
  background-color: #0b0e0f;
  min-height: 100vh;
  color: #fff;
`;

const Register = () => {
  return (
    <StyledRegister>
      <div>
        <h1>Sign Up</h1>
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm password</label>
            <input type="password" name="password" id="password" />
          </div>
          <div>
            <label htmlFor="avatarImg">Avatar URL:</label>
            <input type="url" name="avatarImg" id="avatarImg" />
          </div>
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </StyledRegister>
  );
};

export default Register;
