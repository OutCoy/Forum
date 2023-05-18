import styled from "styled-components";

const StyledAnswer = styled.div``;

const Answer = ({ data }) => {
  return (
    <StyledAnswer>
      <p>{data.answer}</p>
    </StyledAnswer>
  );
}
 
export default Answer;