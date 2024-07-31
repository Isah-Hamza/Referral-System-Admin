import React from 'react'
import logo from '../assets/images/logo-white-variant.svg';
import mainImg from '../assets/images/auth-image.svg';

import seamless from '../assets/images/seamless-payout.png';
import guarantee from '../assets/images/guarantee.png';
import efficiency from '../assets/images/effective-management.png';
import { BsArrowUpRight } from 'react-icons/bs';

const AuthLayout = ({ children }) => {
  return (
    <div className='h-screen w-screen auth-container flex flex-col p-10 py-6'>
        <div className="flex justify-end">
            <img src={logo} alt="logo" />
        </div>
        <div className="flex-1">
            {children}
        </div>
        <div className="flex justify-end gap-10 text-sm">
            <button className="underline underline-offset-2 flex items-center gap-2 text-white">
                <span>Referrer Login</span>
                <span><BsArrowUpRight /></span>
            </button>
            <button className="underline underline-offset-2 flex items-center gap-2 text-white">
                <span>Main Website</span>
                <span><BsArrowUpRight /></span>
            </button>
        </div>
    </div>
  )
}

export default AuthLayout
