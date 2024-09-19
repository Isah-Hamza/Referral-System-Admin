import React, { useEffect, useState } from 'react'
import Input from '../../components/Inputs'
import { BiCopy, BiCopyAlt, BiPhoneIncoming, BiSearch, BiUser } from 'react-icons/bi'
import Select from '../../components/Inputs/Select'
import Button from '../../components/Button'
import { CgClose } from 'react-icons/cg'
import stacey from '../../assets/images/stacey.svg'
import { MdOutlineEmail } from 'react-icons/md'
import completed from '../../assets/images/completed.svg'
import New from '../../components/Referral/New'
import { useLocation } from 'react-router-dom'
import ReferralService from '../../services/Referrals'
import PageLoading from '../../Loader/PageLoading'
import { useMutation, useQuery } from 'react-query'
import moment from 'moment'
import { ConvertToNaira } from '../../utils/Helper'

const Referrals = () => {
    
    const query = useLocation().search.split('=')[1];
    const [acitveTab, setActiveTab] = useState(0);
    const [page,setPage] = useState(1);
    const [referrals, setReferrals] = useState([]);
    const [referral, setReferral] = useState({});
    const [refCode, setRefCode ] = useState(null);

    const [viewDetails, setViewDetails] = useState(false);
    const [newReferral, setNewReferral] = useState(() => query == 'true' ? true : false);

    const toggleViewDetails = () => setViewDetails(!viewDetails);
    const toggleNewReferral = () => setNewReferral(!newReferral);


    const test_stats = [
        {
            title:'Total Tests Paid',
            value:ConvertToNaira(Number(referral?.total_test_amount)),
        },
        {
            title:'Total Rebate Given',
            value:ConvertToNaira(Number(referral?.rebate_earned)),
        },
    ]

    const viewRef = (ref_code) => {
        setRefCode(ref_code);
        toggleViewDetails();
    }

        
    const { isLoading:loadingReferrals, isRefetching:refetchingReferrals }  = useQuery('referrals', () => ReferralService.GetReferrals({ page }), {
        onSuccess:res => {
            setReferrals(res.data.referrals);
            console.log(res.data)
            }
        });
        
    const { isLoading:loadingReferral, mutate:getReferral}  = useMutation(['referral', refCode],ReferralService.GetReferral, {
        enabled:false,
        onSuccess:res => {
            setReferral(res.data);
            }
        });


    useEffect(() => {
        getReferral(refCode);
    }, [refCode])
    
        

    if(loadingReferrals || refetchingReferrals){
        return <PageLoading adjustHeight={true} />
    }

  return (
  <>
   {!newReferral ? 
   <div className='mt-3 w-full border border-custom_gray rounded-xl bg-white mb-7'>
        <div className="relative border-b p-3 flex justify-between items-center">
            {/* <div className={`transition-all duration-300 absolute h-0.5 w-36 bg-primary left-5 bottom-0 ${acitveTab == 1 && '!left-[165px] w-48'}`}></div> */}
            <div className="flex gap-14 text-sm pl-3">
                {
                    ['All Referrals'].map((item, idx) => (
                        <button onClick={() => setActiveTab(idx)} className={`opacity-70  ${acitveTab==idx && 'font-semibold opacity-100 text-lg'}`} key={idx}>{item}</button>
                    ))
                }
            </div>
            <div className="flex items-center gap-4">
                <Input className={'!rounded-3xl !py-2.5 !min-w-[300px]'} placeholder={'Type user name here...'} icon={<BiSearch size={20} className='text-custom_gray' />} />
                <Select className={'!rounded-3xl !py-2.5 !min-w-[120px]'} options={[ { label:'All Status',value:null }, {label:'Completed',value:''},{label:'Ongoing'}]} />
            </div>
        </div>
        <div className="mt-5 text-[13px]">
            <div className="header grid grid-cols-9 gap-3 px-5 font-medium">
                <p className='col-span-2 line-clamp-1' >Full Name</p>
                <p className='col-span-2 line-clamp-1' >Email Address</p>
                <p className='' >Phone Number</p>
                <p className='' >Referrer</p>
                <p className='' >Invite Code</p>
                <p className='' >Referral Date</p>
                <p className='' >Action</p>
            </div>
            <div className="data  text-text_color mt-3">
                {
                    referrals?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-9  gap-3 px-5 py-6 font-medium`}>
                    <p className='col-span-2 line-clamp-1' >{item.patient_name}</p>
                    <p className='col-span-2 line-clamp-1' >{item.patient_email}</p>
                    <p className='' >{item.patient_phone}</p>
                    <p className='' >{item.referrer_name}</p>
                    <button className='font-bold flex items-center gap-1' > <BiCopyAlt size={17} /> {item.ref_code}</button>
                    <p className='' >{moment(item.referral_date).format('ll')}</p>
                    <p onClick={() => viewRef(item.ref_code)} className='font-semibold text-light_blue cursor-pointer' >View Details</p>
                    </div>
                    )) 
                }

            </div>
        </div>
       {viewDetails ? <div className="fixed h-screen inset-0 bg-black/70 flex justify-end">
            { loadingReferral ?
            <div className="bg-white w-[550px] max-h-screen overflow-y-auto">
            <PageLoading />
            </div> :
            <div className="bg-white w-[550px] max-h-screen overflow-y-auto">

                <div className="flex items-center justify-between p-3 border-b">
                    <p className='font-semibold' >Referral Details</p>
                    <button onClick={toggleViewDetails} className="font-medium flex items-center gap-2">
                        <span>Close</span>
                        <CgClose />
                    </button>
                </div>
                <div className="flex flex-col gap-1 border-b p-5">
                    {/* <img className='w-16 mx-auto' src={stacey} alt="stacey" /> */}
                    <p className=' font-semibold text-lg' >{referral?.patient?.name}</p>
                    <div className="mt-5 grid grid-cols-2 gap-3 gap-y-5 text-sm">
                        <div className="flex flex-col ">
                            <p className='font-medium' >Email Address</p>
                            <p className='line-clamp-1 underline text-light_blue' >{referral?.patient?.email}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Phone Number</p>
                            <p className='line-clamp-1' >{referral?.patient?.phone}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Gender</p>
                            <p className='line-clamp-1' >{referral?.patient?.gender}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Age</p>
                            <p className='line-clamp-1' >{referral?.patient?.age}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Referrer</p>
                            <p className='line-clamp-1' >{referral?.patient?.referrer}</p>
                        </div>
                        <div className="flex flex-col ">
                            <p className='font-medium' >Referral Date</p>
                            <p className='line-clamp-1' >{moment(referral?.patient?.referral_date).format('ll')}</p>
                        </div>
                    </div>
                </div>
                <div className="p-5 text-sm">
                    <p className='font-semibold text-base' >Test Information</p>
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
                    <div className="mt-5">
                    <p className='font-semibold' >Test Type</p>
                    <div className="bg-[#ededed] p-2 rounded-xl">
                        <p>{referral?.total_assigned_tests} tests assigned</p>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            {
                                referral?.test_information?.map((item,idx) => (
                                    <div key={idx} className="bg-white rounded-md border p-3 text-sm">
                                        <div className="mb-2 font-semibold flex gap-2 justify-between items-center">
                                            <p className='line-clamp-2' >{item.name}</p>
                                            <p className='text-3xl opacity-70' >0{idx + 1}</p>
                                        </div>
                                        <div className="flex text-sm flex-wrap items-center justify-between gap-2">
                                            <p className='line-clamp-2' >{item.category}</p>
                                            <p className='text-base font-medium' >{ConvertToNaira(Number(item.price))}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    </div>
                </div>
                
            </div>}
        </div> : null}
    </div> :
    <div className='w-full'>
        <New toggleNewReferral={toggleNewReferral} /> 
    </div>
    }
  </>
  )
}

export default Referrals
