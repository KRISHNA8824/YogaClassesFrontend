import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth, AuthProvider } from './hooks/useAuth';
import './styles/app.css';
import Orders from './pages/SelectSlot';
import Dashboard from './pages/Payment';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import NavBar from './components/NavBar';

function PrivateRoute() {
  const { user } = useAuth();

  if (user != null) {
    return <Outlet />;
  } else {
    return <Navigate to='login' />;
  }
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path='/' index element={<Dashboard />} />
            <Route path='/SelectSlot' element={<Orders />} />
          </Route>
          <Route path='/login' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

// class App extends Component {
//   render() {
//     return (
//       <Router>
//         <Route
//           exact
//           path='/'
//           render={() => {
//             return (
//               <div style={sectionStyle}>
//                 <Navbar />
//                 <Dashboard />
//                 <div>
//                   <footer className='footer mt-auto py-4 bg-dark'>
//                     <div className='container'>
//                       <span className='text-muted text-right'>
//                         <h6>&#169;Copyright: TShirtDesign</h6>
//                       </span>
//                     </div>
//                   </footer>
//                 </div>
//               </div>
//             );
//           }}
//         />
//         <Route exact path='/cart' component={cart} />
//       </Router>
//     );
//   }
// }

// export default App;
