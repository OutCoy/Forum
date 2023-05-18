import { useContext } from "react";
import styled from "styled-components";
import UsersContext from "../../contexts/UsersContext";

const StyledAskQuestion = styled.main`
  background-color: #0b0e0f;
  min-height: 100vh;
  color: #fff;
`;

const AskQuestion = () => {

  const { logedUser } = useContext(UsersContext);

  return (
    <StyledAskQuestion>
      <form>
        <div>
          <label htmlFor="title">Question Title</label>
          <input type="text" name="title" id="title" />
        </div>
        <div>
          <label htmlFor="question">Question</label>
          <input type="text" name="question" id="question" />
        </div>
      </form>
    </StyledAskQuestion>
  );
}
 
export default AskQuestion;