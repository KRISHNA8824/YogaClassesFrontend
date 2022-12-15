import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/SelectSlot.css';

// import API from '../api';
import { useAuth } from '../hooks/useAuth';
import Axios from 'axios';

export default function Orders() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [value, setValue] = React.useState('6-7 AM');
  const { user, login } = useAuth();


  const updateSlot = (Slot)=> {
    Axios.put("https://glorious-galoshes-newt.cyclic.app/api/updateSlot", {
      UId: user.UId,
      Slot: Slot,
    });
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  function clickMe() {
    user.Slot = value;
    user.SlotSelectionStatus = true;
    login(user);
    updateSlot(value);

    navigate('/', { replace: true });
    alert("You selected" + " " +value + " slot");
  }

  return (
    <div className='page_cont'>
      <div className='text-center m-5-auto'>
        {
          !(user.SlotSelectionStatus) ? <div> <h2> Choose time slot for this month. </h2>
          <select value={value} onChange={handleChange}>
            <option value="6-7 AM">6-7 AM</option>
            <option value="7-8 AM">7-8 AM</option>
            <option value="8-9 AM">8-9 AM</option>
            <option value="5-6 PM">5-6 PM</option>
          </select>
          <div className='aa'>
             <p>
            <button id='sub_btn' type='submit' disabled={loading}  onClick={clickMe}>
              {loading ? 'wait...' : 'SELECT'}
            </button>
            </p>
          </div>
          </div> : 
          <div>
          <h2>You have already selected slot for yoga classes.</h2>
          </div>
        }
      </div>
    </div>
  );
}
