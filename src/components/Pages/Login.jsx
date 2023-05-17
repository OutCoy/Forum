import styled from "styled-components";

const StyledLogin = styled.main`
  min-height: 100vh;
  background-color: #0b0e0f;
  color: #fff;
`;

const Login = () => {
  return (
    <StyledLogin>
      <div>
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
          <input type="submit" value="Log In"/>
        </form>
      </div>
    </StyledLogin>
  );
};

export default Login;
