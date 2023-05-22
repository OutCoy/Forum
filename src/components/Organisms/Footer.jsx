import styled from "styled-components";
import {
  AiFillFacebook,
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";

const StyledFooter = styled.footer`

`;

const FooterContent = styled.div`

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
