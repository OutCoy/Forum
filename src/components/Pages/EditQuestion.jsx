import styled from "styled-components";

const StyledEditQuestion = styled.main`
background-color: #0b0e0f;
min-height: 100vh;
color: #fff;
`;

const EditQuestion = () => {
  return (
    <StyledEditQuestion>
      <h1>Edit Question</h1>
      <form>
        <div>
          <label htmlFor="title">Question Title</label>
          <input type="text" id="title" name="title"/>
        </div>
        <div>
          <label htmlFor="question">Question</label>
          <textarea id="question" name="question"></textarea>
        </div>
      </form>
    </StyledEditQuestion>
  );
}
 
export default EditQuestion;