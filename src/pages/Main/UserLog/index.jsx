import React, { useEffect, useState } from 'react'
import Input from '../../../components/Inputs'
import { BiCopy, BiCopyAlt, BiPhoneIncoming, BiSearch, BiTrash, BiUser } from 'react-icons/bi'
import Select from '../../../components/Inputs/Select'

import { useMutation, useQuery } from 'react-query'
import { ConvertToNaira, errorToast, successToast } from '../../../utils/Helper'
import PageLoading from '../../../Loader/PageLoading'
import moment from 'moment'
import LoadingModal from '../../../Loader/LoadingModal'
import Log from '../../../services/Log'
import { PiTestTubeFill } from "react-icons/pi";
import { FaCalendarDays } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";


const UserLog = () => {
    const [page,setPage] = useState(1);
    const [query, setQuery] = useState('');

    const [id, setId] = useState(0);
    
    const [acitveTab, setActiveTab] = useState(0);
    const [logs, setLogs] = useState([]);

    const [viewDetails, setViewDetails] = useState(false); 

    const { isLoading:loadingLogs, isRefetching:refetchingLogs, refetch:refetchLog}  = useQuery([query,page,'logs'], () => Log.UserLogs({query, page }), {
        onSuccess:res => {
            setLogs(res.data.logs);
            }
    });

  
    if(loadingLogs ){
        return <PageLoading adjustHeight={true} />
    }      

  return (
  <>
   <div className='mt-3 w-full border border-custom_gray rounded-xl bg-white mb-7'>
        <div className="relative border-b p-3 flex justify-between items-center">
            <div className="flex gap-14 text-xl pl-2">
                {
                    ['Activities'].map((item, idx) => (
                        <button onClick={() => setActiveTab(idx)} className={`opacity-70  ${acitveTab==idx && 'font-semibold opacity-100'}`} key={idx}>{item}</button>
                    ))
                }
            </div>
            <div className="flex items-center gap-4">
                <Input value={query} onChange={e => setQuery(e.target.value)} className={'!rounded-3xl !py-2.5 !min-w-[300px]'} placeholder={'Type user name here...'} icon={<BiSearch size={20} className='text-custom_gray' />} />
                {/* <Select className={'!rounded-3xl !py-2.5 !min-w-[120px]'} options={[ { label:'All Status',value:null }, {label:'Completed',value:''},{label:'Ongoing'}]} /> */}
            </div>
        </div>
        <div className="mt-5 text-[13px]">
            <div className="header grid grid-cols-5 gap-3 px-5 font-medium">
                <p className='line-clamp-1' >Time Stamp</p>
                <p className='line-clamp-1' >Activity Type</p>
                <p className='' >Done By</p>
                <p className='text-center' >Action Performed</p>
                <p className='pl-3' >User/Entity</p>
            </div>
            <div className="data  text-text_color mt-3">
                {
                    logs?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-5 items-center gap-3 px-5 py-6 font-medium`}>
                        <div className=" pl-2">
                            <p className='line-clamp-1' >{item.log_date}</p>
                            <p className='line-clamp-1' >{item.log_time}</p>
                        </div>
                        <p className='line-clamp-1 flex items-center gap-1 bg-white shadow px-3 rounded-xl py-1 w-fit min-w-[100px] max-h-[30px]' >
                            <span>
                                {
                                    item.activity_type == 'Test' ?
                                    <PiTestTubeFill size={20} /> :
                                    item.activity_type == 'Appointment' ?
                                    <FaCalendarDays size={18} /> :
                                    item.activity_type == 'Payment' ?
                                    <GiMoneyStack size={20} /> :
                                    item.activity_type == 'Result' ?
                                    <FaClipboardList size={18} /> :
                                    <BiUser size={18} />

                                }
                            </span>
                            {item.activity_type}</p>
                        <p className='' >{item.done_by}</p>
                        <p className='font-bold text-center text-primary'>{item.action_performed}</p>
                        <p className='pl-3' >{ item.patient ?? '-'}</p>
                    </div>
                    )) 
                }
            </div>
        </div>
    </div>
  </>
  )
}

export default UserLog
