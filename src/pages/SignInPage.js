import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';

import API from '../api';
import { useAuth } from '../hooks/useAuth';

import '../styles/signin.css'; 
import Axios from 'axios';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  // const [book, setBook] = useLocalStorage('book', null);

  useEffect(()=> {
    Axios.get("http://localhost:3001/api/get").then((response)=> {
      // console.log(response.data);
      setUserList(response.data);
      
    })
  }, []);

  var User = function(UId, Name, Email, Password, Payment, Slot, SlotSelectionStatus){
    this.UId = UId;
    this.Name = Name;
    this.Email = Email;
    this.Password = Password;
    this.Payment = Payment;
    this.Slot = Slot;
    this.SlotSelectionStatus = SlotSelectionStatus;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setError(null);
      setLoading(true);
      
      // console.log("check 11");
      // // const res = await API.post('/auth/login', { email, password });
      // console.log("check 2");

      {
        userList.map((val) => {
        // return <h1>Name: {val.Name}</h1>
        // console.log(val);
        if(val.Email==email && val.Password==password) {
          setLoading(false);
          // console.log(val);
          // login(res.data);
          var UserDetails = new User(val.UId, val.Name, val.Email, val.Password, val.Payment, val.Slot, val.SlotSelectionStatus);
          login(UserDetails, email, password);
        }
      })}
      setLoading(false);
      setError("wrong email or paasword !");
      console.log('login error', error);
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
      console.log('login error', error);
    }
  };

  if (user) {
    navigate('/', { replace: true });
  }

  return (
    <div className='page_cont'>
      <div className='text-center m-5-auto'>
        <h2>Welcome back!</h2>
        <h5>Sign In to Continue</h5>
        <p className='error'>{error ? error : null}</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <p>
            <label>Email address</label>
            <br />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              name='email'
              value={email}
              required
            />
          </p>
          <p>
            <label>Password</label>
            <br />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              name='password'
              value={password}
              required
            />
          </p>
          <p>
            <button id='sub_btn' type='submit' disabled={loading}>
              {loading ? 'wait...' : 'Login'}
            </button>
          </p>
        </form>
        <footer>
          <p>
            First time? <Link to='/signup'>Create an account</Link>.
          </p>
        </footer>

      
      </div>
    </div>
  );
}
