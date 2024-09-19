import React, { useState } from 'react'
import BarChart from '../../../components/Chart/BarChart'
import { BsArrowUpRight } from 'react-icons/bs'
import { FiEye } from 'react-icons/fi'

import avatar from '../../../assets/images/avatar.svg';
import admin from '../../../assets/images/admin.png';
import bank from '../../../assets/images/Bank.svg';
import test from '../../../assets/images/Test.svg';
import earn from '../../../assets/images/Earn.svg';
import stacey from '../../../assets/images/stacey.svg';
import Button from '../../../components/Button'
import Select from '../../../components/Inputs/Select';
import Input from '../../../components/Inputs';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Rebate = () => {

    const navigate = useNavigate();

    const [openRequest, setOpenRequest] = useState(false);
    const [schedule, setSchedule] = useState(false);
    const [viewPayment, setViewPayment] = useState(false);

    const toggleOpenRequest = () => setOpenRequest(!openRequest);
    const toggleSchedule = () => setSchedule(!schedule);
    const toggleViewPayment = () => setViewPayment(!viewPayment);

    const dummyDetails = [
        {
            date:'09/10/2024',
            refer:'Stanley Stacey',
            test:3,
            status:'paid',
            amount:'₦80,000',
        },
        {
            date:'12/01/2023',
            refer:'Stanley Stacey',
            test:3,
            status:'paid',
            amount:'₦28,000',
        },
        {
            date:'09/10/2024',
            refer:'Hilda Bacci',
            test:3,
            status:'pending',
            amount:'₦44,000',
        },
        {
            date:'12/01/2023',
            refer:'Emunne Ijeoma',
            test:3,
            status:'pending',
            amount:'₦26,500',
        },
    ]

    const transactions = [
        {
            title:'You have referred Benjamin Wales ',
            desc:'Benjamin Whales Have initiated a payout of ₦23,000.',
            time:'5m ago',
            img:avatar,
        },
        {
            title:'You have referred Benjamin Wales ',
            desc:'You assigned 2 tests. Waiting for your rebate.',
            time:'5m ago',
            img:test,
        },
        {
            title:'You have earned your rebate from Benjamin Wales ',
            desc:'Hurray, ₦23,000 has been added to your wallet.',
            time:'2d ago',
            img:earn,
        },
        {
            title:'You have referred Samuel Sandra ',
            desc:'You assigned 2 tests. Waiting for your rebate.',
            time:'1m ago',
            img:test,
        },
        {
            title:'You have earned your rebate from Benjamin Wales ',
            desc:'Hurray, ₦23,000 has been added to your wallet.',
            time:'2d ago',
            img:earn,
        },
        {
            title:'You have initiated a withdrawal request.',
            desc:'₦350,000 will be credited into your bank account soon.',
            time:'2d ago',
            img:bank,
        },
        {
            title:'You have referred Benjamin Wales ',
            desc:'Benjamin Whales Have initiated a payout of ₦23,000.',
            time:'5m ago',
            img:admin,
        },
        {
            title:'You have earned your rebate from Temites Flyn ',
            desc:'Hurray, ₦23,000 has been added to your wallet.',
            time:'12d ago',
            img:earn,
        },
    ]

    const dummy = [
        {
            name:'Marcia Cronin ',
            email:'gerald37@hotmail.com',
            phone:'02-05-2024 11:00AM',
            gender:'Female',
            test:'Withdrawal Request',
            rebate:'₦121,000',
            status:1,
        },
        {
            name:'Luke Hudsonlee Jack',
            email:'earnestine_macejkovic89@yahoo.com',
            phone:'02-05-2024 11:00AM',
            gender:'Male',
            test:'Weekly Payout',
            rebate:'₦103,000',
            status:1,

        },
        {
            name:'Anthony Von',
            email:'emily.rolfson@hotmail.com',
            phone:'02-05-2024 11:00AM',
            gender:'Male',
            test:'Withdrawal Request',
            rebate:'₦34,500',
            status:3,
        },
        {
            name:'Stacey Jacobs Volkswagon',
            email:'mohammad.schimmel@gmail.com',
            phone:'02-05-2024 11:00AM',
            gender:'Female',
            test:'Weekly Payout',
            rebate:'₦21,000',
            status:3,
        },
        {
            name:'Luke Hudson',
            email:'earnestine_macejkovic89@yahoo.com',
            phone:'02-05-2024 11:00AM',
            gender:'Male',
            test:'Withdrawal Request',
            rebate:'₦55,500',
            status:2,
        },
        {
            name:'Anthony Von',
            email:'emily.rolfson@hotmail.com',
            phone:'02-05-2024 11:00AM',
            gender:'Male',
            test:'Weekly Payout',
            rebate:'₦600,000',
            status:1,
        },
        {
            name:'Stacey Jacobs Paramount',
            email:'mohammad.schimmel@gmail.com',
            phone:'02-05-2024 11:00AM',
            gender:'Female',
            test:'Withdrawal Request',
            rebate:'₦21,000',
            status:2,
        },
        {
            name:'Stacey Jacobs Volkswagon',
            email:'mohammad.schimmel@gmail.com',
            phone:'02-05-2024 11:00AM',
            gender:'Female',
            test:'Weekly Payout',
            rebate:'₦21,000',
            status:2
        },
        {
            name:'Luke Hudson',
            email:'earnestine_macejkovic89@yahoo.com',
            phone:'02-05-2024 11:00AM',
            gender:'Male',
            test:'Withdrawal Request',
            rebate:'₦55,500',
            status:1,
        },
        {
            name:'Anthony Von',
            email:'emily.rolfson@hotmail.com',
            phone:'02-05-2024 11:00AM',
            gender:'Male',
            test:'Weekly Payout',
            rebate:'₦600,000',
            status:1,
        },
    ]

  return (
    <>
        {
        !viewPayment ?
            <div className='mt-3 border overflow-hidden bg-white border-custom_gray h-[calc(100vh-145px)] rounded-xl flex'>
        <div className="w-7/12 border-r border-custom_gray rounded-lg overflow-y-scroll">
            <div className="flex-1 border-b border-custom_gray bg-white">
                <div className="flex items-center justify-between p-3 border-b">
                    <p className='font-semibold' >Rebate Earning</p>
                    <div className="flex items-center bg-custom_gray p-1 px-1.5 rounded-3xl">
                        {
                            ['Yearly','6 Months','Monthly','Weekly','Daily'].map((item,idx) => (
                                <button key={idx} className={`rounded-3xl text-xs px-2  py-1.5 ${idx ==0 && 'shadow bg-white'}`} >{item}</button>
                            ))
                        }
                    </div>
                </div>
                <div className="p-5">
                    <p className='text-sm flex items-center gap-2' >Total Earnings <FiEye /> </p>
                    <div className="flex items-center gap-2">
                        <p className='font-semibold text-xl my-3'>₦3,009,100</p>
                        <div className="flex text-sm items-cente gap-1">
                            <div className="text-green-500 font-medium flex items-center gap-1">
                                <BsArrowUpRight color='' />
                                <span className='' >20%</span>
                            </div>
                            <span>compared to yesterday.</span>
                        </div>
                    </div>
                    <div className="mt-5 -ml-10 min-w-[400px] h-[250px]">
                        <BarChart />
                    </div>
                </div>
            </div>
            <div className={`pt-2 text-[13px] bg-white`}>
                <div className="relative border-b p-3 flex justify-between items-center">
                        <p className='font-semibold text-base opacity-90' >Withdrawal Requests</p>
                        <div className="flex items-center gap-4">
                            <button onClick={toggleSchedule} className="justify-center bg-light_blue text-white border rounded-3xl flex  items-center gap-3 font-medium px-6 py-2 text-sm">
                                <span>Set Payment Schedule</span>
                            </button>
                        </div>
                </div>
                <div className="mt-4 header grid grid-cols-5 gap-3 px-5 font-medium">
                    <p className='line-clamp-1 col-span-2' >Referral</p>
                    <p className='line-clamp-1' >Date</p>
                    <p className='' >Rebate</p>
                    <p className='' >Action</p>
                </div>
                <div className="data text-text_color mt-3">
                    {
                        dummyDetails.map((item,idx) => (
                        <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-5 gap-3 px-5 py-6 font-medium`}>
                        <p className='line-clamp-1 col-span-2' >{item.refer}</p>
                        <p className='line-clamp-1' >{item.date}</p>
                        <p className='' >{item.amount}</p>
                        <p onClick={toggleOpenRequest} className='font-semibold text-light_blue cursor-pointer pl-2' >View Details</p>
                        </div>
                        )) 
                    }

                </div>
            </div>
        </div>
        <div className="w-5/12 overflow-y-scroll">
            <div className="relative border-b p-3 py-4 flex justify-between items-center">
                <p className='font-semibold text-base opacity-90'>Transactions</p>
                <div className="flex items-center gap-4">
                    <button onClick={toggleViewPayment} className="text-light_blue font-medium underline text-sm">
                        <span>View payment history</span>
                    </button>
                </div>
            </div>
            <div className="p-5">
                        <div className="grid gap-4">
                        {
                            transactions.map((item,idx) => (
                                <div key={idx} className='flex gap-3' >
                                    <img className='rounded-full size-12' src={earn} alt="image" />
                                    <div className="text-sm">
                                        {/* <p className='font-medium' >{item.title}</p> */}
                                        <p className='my-1 text-[13px]' >{item.desc}</p>
                                        <p className='text-text_color text-xs' >{item.time}</p>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
            </div>
        </div>
        {
            openRequest ? 
                <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                    <div className="bg-white w-[350px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                    <img className='w-12 m-auto' src={stacey} alt="reactivate" />
                    <p className='text-base font-semibold mb-3' >Diana Sipes</p>
                    <div className="flex items-center justify-between gap-4">
                        <p>Withdrawal Amount</p>
                        <p className='font-medium text-sm'>₦ 28,850</p>
                    </div>
                    <div className="flex items-center justify-between gap-5">
                        <p>Date</p>
                        <p className='font-medium text-sm'>Oct. 31, 2017 | 02:32 PM</p>
                    </div>
                    <div className="mt-10 flex items-center gap-3">
                    <Button onClick={toggleOpenRequest} className={'!px-4 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                    <Button onClick={toggleOpenRequest} className={'!px-4 '} title={'Approve Request'} />
                    </div>
                    </div>
                </div> : null
            }
            {
            schedule ? <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                    <div className="bg-white w-[400px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                        {/* <img className='w-12 m-auto' src={rescheduleImg} alt="delete" /> */}
                        <p className='text-base font-semibold' >Set Payment Schedule</p>
                        <div className="grid gap-5 text-left mt-5">
                            <Select placeholders={'Select Day'} options={[{label:'Monday',value:1}]} label={'Day of The Week'} />
                            <Input type={'time'} label={'Time'} />
                        </div>
                        <div className="mt-10 flex items-center gap-5 ">
                            <Button onClick={toggleSchedule} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                            <Button onClick={toggleSchedule} className={'!px-5 !bg-black text-white'} title={'Set Schedule'} />
                        </div>
                    </div>
                </div> : null
            }
            </div>
            :
            <div className='mt-3 w-full border border-custom_gray rounded-xl bg-white mb-7'>
                <div className="relative border-b p-3 flex justify-between items-center">
                    <div className="relative p-3 flex justify-between items-center">
                        <button onClick={toggleViewPayment} className="flex items-center gap-2">
                            <BiArrowBack />
                            <p className='font-semibold text-base opacity-90' >{'Back To Rebates'}</p>
                        </button>
                    </div>
                    <Button onClick={null} className={'!px-7 !bg-light_blue !text-sm !w-fit'} title={'Export as CSV'} />
                </div>
                <div className="bg-white mt-5 text-[13px]">
                    <div className="header grid grid-cols-6 gap-3 px-5 font-medium">
                        <p className='' >Date</p>
                        <p className='col-span-2 line-clamp-1' >Recepient</p>
                        <p className='' >Payment Type</p>
                        <p className='' >Amount</p>
                        <p className='' >Action</p>
                    </div>
                    <div className="data  text-text_color mt-3">
                        {
                            dummy.map((item,idx) => (
                            <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-6  gap-3 px-5 py-6 font-medium`}>
                            <p className='' >{item.phone}</p>
                            <div className="flex items-center gap-2 col-span-2 line-clamp-1">
                                <img className='w-8' src={stacey} alt="stacey" />
                                <p className='line-clamp-1' >{item.name}</p>
                            </div>
                            <p className='' >{item.test}</p>
                            <p className='' >{item.rebate}</p>
                            <p onClick={null} className='font-semibold text-light_blue cursor-pointer' >View Details</p>
                            </div>
                            )) 
                        }

                    </div>
                </div>
            </div>
        }
    </>
  )
}

export default Rebate
