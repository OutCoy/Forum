import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const UsersContext = createContext(null);

const UsersActionTypes = {
  get: 'get_all_users',
  add: 'add_new_user'
}

const reducer = (state, action) => {
  switch(action.type){
    case UsersActionTypes.get:
      return action.data;
    case UsersActionTypes.add:
      fetch('http://localhost:8080/users', {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];
    default:
      return state;
  }
}

const UsersProvider = ({children}) => {

  const [users, setUsers] = useReducer(reducer, []);

  useEffect(() => {
    fetch('http://localhost:8080/users').then(res => res.json()).then(data => {
      setUsers({
        type: UsersActionTypes.get,
        data: data
      });
    });
  }, []);

  console.log(users);

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        UsersActionTypes
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
 
export {UsersProvider};
export default UsersContext;