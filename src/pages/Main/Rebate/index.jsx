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
import { BiArrowBack, BiSearch, BiTrash } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import RebateService from '../../../services/Rebate';
import moment from 'moment';
import { ConvertToNaira } from '../../../utils/Helper';
import { CgClose } from 'react-icons/cg';
import PageLoading from '../../../Loader/PageLoading';

const Rebate = () => {

    const query = useLocation().search.split('=')[1];
    const [acitveTab, setActiveTab] = useState(0);
    const [acitveInnerTab, setActiveInnerTab] = useState(0);

    const [viewDetails, setViewDetails] = useState(false);
    const [reactivate, setReactivate] = useState(false);
    const [deactivate, setDeactivate] = useState(false);

    const toggleViewDetails = () => setViewDetails(!viewDetails);
    const toggleReactivate = () => setReactivate(!reactivate);
    const toggleDeactivate = () => setDeactivate(!deactivate);
    const [page, setPage] = useState(1);
    const [testRebates, setTestRebates] = useState([]);
    const [payoutRebates, setPayoutRebates] = useState([]);

    const { isLoading:loadingByTests, isFetching:fetchingTests } = useQuery('rebate-by-tests', () => RebateService.RebateByTests(page), {
        onSuccess:res => {
            setTestRebates(res.data.rebates);
        }
    })

    const { isLoading:loadingByRebates, isFetching:fetchingPayouts } = useQuery('rebate-by-payouts', () => RebateService.RebateByPayouts(page), {
        onSuccess:res => {
            setPayoutRebates(res.data.rebates);
        }
    })

 
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

    const dummyDetails2 = [
        {
            refer:'Stanley Stacey',
            recurring:3,
            completed_tests:390,
        },
        {
            refer:'Beverly Weimann',
            recurring:1,
            completed_tests:21,
        },
        {
            refer:'Ramona Witting',
            recurring:5,
            completed_tests:11,
        },
        {
            refer:'Jerome Prohaska',
            recurring:9,
            completed_tests:35,
        },
        {
            refer:'Brendan Schoen',
            recurring:27,
            completed_tests:44,
        },
    ]

    const test_stats = [
        {
            title:'Total Rebate Earned',
            value:'₦2,800,000',
        },
        {
            title:'Pending Rebate',
            value:'₦280,000',
        },
    ]


    
    if(loadingByTests || loadingByRebates || fetchingTests || fetchingPayouts){
        return <PageLoading adjustHeight={true} />
    }

  return (
    <>
       <div className='mt-3 w-full border border-custom_gray rounded-xl bg-white mb-7'>
        <div className="relative border-b p-3 flex justify-between items-center">
            <div className={`transition-all duration-300 absolute h-0.5 w-24 bg-primary left-8 bottom-0 ${acitveTab == 1 && '!left-[135px] w-32'}`}></div>
            <div className="flex gap-14 text-sm pl-10">
                {
                    ['By Tests', 'By Payouts'].map((item, idx) => (
                        <button onClick={() => setActiveTab(idx)} className={`opacity-70  ${acitveTab==idx && 'font-semibold opacity-100'}`} key={idx}>{item}</button>
                    ))
                }
            </div>
            <div className="flex items-center gap-4">
                <Input className={'!rounded-3xl !py-2.5 !min-w-[300px]'} placeholder={'Type user name here...'} icon={<BiSearch size={20} className='text-custom_gray' />} />
                <Select className={'!rounded-3xl !py-2.5 !min-w-[120px]'} options={[ { label:'All Status',value:null }, {label:'Completed',value:''},{label:'Ongoing'}]} />
            </div>
        </div>
       { 
        acitveTab == 1 ? <div className="mt-5 text-[13px]">
            <div className="header grid grid-cols-5 gap-3 px-5 font-medium">
                <p className='line-clamp-1' >Payout ID</p>
                <p className='line-clamp-1' >Paid To</p>
                <p className='line-clamp-2 ' >Payout Date</p>
                <p className='' >Amount Paid</p>
                <p className='' >Status</p>
            </div>
            <div className="data  text-text_color mt-3">
                {
                    payoutRebates?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid items-center grid-cols-5  gap-3 px-5 py-6 font-medium`}>
                        <p className='line-clamp-1' >{item.trnx_id}</p>
                        <p className='line-clamp-1' >{item.payout_to}</p>
                        <p className='line-clamp-2 ' >{moment(item.payout_date).format('lll')}</p>
                        <p className='line-clamp-1' >{ ConvertToNaira(item.payout_amount)}</p>
                        <div className='line-clamp-1' >
                            {item.status == 'Completed' ? <div className='bg-green-600 w-fit text-white p-1.5 px-3 rounded-3xl font-medium' >Completed</div> : null}
                        </div>
                    </div>
                    )) 
                }
            </div>
        </div> :
        <div className="mt-5 text-[13px]">
            <div className="header grid grid-cols-6 gap-3 px-5 font-medium">
                <p className='line-clamp-1' >Test Name</p>
                <p className='line-clamp-1' >Date Completed</p>
                <p className='line-clamp-1' >Referrer Name</p>
                <p className='line-clamp-1' >Date Earned</p>
                <p className='line-clamp-1' >Amount</p>
                <p className=''>Action</p>
            </div>
            <div className="data  text-text_color mt-3">
                {
                 testRebates?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-6  gap-3 px-5 py-6 font-medium`}>
                    <p className='line-clamp-1' >{item.test_name}</p>
                    <p className='line-clamp-1' >{moment(item.date_completed).format('lll')}</p>
                    <p className='' >{item.referrer_name}</p>
                    <p className='' >{moment(item.date_earned).format('lll')}</p>
                    <p className='' >{ConvertToNaira(item.payout_amount)}</p>
                    <p onClick={toggleViewDetails} className='font-semibold text-light_blue cursor-pointer' >View Details</p>
                    </div>
                    )) 
                }

            </div>
        </div>
        }
       {viewDetails ? <div className="fixed inset-0 bg-black/70 flex justify-end">
            <div className="bg-white w-[450px] max-h-screen overflow-y-auto">
                <div className="flex items-center justify-between p-3 border-b">
                    <p className='font-semibold' >Referral Details</p>
                    <button onClick={toggleViewDetails} className="font-medium flex items-center gap-2">
                        <span>Close</span>
                        <CgClose />
                    </button>
                </div>
                <div className="flex flex-col gap-1 border-b p-5">
                    {/* <img className='w-16 mx-auto' src={stacey} alt="stacey" /> */}
                    <div className="flex gap-5 items-center">
                        <img className='w-40' src={stacey} alt="stacey" />
                        <div className="grid gap-2 text-sm">
                            <p className=' font-semibold text-lg' >Stacey Jacobs</p>
                            <div className="flex flex-col ">
                                <p className='font-medium' >Email Address</p>
                                <p className='line-clamp-1 underline text-light_blue' >earnestine_macejkovic89@yahoo.com</p>
                            </div>
                            <div className="flex flex-col">
                                <p className='font-medium' >Phone Number</p>
                                <p className='line-clamp-1' >299-470-4508</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative pt-5 border-b pb-5">
                    <div className={`transition-all duration-300 absolute h-0.5 w-28 bg-primary left-2.5 bottom-0 ${acitveInnerTab == 1 && '!left-[131px] !w-20'} ${acitveInnerTab == 2 && '!left-[220px] w-[95px]'}`}></div>
                    <div className="flex gap-7 text-sm pl-4">
                        {
                            ['Rebate History', 'Referrals', 'User Details'].map((item, idx) => (
                                <button onClick={() => setActiveInnerTab(idx)} className={`opacity-70  ${acitveInnerTab==idx && 'font-semibold opacity-100'}`} key={idx}>{item}</button>
                            ))
                        }
                    </div>
                </div>
                {acitveInnerTab !== 2 ? <div className="p-5 text-sm">
                    <div className="mt-3 grid grid-cols-2 gap-5">
                        {
                            test_stats.map((item,idx) => (
                                <div key={idx} className='border rounded-lg p-3' >
                                    <p className='font-semibold text-lg'>{item.value}</p>
                                    <p className='text-xs' >{item.title}</p>
                                </div>
                            ))
                        }
                    </div>
                </div> : null }
                <div className={`mt-5 text-[13px] hidden ${acitveInnerTab == 0 && '!block'}`}>
                    <div className="header grid grid-cols-6 gap-3 px-5 font-medium">
                        <p className='line-clamp-1' >Date</p>
                        <p className='line-clamp-1' >Referral</p>
                        <p className='' >Test</p>
                        <p className='' >Rebate</p>
                        <p className='' >Status</p>
                        <p className='' >Action</p>
                    </div>
                    <div className="data  text-text_color mt-3 mb-10">
                        {
                            dummyDetails.map((item,idx) => (
                            <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-6  gap-3 px-5 py-6 font-medium`}>
                            <p className='line-clamp-1' >{item.date}</p>
                            <p className='line-clamp-1' >{item.refer}</p>
                            <p className='' >{item.test}</p>
                            <p className='' >{item.amount}</p>
                            <p className='' >{item.status}</p>
                            <p onClick={toggleViewDetails} className='font-semibold text-light_blue cursor-pointer pl-2' >View</p>
                            </div>
                            )) 
                        }

                    </div>
                </div>
                <div className={`mt-5 text-[13px] hidden ${acitveInnerTab == 1 && '!block'}`}>
                    <div className="header grid grid-cols-5 gap-3 px-5 font-medium">
                        <p className='line-clamp-1 col-span-2' >Referral</p>
                        <p className='' >Recurring</p>
                        <p className='' >Completed Tests</p>
                        <p className='' >Action</p>
                    </div>
                    <div className="data  text-text_color mt-3 mb-10">
                        {
                            dummyDetails2.map((item,idx) => (
                            <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-5 gap-3 px-5 py-6 font-medium`}>
                            <p className='line-clamp-1 col-span-2' >{item.refer}</p>
                            <p className='line-clamp-1' >{item.recurring}</p>
                            <p className='' >{item.completed_tests}</p>
                            <p onClick={null} className='font-semibold text-light_blue cursor-pointer pl-2' >View</p>
                            </div>
                            )) 
                        }

                    </div>
                </div>
                <div className={`mt-5 text-[13px] hidden ${acitveInnerTab == 2 && '!block'} pb-5`}>
                     <div className="px-5 text-base">
                        <p className='text-base font-semibold'>Other Information</p>
                        <div className="flex gap-2 mt-3 text-sm">
                            <p className='font-medium' >Registration Date:</p>
                            <p className='line-clamp-1' >July 12, 2024</p>
                        </div>
                        <div className="flex gap-2 mt-3 text-sm">
                            <p className='font-medium' >Hospital Name:</p>
                            <p className='line-clamp-1' >John Doe Hospital</p>
                        </div>
                        <div className="flex gap-2 mt-3 text-sm">
                            <p className='font-medium' >Location:</p>
                            <p className='line-clamp-1' >N/A</p>
                        </div>
                        <div className="flex gap-2 mt-3 text-sm">
                            <p className='font-medium' >Professinal Title:</p>
                            <p className='line-clamp-1' >Gynecologist</p>
                        </div>
                    </div>
                    <div className="mt-10 px-5 text-base">
                        <p className='text-base font-semibold'>Payout Information</p>
                        <div className="flex gap-2 mt-3 text-sm">
                            <p className='font-medium' >Account Name:</p>
                            <p className='line-clamp-1' >John Doe</p>
                        </div>
                        <div className="flex gap-2 mt-3 text-sm">
                            <p className='font-medium' >Account Number:</p>
                            <p className='line-clamp-1' > 1234 - 5678 - 901</p>
                        </div>
                        <div className="flex gap-2 mt-3 text-sm">
                            <p className='font-medium' >Bank Name:</p>
                            <p className='line-clamp-1' >Lifebridge Bank PLC</p>
                        </div>
                        <button onClick={toggleDeactivate} className="flex text-red-700 font-semibold items-center gap-2 my-6 text-sm">
                            <BiTrash size={18} className='' /> <span>Deactivate Account</span>
                        </button>
                    </div>
                   
                </div>
            </div>
        </div> : null}
        {
            reactivate ? 
               <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                 <div className="bg-white w-[350px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                   <img className='w-12 m-auto' src={reactivateIcon} alt="reactivate" />
                   <p className='text-base font-semibold' >Reactivate User</p>
                   <p className='text-sm' >Are you sure you want to reactivate this user?</p>
                   <div className="mt-10 flex items-center gap-5 ">
                   <Button onClick={toggleReactivate} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                   <Button onClick={toggleReactivate} className={'!px-5 !bg-light_blue'} title={'Yes Proceed'} />
                   </div>
                 </div>
               </div> : null
        }
        {
            deactivate ? 
               <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                 <div className="bg-white w-[350px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                   <img className='w-12 m-auto' src={deactivateIcon} alt="delete" />
                   <p className='text-base font-semibold' >Deactivate User</p>
                   <div className='text-left mt-7'>
                     <Input label={'Deactivation reason'} placeholder={'Enter reason..'} />
                   </div>
                   <div className="mt-10 flex items-center gap-5 ">
                   <Button onClick={toggleDeactivate} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                   <Button onClick={toggleDeactivate} className={'!px-5 bg-red-600'} title={'Yes Proceed'} />
                   </div>
                 </div>
               </div> : null
        }
    </div>
    </>
  )
}

export default Rebate
