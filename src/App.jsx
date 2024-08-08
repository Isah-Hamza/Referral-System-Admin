import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword';
import VerifyOTP from './pages/Auth/VerifyOTP';
import ChangePassword from './pages/Auth/ChangePassword';
import Dashboard from './pages/Main/Dashboard';
import MainLayout from './layouts/MainLayout';
import Referrals from './pages/Main/Referrals';
import Appointments from './pages/Main/Appointments';
import Results from './pages/Main/Result';
import Tests from './pages/Main/Tests';
import Category from './pages/Main/Tests/Category';
import Referrers from './pages/Main/Referrers';
import Rebate from './pages/Main/Rebate'

function App() {
  const [count, setCount] = useState(0)

  const mainRoutes = [
    {
      path:'/dashboard',
      Component:Dashboard,
    },
    {
      path:'/referrals',
      Component:Referrals,
    },
    {
      path:'/appointments',
      Component:Appointments,
    },
    {
      path:'/results',
      Component:Results,
    },
    {
      path:'/tests',
      Component:Tests,
    },
    {
      path:'/tests/:id',
      Component:Category,
    },
    {
      path:'/referrers',
      Component:Referrers,
    },
    {
      path:'/rebates',
      Component:Rebate,
    },
  ]

  return ( 
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Login} />
        <Route path='/forgot-password' Component={ForgotPassword} />
        <Route path='/verify-otp' Component={VerifyOTP} />
        <Route path='/change-password' Component={ChangePassword} />
        <Route path='/' Component={MainLayout} >
          {
            mainRoutes.map((item,idx) => (
              <Route key={idx} path={item.path} Component={item.Component} />
              )
            )
          }
        </Route>
      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
