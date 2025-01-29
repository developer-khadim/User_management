import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store/store'

// Components
import Layout from './Layout';
import ForgetPassword from './Components/Forgot_Pasword';
import GoogleTokenHandler from './Components/GoogleTokenHandler'
import ResetPassword from './Components/ResetPassword'

// Pages
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUP from './Pages/SignUP';


import About from './Pages/About ';
import Futures from './Pages/Futures'
import UserProtectWrapper from './Pages/UserProtectWrapper'
import AdminProtectWrapper from './Pages/AdminProtectWrapper'
import DashboardLayout from './Admin_Dashboard/DashboardLayout';
import DashboardLatoutUser from './User_Dashboard/DashboardLayout';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUP />} />
            <Route path='/reset_password' element={ <ResetPassword/> }/>
            <Route path="/google_token" element={<GoogleTokenHandler />} />
            <Route
              path="/User_dashboard"
              element={
                <UserProtectWrapper>
                  <DashboardLatoutUser />
                </UserProtectWrapper>
              }
            />
            <Route path="/Admin_dashboard" element={
              <AdminProtectWrapper>
                <DashboardLayout/>
              </AdminProtectWrapper>
            } />
            <Route path="/forgot_password" element={<ForgetPassword />} />
            <Route path="/futures" element={<Futures />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
