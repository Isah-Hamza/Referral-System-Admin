import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.svg';
import { AiOutlineHome } from "react-icons/ai";
import avatar from '../assets/images/avatar.svg';
import admin from '../assets/images/admin.png';
import { BiCalendarEvent, BiCaretDown, BiUser } from 'react-icons/bi';
import { LuSettings2, LuSheet, LuTestTube } from 'react-icons/lu';
import { BsActivity, BsBellFill, BsCurrencyDollar } from 'react-icons/bs';
import { PiPlusBold } from 'react-icons/pi';
import { FcStatistics } from 'react-icons/fc';


import bank from '../assets/images/Bank.svg';
import test from '../assets/images/Test.svg';
import earn from '../assets/images/Earn.svg';
import { CgClose } from 'react-icons/cg';
import { useQuery } from 'react-query';
import Dashboard from '../services/Dashboard';
import { IoLogOut } from 'react-icons/io5';
import { REMOVE_FROM_LOCALSTORAGE } from '../utils/Helper';

const MainLayout = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [showActivities, setShowActivities] = useState(false);
    const [activitiess, setActivities] = useState([]);
    const adminObj = JSON.parse(window.localStorage.getItem('referrer-admin'));
    const department = JSON.parse(window.localStorage.getItem('referrer-admin'))?.department?.name;
    // const department = 'Customer Service Unit';
    // const department = 'Result Unit';
    // const department = 'Rebate Unit';
    // const department = 'Test Unit';

    const [headerInfo, setHeaderInfo] = useState({
        header:'Dashboard Overview',
        sub:'Manage and analyze your patient statistics.',
    })

    const toggleActivities = () =>  setShowActivities(!showActivities);
    
    const tabs = [
        {
            title:'Dashboard',
            link:'/dashboard',
            icon:AiOutlineHome,
            info: {
                header:'Dashboard Overview',
                sub:'Manage and analyze your patient statistics.',
            },
            deparments:['Audit Unit', 'Administration','Test Unit','General - Test Unit', 'Laboratory Services - Test Unit', 'Radiology - Test Unit', 'Result Unit','Customer Service Unit','Rebate Unit']
        },
        {
            title:'Referrals',
            link:'referrals',
            icon:BiUser,
            info:{
                header:'Referrals Management',
                sub:'View a list of all referred patients, including those who have not yet booked an appointment.',
            },
            deparments:['Audit Unit', 'Administration','Customer Service Unit']

        },
        {
            title:'Appointments',
            link:'appointments',
            icon:BiCalendarEvent,
            info:{
                header:'Appointment Management',
                sub:'Track and manage all patient appointments.',
            },
            deparments:['Audit Unit', 'Administration','Customer Service Unit']

        },
        {
            title:'Tests',
            link:'tests',
            icon: LuTestTube,
            info:{
                header:'Test Management',
                sub:'Manage and organize test categories and sub-tests.',
            },
            deparments:['Audit Unit', 'Administration','Test Unit', 'General - Test Unit','Laboratory Services - Test Unit' ,'Radiology - Test Unit']

        },
        {
            title:'Results',
            link:'results',
            icon: LuSheet,
            info:{
                header:'Result Management',
                sub:'View a list of all patients with completed tests.',
            },
            deparments:['Audit Unit', 'Administration','Result Unit']

        },
        {
            title:'Referrers',
            link:'referrers',
            icon:PiPlusBold,
            info:{
                header:'Referrer Management',
                sub:'View and manage a list of all registered doctors/referrers.',
            },
            deparments:['Audit Unit', 'Administration']

        },
        {
            title:'Rebates',
            link:'rebates',
            icon:BsCurrencyDollar,
            info:{
                header:'Rebate Management',
                sub:'View the total amount earned by referrers.',
            },
            deparments:['Audit Unit', 'Administration','Rebate Unit']
        },
        {
            title:'Reports',
            link:'report',
            info:{
                header:'Reports',
                sub:'View comprehensive reports',
            },
            deparments:['Audit Unit', 'Administration'],
            icon:FcStatistics,
        },
        {
            title:'User Logs',
            link:'user-log',
            info:{
                header:'User Log',
                sub:'View comprehensive reports',
            },
            deparments:['Audit Unit', 'Administration'],
            icon:BsActivity,
        },
        {
            title:'Settings',
            link:'settings',
            icon:LuSettings2,
            info:{
                header:'Settings',
                sub:'Customize and manage your account and platform preferences.',
            },
            deparments:['Audit Unit', 'Administration','Test Unit', 'General - Test Unit','Laboratory Services - Test Unit', 'Radiology - Test Unit','Result Unit','Customer Service Unit','Rebate Unit']
        },
    ]

    const filterDepartmentalTabs = (department) => {
        return tabs.filter(tab => tab.deparments.includes(department));
    }

    const { isLoading:loadingActivities }  = useQuery('activities', Dashboard.GetNotifications, {
        onSuccess:res => {
            setActivities(res.data.notifications);
            }
    });

    const logout = () => {
        REMOVE_FROM_LOCALSTORAGE('referrer-data');
        REMOVE_FROM_LOCALSTORAGE('referrer-token');
        REMOVE_FROM_LOCALSTORAGE('referrer-admin-token');
        REMOVE_FROM_LOCALSTORAGE('referrer-admin-id');
        navigate('/')
    }
        
  useEffect(() => {

    const active_item = window.location.pathname.split("/")[1];
    
    if(active_item == 'dashboard') setActiveTab(0);
    if(active_item == 'referrals') setActiveTab(1);
    if(active_item == 'appointments') setActiveTab(2);
    if(active_item == 'results') setActiveTab(4);
    if(active_item == 'tests') setActiveTab(3);
    if(active_item == 'referrers') setActiveTab(5);
    if(active_item == 'rebates') setActiveTab(6);
    if(active_item == 'report') setActiveTab(7);
    if(active_item == 'user-log') setActiveTab(8);
    if(active_item == 'settings') setActiveTab(9);

    // setActiveLink(active_item);
    
      
},[window.location.pathname])

  return (
    <div className='flex w-full bg-[#f8f8f8]'>
      <div className="w-72 bg-white p-5 h-screen overflow-y-auto">
        <img className='w-36' src={logo} alt="logo" />
        <button className="mt-10 w-full text-left bg-[#C9E6FF] p-2 rounded flex items-center gap-3">
            <img src={admin} alt="admin" />
            <div className='text-sm'>
                <p className='font-semibold capitalize line-clamp-1' >{adminObj.full_name}</p>
                <p className='capitalize'>{adminObj.role}</p>
            </div>
            <span className='block ml-auto'><BiCaretDown /></span>
        </button>
        <div className="grid gap-1.5 mt-5">
            {
                filterDepartmentalTabs(department).map((item,idx) => (
                    <button onClick={() => {
                        navigate(item.link);
                        setActiveTab(idx);
                        setHeaderInfo(item.info)
                    }} key={idx} className={`flex gap-3 px-5  py-3 items-center text-sm
                    ${activeTab == idx && 'text-white bg-primary rounded-md'}`} >
                        <item.icon />
                        <p>{item.title}</p>
                    </button>
                ))
            }
        </div>
      </div>
      <main className='p-7 flex-1 h-screen overflow-y-auto' >
        <div className="w-full header flex items-center justify-between gap-10 py-3 ">
            <div className="">
                <p className='text-base font-semibold' >{headerInfo.header}</p>
                <p className='text-sm' >{headerInfo.sub}</p>
            </div>
            <div className="flex gap-2 items-center">
            <button onClick={logout} className="min-w-10 min-h-10 bg-[#ededed] grid place-content-center rounded-full">
                <IoLogOut size={20} color='red' />
            </button>
            <button onClick={toggleActivities} className="text-sm flex items-center gap-2 px-4 p-2 rounded-3xl bg-custom_gray">
                <BsBellFill />
                <span>Activities</span>
            </button>
            </div>
        </div>
        <Outlet />
        {
            showActivities ? <div className='inset-0 fixed bg-black/50' >
                <div className="overflow-y-auto right w-3/5 flex-1 border border-custom_gray rounded-lg bg-white h-screen ml-auto max-w-[420px]">
                <div className="flex items-center justify-between p-3 border-b">
                    <p className='font-semibold' >Your Activities</p>
                    <button onClick={toggleActivities} > <CgClose /> </button>
                </div>
                <div className="p-5">
                    <div className="grid gap-4">
                    {
                        activitiess?.map((item,idx) => (
                            <div key={idx} className='flex gap-3' >
                                <img className='rounded-full size-12' 
                                src={
                                    item.type == 'ref' ? avatar :
                                    item.type == 'rebate' ? bank : test
                                } 
                                alt="image" />
                                <div className="text-sm">
                                    {/* <p className='font-medium' >{item.title}</p> */}
                                    <p className='my-1 text-[13px]' >{item?.subject}</p>
                                    <p className='text-text_color text-xs' >{item?.date}</p>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
            </div> : null
        }
      </main>
    </div>
  )
}

export default MainLayout
