import styled from "styled-components";
import Logo from '../../images/Logo.png'
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import UsersContext from "../../contexts/UsersContext";

const StyledHeader = styled.header`
  background-color: #393b4e;
`;
const HeaderContent = styled.div``;

const Header = () => {

  const { logedUser } = useContext(UsersContext);

  return (
    <StyledHeader>
      <HeaderContent>
        <div>
          <img src={Logo} alt="Logo" />
          <NavLink to='/'>Home</NavLink>
        </div>
        <div>
          {
            logedUser ? <>
              <div>
              <img src={logedUser.avatarImg} alt="Avatar" />
              <span>{logedUser.username}</span>
              </div>
              <button>Log Out</button>
            </> : <>
              <button>Log In</button>
              <button>Sign Up</button>
            </>
          }
        </div>
      </HeaderContent>
    </StyledHeader>
  );
}
 
export default Header;