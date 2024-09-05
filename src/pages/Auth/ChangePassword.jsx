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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import Auth from '../../services/Auth';
import { errorToast, successToast } from '../../utils/Helper';
import LoadingModal from '../../Loader/LoadingModal';
import { FormikValidationError } from '../../components/Error/FormikValidationError';

const ChangePassword = () => {
const navigate = useNavigate();

const { errors, handleSubmit, touched, getFieldProps } = useFormik({
  initialValues:{
      admin_id:window.localStorage.getItem('referrer-admin-id'),
      password:'',
      password_confirmation:'',
  },
  validationSchema: Yup.object().shape({
      password: Yup.string().required().min(8),
      password_confirmation: Yup.string().required('This field is required').oneOf([Yup.ref('password')],'Passwords mismatch'),

  }),
  onSubmit:values => {
      mutate(values);
  }
})

const { mutate, isLoading  } = useMutation(Auth.ChangePassword, {
  onSuccess: res => {
      successToast(res.data.message);   
      // window.localStorage.setItem('referrer-user_id',res.data.user_id);

      navigate(`/`);
  },
  onError: e => { 
    errorToast(e.error);
  }
})

  return (

    <AuthLayout>
      <form onSubmit={handleSubmit} className="p-10 py-6">
          <div className="flex flex-col bg-white rounded-2xl max-w-[400px] min-h-[400px] py-6">
            <button className="flex items-center gap-1 mb-3 pl-7 text-sm" onClick={() => navigate(-1)}>
              <MdArrowBack />
              <span>Back</span>
            </button>
          <div className='px-7 border-red-600 border-l-8 py-3' >
              <h4 className='font-semibold text-xl' >Change Password</h4>
              <p className='text-sm text-text_color'>Enter your new password below to update your credentials.</p>
          </div>
          <div className="px-7 flex flex-col flex-1 ">
          <div className="mt-5">
               <Input {...getFieldProps('password')} label={'Create Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
               <p className='text-xs text-text_color' >Password must contain at least one lowercase letters, uppercase letters, numbers and special symbols</p>
               {
                    touched.password && errors.password && <FormikValidationError text={errors.password} />
                }
           </div>
             <div className="my-5 mb-10">
                 <Input {...getFieldProps('password_confirmation')} label={'Confirm Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                 {
                    touched.password_confirmation && errors.password_confirmation && <FormikValidationError text={errors.password_confirmation} />
                }
             </div>

              <Button type='submit' className={'opacity-90 mt-auto'} title='Update Password' />

          </div>
        </div>
      </form>
      {
        isLoading ? <LoadingModal /> : null
      }
    </AuthLayout>
  )
}

export default ChangePassword
