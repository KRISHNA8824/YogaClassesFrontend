import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

import API from '../api';

import '../styles/signin.css';
import Axios from 'axios';
//import uuid v4
import { v4 as uuid } from 'uuid';

export default function SignUpPage() {
  const [Name, setName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [UId, setUId] = useState('')
  const [Payment, setPayment] = useState('')
  const [Slot, setSlot] = useState('') //SlotSelectionStatus
  const [SlotSelectionStatus, setSlotSelectionStatus] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [flag, setFlag] = useState(false);

  const unique_id = uuid();
  const small_id = unique_id.slice(0,8)
  var User = function(UId, Name, Email, Password, Payment, Slot, SlotSelectionStatus){
    this.UId = UId;
    this.Name = Name;
    this.Email = Email;
    this.Password = Password;
    this.Payment = Payment;
    this.Slot = Slot;
    this.SlotSelectionStatus = SlotSelectionStatus;
  }

  useEffect(()=> {
    Axios.get("https://glorious-galoshes-newt.cyclic.app/api/get").then((response)=> {
      // console.log(response.data);
      setUserList(response.data);
      
    })
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(UId);
    try {
      setError(null);
      setLoading(true);
      // const res = await API.post('/auth/signup', { Name, Email, Password });
      {
        userList.map((val) => {
        // return <h1>Name: {val.Name}</h1>
        // console.log(val);
        if(val.Email==Email || val.UId==UId) {
          setFlag(true);
          console.log(flag);
          console.log(Email);
        }
      })}
      if(!flag){
        Axios.post("https://yogaclassesbackend-production.up.railway.app/api/insert", {
        UId : UId,
        Name: Name,
        Email: Email, 
        Password: Password,
        Payment: Payment,
        Slot: Slot,
        SlotSelectionStatus: SlotSelectionStatus
        }).then(()=>{
          // var cardOne = new Card('3', 'H');
          // alert("successful insert");
       });

      var UserDetails = new User(UId, Name, Email, Password, Payment, Slot, SlotSelectionStatus);

      // console.log('signUp ', res.data);
      login(UserDetails);
      setLoading(false);
      console.log(flag);
      }
      else {
        setLoading(false);
        setError("An account is already there with this emailId.");
        // setFlag(false);
      }
      
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message);
      console.log('signUp error', error);
    }
  };

  if (user) {
    navigate('/', { replace: true });
  }

  return (
    <div className='page_cont'>
      <div className='text-center m-5-auto'>
        <h2>Join us</h2>
        <h5>Create account to continue</h5>
        <p className='error'>{error ? error : null}</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <p>
            <label>Name</label>
            <br />
            <input
              onChange={(e) => setName(e.target.value)}
              type='text'
              name='Name'
              value={Name}
              required
            />
          </p>
          <p>
            <label>Email address</label>
            <br />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type='Email'
              name='Email'
              value={Email}
              required
            />
          </p>
          <p>
            <label>Password</label>
            <br />
            <input
              onChange={(e) => {setPassword(e.target.value); setUId(unique_id); setPayment("Not Paid"); setSlot("6-7 AM"); setSlotSelectionStatus(false);}}
              type='Password'
              name='Password'
              value={Password}
              required
            />
          </p>
          <p>
            <button id='sub_btn' type='submit' disabled={loading}>
              {loading ? 'wait...' : 'Register'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
