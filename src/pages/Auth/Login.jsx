import React, { useEffect, useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { CiUser } from "react-icons/ci";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineLockPerson } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Button from '../../components/Button'; 
import Input from '../../components/Inputs';
import {Link, useNavigate} from 'react-router-dom'
import { useMutation } from 'react-query';
import Auth from '../../services/Auth.js';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoadingModal from '../../Loader/LoadingModal.jsx';
import {successToast, errorToast} from '../../utils/Helper'
import { axiosClient } from '../../api/axiosClient.js';

const Login = () => {

  const navigate = useNavigate();

  const { mutate, isLoading  } = useMutation(Auth.Login, {
    onSuccess: res => {
        successToast(res.data.message);
        axiosClient().defaults.headers["Authorization"] = "Bearer " + res.data.token;
        window.localStorage.setItem('referrer-admin-token',res.data.token);
        window.localStorage.setItem('referrer-admin-refresh-token',res.data.refreshToken);
        window.localStorage.setItem('referrer-admin-id',res.data.admin_id);
        window.localStorage.setItem('referrer-admin', JSON.stringify(res.data));
        
        // const data = {
        //   name:res.data.name,
        //   balance:res.data.balance,
        //   total_referrals:res.data.total_referrals,
        //   pending_referrals:res.data.pending_referrals,
        //   completed_referrals:res.data.completed_referrals,
        //   doctor_id:res.data.doctor_id,
        // }

        // window.localStorage.setItem('referrer-data',JSON.stringify(data));

        navigate('/dashboard');
    },
    onError: e => {
        errorToast(e.message);
    }
})

const { touched, errors, values, getFieldProps, handleSubmit } = useFormik({
  initialValues:{
    email:'',
    password:'',
  },
  validationSchema:Yup.object().shape({
    email:Yup.string().email().required(),
    password:Yup.string().required(),
  }),
  onSubmit:values => {

    mutate(values);
  }
});

  return (
    <AuthLayout>
      <div className="p-10 py-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl max-w-[400px] py-6">
              <div className='px-7 border-red-600 border-l-8' >
                  <h4 className='font-semibold text-xl' >Welcome back, Admin</h4>
                  <p className='text-sm text-text_color'>Manage referrers, earnings, bookings, and patient referrals efficientlly today.</p>
              </div>
              <div className="px-7">
                <div className="mt-10">
                    <Input {...getFieldProps('email')} label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
                </div>
                <div className="mt-5">
                    <Input {...getFieldProps('password')} label={'Create Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                    <Link to={'/forgot-password'} className='text-sm text-primary font-semibold' >forgot password</Link>
                </div>
                  <Button className={'opacity-90 mt-10'} type={'submit'} title='Log In' />

              </div>

        </form>
      </div>
      {
        isLoading ? <LoadingModal /> : null
      }
    </AuthLayout>
  )
}

export default Login
