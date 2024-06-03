import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import Notification from "./components/Notification";
import BoardPage from "./pages/BoardPage";
import AuthProvider from "./contexts/AuthContext";
import SignalRProvider from "./contexts/SignalRContext";

function App() {
  return (
    <AuthProvider>
      <SignalRProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Boards/:id" element={<BoardPage />} />
        </Routes>
        {<Notification />}
      </SignalRProvider>
    </AuthProvider>
  );
}

export default App;
