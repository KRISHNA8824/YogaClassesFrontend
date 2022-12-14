import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/navbar.css';

import { useAuth } from '../hooks/useAuth';

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <div className='nav_bar'>
      <div className='nav_links'>
        {user ? (
          <>

            <Link to='/SelectSlot'>Select Slot</Link>
            <Link to='/'>Payment</Link>
            <button onClick={() => logout()}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <h1>Yoga Claases</h1>
            <Link to='/signUp'>SignUp</Link>
          </>
        )}
      </div>
    </div>
  );
}
