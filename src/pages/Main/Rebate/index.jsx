import React, { useEffect, useState } from 'react'
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
import { useMutation, useQuery } from 'react-query';
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
    const [id, setId] = useState(0);
    const [rebateDetails, setRebateDetails] = useState(null);
    const [search, setSearch] = useState('');


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

    
    const { isLoading:searchingByTest, mutate:searchByTest }  = useMutation(RebateService.SearchRebateByTests, {
        onSuccess:res => {
            setTestRebates(res.data.rebates);
            }
        });
    
    const { isLoading:searchingByPayout, mutate:searchByPayout }  = useMutation(RebateService.SearchRebateByPayouts, {
        onSuccess:res => {
            setPayoutRebates(res.data.rebates);
            }
        });

    const { isLoading:loadingByRebates, isFetching:fetchingPayouts } = useQuery('rebate-by-payouts', () => RebateService.RebateByPayouts(page), {
        onSuccess:res => {
            setPayoutRebates(res.data.rebates);
        }
    })

    const handleSearch = (e) => {
        e.preventDefault();
        acitveTab == 0 ? searchByTest({query:search}) : searchByPayout({query:search})
    }

    const viewRebateDetails = (id) => {
        setId(id);
        toggleViewDetails();
    }

                
    const { isLoading:loadingRebateDetails, mutate:viewRebateMutate}  = useMutation(RebateService.RebateDetails, {
        onSuccess:res => {
            setRebateDetails(res.data);
            }
        });

    useEffect(() => {
        if(id) viewRebateMutate(id);
    }, [id])
    
    if(loadingByTests || loadingByRebates || fetchingTests || fetchingPayouts || searchingByTest || searchingByPayout){
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
                        <button onClick={() => {setActiveTab(idx);setSearch('')}} className={`opacity-70  ${acitveTab==idx && 'font-semibold opacity-100'}`} key={idx}>{item}</button>
                    ))
                }
            </div>
            <form onSubmit={handleSearch} className="flex items-center gap-4">
                <Input value={search} onChange={e => setSearch(e.target.value)} className={'!rounded-3xl !py-2.5 !min-w-[300px]'} placeholder={'Type user name here...'} icon={<BiSearch size={20} className='text-custom_gray' />} />
                {/* <Select className={'!rounded-3xl !py-2.5 !min-w-[120px]'} options={[ { label:'All Status',value:null }, {label:'Completed',value:''},{label:'Ongoing'}]} /> */}
            </form>
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
                    <p onClick={() => viewRebateDetails(item.trnx_id)} className='font-semibold text-light_blue cursor-pointer' >View Details</p>
                    </div>
                    )) 
                }

            </div>
        </div>
        }
       {viewDetails ? <div className="fixed inset-0 bg-black/70 flex justify-end">
            {
                    loadingRebateDetails ? 
                    <div className="bg-white w-[500px] max-h-screen overflow-y-auto">
                            <PageLoading />
                        </div>
                        :
                <div className="bg-white w-[450px] max-h-screen overflow-y-auto">
                    
                    <div className="bg-white w-[450px] max-h-screen overflow-y-auto">
                        <div className="flex items-center justify-between p-3 border-b">
                            <p className='font-semibold' >Referral Details</p>
                            <button onClick={toggleViewDetails} className="font-medium flex items-center gap-2">
                                <span>Close</span>
                                <CgClose />
                            </button>
                        </div>
                        <div className="flex flex-col gap-1 border-b p-5">
                            <img className='w-16 mx-auto' src={stacey} alt="stacey" />
                            <p className='text-center font-medium' >{rebateDetails?.referrer_name}</p>
                            {/* <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                                <div className="flex flex-col justify-center text-center">
                                    <div className="mx-auto mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                        <MdOutlineEmail />
                                    </div>
                                    <p className='font-semibold' >Email Address</p>
                                    <p className='line-clamp-1 underline text-light_blue' >{appointment?.patient?.patient_email}</p>
                                </div>
                                <div className="flex flex-col justify-center items-center text-center">
                                    <div className="mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                        <BiPhoneIncoming />
                                    </div>
                                    <p className='font-semibold' >Phone Number</p>
                                    <p className='line-clamp-1' >{appointment?.patient?.patient_phone}</p>
                                </div>
                                <div className="flex flex-col justify-center items-center text-center">
                                    <div className="mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                        <BiUser />
                                    </div>
                                    <p className='font-semibold' >Gender</p>
                                    <p className='line-clamp-1' >{appointment?.patient?.patient_gender}</p>
                                </div>
                            </div> */}
                        </div>
                        <div className="p-5 text-sm">
                            <p className='font-semibold' >Test Type</p>
                            <div className="mt-3  gap-2"> 
                                <div  className="bg-white rounded-md border p-3 text-sm">
                                    <div className="mb-2 font-semibold flex gap-2 justify-between items-center">
                                        <p className='line-clamp-2' >{rebateDetails?.test?.test_name}</p>
                                        <p className='text-3xl opacity-70' >1</p>
                                    </div>
                                    <div className="flex text-sm items-center justify-between gap-2">
                                        <p className='line-clamp-2' >{rebateDetails?.test?.test_category}</p>
                                    
                                        <p className='text-base font-medium' >{ConvertToNaira(Number(rebateDetails?.test?.test_amount))}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 mb-16 grid grid-cols-2  gap-5 gap-y-7 text-sm">

                                <div className="flex flex-col ">
                                    <p className='font-medium' >Test Date</p>
                                    <p className=' ' >{moment(rebateDetails?.test_date).format('lll')}</p>
                                </div>
                                <div className="flex flex-col ">
                                    <p className='font-medium' >Result status</p>
                                    <p className=' ' >{(rebateDetails?.result_status)}</p>
                                </div>
                                <div className="flex flex-col ">
                                    <p className='font-medium' >Rebate Amount</p>
                                    <p className=' ' >{ConvertToNaira(rebateDetails?.rebate_amount)}</p>
                                </div>
                                <div className="flex flex-col ">
                                    <p className='font-medium' >Rebate earned status</p>
                                    <p className=' ' >{(rebateDetails?.rebate_earned_status)}</p>
                                </div>
                                {/* <div className="flex flex-col ">
                                    <p className='font-medium' >Referrer's Name</p>
                                    <div className="w-fit flex items-center gap-2 bg-custom_gray p-1 rounded-3xl pr-3">
                                        <img className='w-7' src={stacey} alt="stacey" />
                                        <p className=' ' >{appointment?.appointments?.referral_name}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className='font-medium' >Invitation Code</p>
                                    <p className=' text-primary font-semibold' >{appointment?.appointments?.invite_code}</p>
                                </div> */}

                            </div>
                        </div>
                    </div>
                </div> 
            }
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
