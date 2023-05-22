import styled from "styled-components";
import {
  AiFillFacebook,
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";

const StyledFooter = styled.footer`
  background-color: #393b4e;
  height: 120px;
`;

const FooterContent = styled.div`
  width: 1000px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  align-items: center;
  >ul{
    display: flex;
    list-style: none;
    margin: 0;
    gap: 20px;
    >li>a>svg{
      color: #35d100;
    }
    >li>a>svg:hover{
      color: #2384fc;
    }
  }
  >p{
    margin: 0;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <ul>
          <li>
            <a href="http://www.facebook.com" rel="noreferrer" target="_blank">
              <AiFillFacebook size={35}/>
            </a>
          </li>
          <li>
            <a href="http://www.youtube.com" rel="noreferrer" target="_blank">
              <AiFillYoutube size={35}/>
            </a>
          </li>
          <li>
            <a href="http://www.twitter.com" rel="noreferrer" target="_blank">
              <AiOutlineTwitter size={35}/>
            </a>
          </li>
          <li>
            <a href="http://www.instagram.com" rel="noreferrer" target="_blank">
              <AiFillInstagram size={35}/>
            </a>
          </li>
        </ul>
        <p>All Rights Rserved by FORUM, 2023</p>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer;
