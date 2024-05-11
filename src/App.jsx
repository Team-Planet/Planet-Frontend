import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInformation } from './features/user/userSlice'
import { signIn } from './services/userService';
import { useState } from 'react';
import { Alert } from '@mui/material';

function App() {
  const userInformation = useSelector(state => state.user.userInformation);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const onButtonClick = async function (e) {
    const result = await signIn(email, password);
    setValidationErrors(result.header.validationMessages);
  }

  return (
    <>
      <div>
        {validationErrors.map((val, index) =>
          <div key={index}>
            <Alert severity="error">{val.message}</Alert>
          </div>
        )}
      </div>
      <div>
        <label>Email : </label>
        <input onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password : </label>
        <input onChange={e => setPassword(e.target.value)} />
      </div>
      <button onClick={onButtonClick}>Sign In</button>
      {userInformation &&
        <div>
          <span>{userInformation.name}</span>
          <span>{userInformation.email}</span>
        </div>
      }
    </>
  )
}

export default App
