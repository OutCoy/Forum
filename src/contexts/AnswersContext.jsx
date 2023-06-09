import { createContext, useEffect, useReducer } from "react";

  const AnswersContext = createContext(null);

  const AnswersActionsType = {
    get: 'get_all_answers',
    add: 'add_new_answer',
    edit: 'edit_answer',
    delete: 'delete_answer'
  }

  const reducer = (state, action) => {
    switch(action.type){
      case AnswersActionsType.get:
        return action.data;
      case AnswersActionsType.add:
        fetch('http://localhost:8080/answers', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(action.data)
        });
        return [...state, action.data];
      case AnswersActionsType.edit:
        fetch(`http://localhost:8080/answers/${action.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(action.data)
        });
        return state.map(el => {
          if(el.id === action.id){
            return action.data;
          } else {
            return el;
          }
        });
      case AnswersActionsType.delete:
        return state.filter(el => el.id !== action.id);
      default:
        return state;
    }
  }

const AnswersProvider = ({children}) => {

  const [answers, setAnswers] = useReducer(reducer, []);

  useEffect(() => {
    fetch('http://localhost:8080/answers').then(res => res.json()).then(data => {
      setAnswers({
        type: AnswersActionsType.get,
        data: data
      });
    });
  }, []);

  return (
    <AnswersContext.Provider
      value={{
        answers,
        setAnswers,
        AnswersActionsType
      }}
    >
      {children}
    </AnswersContext.Provider>
  );
}
 
export {AnswersProvider};
export default AnswersContext;