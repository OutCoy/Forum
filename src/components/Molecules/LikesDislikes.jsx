import styled from "styled-components";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useContext, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";
import AnswersContext from "../../contexts/AnswersContext";

const StyledLikesDislikes = styled.div`
.like{
  color: green;
}
.dislike{
  color: red;
}
>svg{
  cursor: pointer;
}`;

const LikesDislikes = ({ data }) => {
  const navigate = useNavigate();
  const { logedUser } = useContext(UsersContext);
  const [newData, setNewData] = useState(data);
  const { setAnswers, AnswersActionsType } = useContext(AnswersContext);

  const rate = (value) => {
    if (logedUser) {
      const ratingExists = newData.rating.find((el) => el.userId === logedUser.id);
      if (ratingExists) {
        if(ratingExists.value === 1 && value === 1 || ratingExists.value === -1 && value === -1){
          setNewData({...newData, rating:newData.rating.filter(el => el.userId !== logedUser.id)});
          setAnswers({
            type: AnswersActionsType.edit,
            id: newData.id,
            data: {...newData, rating:newData.rating.filter(el => el.userId !== logedUser.id)}
          });
        } else if(ratingExists.value === 1 && value === -1 || ratingExists.value === -1 && value === 1){
          setNewData({...newData, rating:newData.rating.map(el => {if(el.userId === logedUser.id){ return {userId:  logedUser.id, value: value}} else {return el}})});
          setAnswers({
            type: AnswersActionsType.edit,
            id: newData.id,
            data: {...newData, rating:newData.rating.map(el => {if(el.userId === logedUser.id){ return {userId:  logedUser.id, value: value}} else {return el}})}
          });
        }
      } else {
        const newRating = {
          userId: logedUser.id,
          value: value,
        };
        setNewData({...newData, rating: [...newData.rating, newRating]});
        setAnswers({
          type: AnswersActionsType.edit,
            id: newData.id,
            data: {...newData, rating: [...newData.rating, newRating]}
        });
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <StyledLikesDislikes>
      <AiFillLike className={newData.rating.find(el => el.userId === logedUser?.id)?.value === 1 && 'like' } onClick={() => rate(1)} />
      <h3>{newData.rating.reduce((acc, curr) => acc + curr.value, 0)}</h3>
      <AiFillDislike className={newData.rating.find(el => el.userId === logedUser?.id)?.value === -1 && 'dislike' } onClick={() => rate(-1)} />
    </StyledLikesDislikes>
  );
};

export default LikesDislikes;
