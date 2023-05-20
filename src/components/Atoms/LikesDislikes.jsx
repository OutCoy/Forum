import styled from "styled-components";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import UsersContext from "../../contexts/UsersContext";
import { useNavigate } from "react-router-dom";

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

const LikesDislikes = ({ data, setMethod, setActionType }) => {
  const navigate = useNavigate();
  const { logedUser } = useContext(UsersContext);

  const rate = (value) => {
    if (logedUser) {
      const ratingExists = data.rating.find((el) => el.userId === logedUser.id);
      if (ratingExists) {
        if((ratingExists.value === 1 && value === 1) || (ratingExists.value === -1 && value === -1)){
          setMethod({
            type: setActionType.edit,
            id: data.id,
            data: {...data, rating:data.rating.filter(el => el.userId !== logedUser.id)}
          });
        } else if((ratingExists.value === 1 && value === -1) || (ratingExists.value === -1 && value === 1)){
          setMethod({
            type: setActionType.edit,
            id: data.id,
            data: {...data, rating:data.rating.map(el => {if(el.userId === logedUser.id){ return {userId:  logedUser.id, value: value}} else {return el}})}
          });
        }
      } else {
        const newRating = {
          userId: logedUser.id,
          value: value,
        };
        setMethod({
          type: setActionType.edit,
            id: data.id,
            data: {...data, rating: [...data.rating, newRating]}
        });
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <StyledLikesDislikes>
      <AiFillLike size={20} className={data.rating.find(el => el.userId === logedUser?.id)?.value === 1 && 'like' } onClick={() => rate(1)} />
      <h3>{data.rating.reduce((acc, curr) => acc + curr.value, 0)}</h3>
      <AiFillDislike size={20} className={data.rating.find(el => el.userId === logedUser?.id)?.value === -1 && 'dislike' } onClick={() => rate(-1)} />
    </StyledLikesDislikes>
  );
};

export default LikesDislikes;
