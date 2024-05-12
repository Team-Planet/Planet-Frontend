import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'

import { useDispatch, useSelector } from 'react-redux'
import { setUserInformation } from './features/user/userSlice'
import { signIn } from './services/userService';
import { useState } from 'react';
import { Alert } from '@mui/material';
import Notification from "./components/Notification"
import LoginPage from './pages/LoginPage';

function App() {
  const userInformation = useSelector(state => state.user.userInformation);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [notification, setNotification] = useState(null);

  const onButtonClick = async function (e) {
    const result = await signIn(email, password);
    
    if(result.message) {
      setNotification({message: result.message, duration: 5000, isSuccess: false});
    }
  }

  return (
    <>
      <LoginPage />
    </>
  )
}

export default App
