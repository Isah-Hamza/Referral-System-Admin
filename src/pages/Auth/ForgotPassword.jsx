import React, { useEffect, useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { CiUser } from "react-icons/ci";
import { MdArrowBack, MdOutlineMarkEmailUnread } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Button from '../../components/Button'; 
import Input from '../../components/Inputs';
import {Link, useNavigate} from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";
import { useMutation } from 'react-query';
import Auth from '../../services/Auth';
import { axiosClient } from '../../api/axiosClient';
import {successToast, errorToast} from '../../utils/Helper'
import LoadingModal from '../../Loader/LoadingModal';

const ForgotPassword = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('');

  const { mutate, isLoading  } = useMutation(Auth.ForgotPassword, {
    onSuccess: res => {
        successToast(res.data.message);        
        axiosClient().defaults.headers["Authorization"] = "Bearer " + res.data.token;
        window.localStorage.setItem('referrer-admin-token',res.data.token);
        window.localStorage.setItem('referrer-admin-id',res.data.admin_id);

        navigate(`/verify-otp?email=${email}`);
    },
    onError: e => { 
      errorToast(e.message);
    }
})

const submit = (e) => {
  e.preventDefault();
  mutate({email});
}

  return (
    <AuthLayout>
    <div className="p-10 py-6">
      <form onSubmit={submit} className="flex flex-col bg-white rounded-2xl max-w-[400px] min-h-[400px] py-6">
            <button type='button' className="flex items-center gap-1 mb-3 pl-7 text-sm" onClick={() => navigate('/')}>
              <MdArrowBack />
              <span>Back</span>
            </button>
            <div className='px-7 border-red-600 border-l-8 py-3' >
                <h4 className='font-semibold text-xl' >Welcome back, Admin</h4>
                <p className='text-sm text-text_color'>You need to set a new password to continue. Please enter your email below to proceed.</p>
            </div>
            <div className="px-7 flex flex-col flex-1 ">
              <div className="mt-10 mb-10">
                  <Input value={email} onChange={e => setEmail(e.target.value)} label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
              </div>
              {/* <div className="mt-5">
                  <Input label={'Create Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                  <Link to={'/forgot-password'} className='text-sm text-primary font-semibold' >forgot password</Link>
              </div> */}
                <Button type='submit' disabled={!email} className={'opacity-90 mt-auto'} title='Request OTP' />

            </div>

      </form>
    </div>
    {
      isLoading ? <LoadingModal /> : null
    }
  </AuthLayout>
  )
}

export default ForgotPassword
