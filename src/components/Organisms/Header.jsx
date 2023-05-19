import styled from "styled-components";
import Logo from "../../images/Logo.png";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";

const StyledHeader = styled.header`
  background-color: #393b4e;
  height: 75px;
`;
const HeaderContent = styled.div`
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  .active{
    background-color: #35d100;
    color: #000;
  }
  > div {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    >div{
      height: 100%;
      display: flex;
      gap: 10px;
      align-items: center;
      >span{
        color: #fff;
        font-size: 1.1rem;
        display: inline-block;
        min-width: 100px;
      }
    }
    >button{
      cursor: pointer;
      border: none;
      background-color: transparent;
      font-size: 1.2rem;
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
    }
    >button:hover{
      background-color: #da0000;
    }
    .logo{
      height: 100%;
      margin-right: 20px;
    }
    > a.nav:hover {
      background-color: #2384fc;
    }
    > a {
      font-size: 1.2rem;
      padding: 5px 10px;
      border-radius: 5px;
      color: #fff;
      margin: 0;
      text-decoration: none;
      > img {
        height: 100%;
        object-fit: contain;
      }
    }
  }
  .avatar{
    height: 60%;
    border-radius: 50%;
  }
`;

const Header = () => {
  const { logedUser, setLogedUser } = useContext(UsersContext);

  return (
    <StyledHeader>
      <HeaderContent>
        <div>
          <Link className="logo" to="/">
            <img src={Logo} alt="Logo" />
          </Link>
          <NavLink className='nav' to="/">Home</NavLink>
        </div>
        <div>
          {logedUser ? (
            <>
              <div>
                <img className="avatar" src={logedUser.avatarImg} alt="Avatar" />
                <span>{logedUser.username}</span>
              </div>
              <button onClick={() => {setLogedUser(null)}}>Log Out</button>
            </>
          ) : (
            <>
              <NavLink className='nav' to='/login'>Log In</NavLink>
              <NavLink className='nav' to='/register'>Sign Up</NavLink>
            </>
          )}
        </div>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;
