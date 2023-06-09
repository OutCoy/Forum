import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Pages/Home";
import QuestionPage from "./components/Pages/QuestionPage";
import Login from "./components/Pages/Login";
import AskQuestion from "./components/Pages/AskQuestion";
import EditQuestion from "./components/Pages/EditQuestion";
import Header from "./components/Organisms/Header";
import Register from "./components/Pages/Register";
import { useContext } from "react";
import UsersContext from "./contexts/UsersContext";
import Footer from "./components/Organisms/Footer";
import NotFoundPage from "./components/Pages/NotFoundPage";

const App = () => {
  const { logedUser } = useContext(UsersContext);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/askQuestion"
          element={
            logedUser ? <AskQuestion /> : <Navigate replace to={"/login"} />
          }
        />
        <Route
          path="/editQuestion/:id"
          element={
            logedUser ? <EditQuestion /> : <Navigate replace to={"/login"} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/question/:id" element={<QuestionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
