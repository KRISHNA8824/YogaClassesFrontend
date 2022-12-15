import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Payment.css';
// import API from '../api';
import { useAuth } from '../hooks/useAuth';
import Axios from 'axios';


export default function DashBoard() {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();
  // http://localhost:3001
  const updatePaymentStatus = (status)=> {
    Axios.put("https://glorious-galoshes-newt.cyclic.app/api/updatePaymentStatus", {
      UId: user.UId,
      PaymentStatus: status,
    });
    // console.log(status + "   " + user.UId);
  };
  


  var abc;
  var flag = true;
  function clickMe() {
    user.Payment = "Paid";
    login(user);
    updatePaymentStatus("Paid");
    // console.log(user.UId);

    navigate('/SelectSlot', { replace: true });
    alert("Payent Successful");
  }



  if(user.Payment === "Not Paid") {
    abc = <div>
    <h2>You have not made any payment for this month !</h2>
    <h2>Click below to make payment.</h2>
    <div className='aa'>
      <p>
        <button id='sub_btn' type='submit' disabled={loading} onClick={clickMe}>
          {loading ? 'wait...' : 'Make Payment'}
        </button>
      </p>
    </div>
    </div>;
  }
  else {
    abc = <div>
    <h2>Congratulations.... you have already made payment for this month.</h2>
    <h2>You can take your classes till end of this month.</h2>
    </div>;
  }

  return (
  <div className='page_cont'>
      <div className='text-center m-5-auto'>
        {abc}

      </div>
    </div>
  );
}
