import React, { useEffect, useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { CiUser } from "react-icons/ci";
import { MdArrowBack, MdOutlineMarkEmailUnread } from "react-icons/md";

import Button from '../../components/Button'; 
import Input from '../../components/Inputs';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import { MdOutlineAccountTree } from "react-icons/md";
import { useMutation } from 'react-query';
import Auth from '../../services/Auth';
import { errorToast, successToast } from '../../utils/Helper';
import { axiosClient } from '../../api/axiosClient';
import LoadingModal from '../../Loader/LoadingModal';


const VerifyOTP = () => {
const navigate = useNavigate()
const [otp, setOtp] = useState('');

const search = useLocation().search;
const email = new URLSearchParams(search).get('email');

const { mutate, isLoading  } = useMutation(Auth.VerifyOTP, {
  onSuccess: res => {
      successToast(res.data.message);   
      axiosClient().defaults.headers["Authorization"] = "Bearer " + res.data.token;
      window.localStorage.setItem('referrer-admin-id',res.data.admin_id);
      window.localStorage.setItem('referrer-admin-token',res.data.token);

      navigate(`/change-password`);
  },
  onError: e => { 
    errorToast(e.error);
  }
})

useEffect(() => {

if(!email){
  navigate('/forgot-password', { replace:true })
}

}, [email])

  return (
    <AuthLayout>
      <div className="p-10 py-6">
        <div className="flex flex-col bg-white rounded-2xl max-w-[400px] min-h-[400px] py-6">
          <button className="flex items-center gap-1 mb-5 pl-7 text-sm" onClick={() => navigate(-1)}>
            <MdArrowBack />
            <span>Back</span>
          </button>
        <div className='px-7 border-red-600 border-l-8 py-3' >
            <h4 className='font-semibold text-xl' >Welcome back, Admin</h4>
            <p className='text-sm text-text_color'>A 6-digit code has been sent to your email address. Please enter the code below to proceed.</p>
        </div>
        <div className="px-7 flex flex-col flex-1 ">
          <div className="mt-10 mb-10">
            <Input value={otp} onChange={e => setOtp(e.target.value)} placeholder={'123-456'} title={'Enter OTP'}  icon={<MdOutlineAccountTree size={22} />}/>
          </div>
          {/* <div className="mt-5">
              <Input label={'Create Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
              <Link to={'/forgot-password'} className='text-sm text-primary font-semibold' >forgot password</Link>
          </div> */}
            <Button className={'opacity-90 mt-auto'} onClick={() => mutate({ email, otp:Number(otp) })} title='Verify OTP' />

        </div>
      </div>
    </div>
    {
      isLoading ? <LoadingModal /> : null
    }
  </AuthLayout>
  )
}

export default VerifyOTP
