import React, { useEffect, useState } from 'react'
import { IoLogOut } from 'react-icons/io5';
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../assets/images/logo.svg';
import { AiOutlineHome } from "react-icons/ai";
import avatar from '../assets/images/avatar.svg';
import admin from '../assets/images/admin.png';
import { BiCalendarEvent, BiCaretDown, BiUser } from 'react-icons/bi';
import { LuSettings2, LuSheet, LuTestTube } from 'react-icons/lu';
import { BsBellFill, BsCurrencyDollar } from 'react-icons/bs';
import { PiPlusBold } from 'react-icons/pi';
import { FcStatistics } from 'react-icons/fc';


import bank from '../assets/images/Bank.svg';
import test from '../assets/images/Test.svg';
import earn from '../assets/images/Earn.svg';
import { CgClose } from 'react-icons/cg';

const MainLayout = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const [showActivities, setShowActivities] = useState(false);
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
            }
        },
        {
            title:'Referrals',
            link:'referrals',
            icon:BiUser,
            info:{
                header:'Referrals Management',
                sub:'View a list of all referred patients, including those who have not yet booked an appointment.',
            }
        },
        {
            title:'Appointments',
            link:'appointments',
            icon:BiCalendarEvent,
            info:{
                header:'Appointment Management',
                sub:'Track and manage all patient appointments.',
            }
        },
        {
            title:'Results',
            link:'results',
            icon: LuSheet,
            info:{
                header:'Result Management',
                sub:'View a list of all patients with completed tests.',
            }
        },
        {
            title:'Tests',
            link:'tests',
            icon: LuTestTube,
            info:{
                header:'Test Management',
                sub:'Manage and organize test categories and sub-tests.',
            }
        },
        {
            title:'Referrers',
            link:'referrers',
            icon:PiPlusBold,
            info:{
                header:'Referrer Management',
                sub:'View and manage a list of all registered doctors/referrers.',
            }
        },
        {
            title:'Rebates',
            link:'rebates',
            icon:BsCurrencyDollar,
            info:{
                header:'Rebate Management',
                sub:'View the total amount earned by referrers.',
            }
        },
        {
            title:'Reports',
            link:'#',
            icon:FcStatistics,
        },
        {
            title:'Settings',
            link:'settings',
            icon:LuSettings2,
            info:{
                header:'Settings',
                sub:'Customize and manage your account and platform preferences.',
            }
        },
    ]

    
    const activities = [
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
        
  useEffect(() => {

    const active_item = window.location.pathname.split("/")[1];
    
    if(active_item == 'dashboard') setActiveTab(0);
    if(active_item == 'referrals') setActiveTab(1);
    if(active_item == 'appointments') setActiveTab(2);
    if(active_item == 'results') setActiveTab(3);
    if(active_item == 'tests') setActiveTab(4);
    if(active_item == 'referrers') setActiveTab(5);
    if(active_item == 'rebates') setActiveTab(6);
    if(active_item == 'settings') setActiveTab(8);

    // setActiveLink(active_item);
    
      
},[window.location.pathname])

  return (
    <div className='flex w-full bg-[#f8f8f8]'>
      {/* <header className='flex items-center justify-between gap-5 py-5' >
        <img onClick={() => navigate('/')} className='cursor-pointer w-40' src={logo} alt="logo" />
        <div className="flex gap-5 bg-[#ededed] rounded-3xl">
            {
                tabs.map((item,idx) => (
                    <button onClick={() => {
                        navigate(item.link);
                        setActiveTab(idx);
                    }} key={idx} className={`flex items-center gap-2 px-3
                    ${activeTab == idx && 'text-white bg-primary !px-10 py-3 rounded-3xl'}`} >
                        { activeTab == idx ? <item.icon /> : null}
                        <p>{item.title}</p>
                    </button>
            ))
            }
        </div>
        <div className="flex items-center gap-3 ">
            <button onClick={() => navigate('/')} className="w-10 h-10 bg-[#ededed] grid place-content-center rounded-full">
                <IoLogOut size={20} color='red' />
            </button>
            <button>
                <img className='w-10' src={avatar} alt="" />
            </button>
        </div>
      </header> */}
      <div className="w-72 bg-white p-5 h-screen overflow-y-auto">
        <img className='w-36' src={logo} alt="logo" />
        <button className="mt-10 w-full text-left bg-[#C9E6FF] p-2 rounded flex items-center gap-3">
            <img src={admin} alt="admin" />
            <div className='text-sm'>
                <p className='font-semibold' >Emmanuella Igwe</p>
                <p>Admin</p>
            </div>
            <span className='block ml-auto'><BiCaretDown /></span>
        </button>
        <div className="grid gap-1.5 mt-5">
            {
                tabs.map((item,idx) => (
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
            <button onClick={toggleActivities} className="text-sm flex items-center gap-2 px-4 p-2 rounded-3xl bg-custom_gray">
                <BsBellFill />
                <span>Activities</span>
            </button>
        </div>
        <Outlet />
        {
            showActivities ? <div className='inset-0 fixed bg-black/50' >
                <div className="right w-3/5 flex-1 border border-custom_gray rounded-lg bg-white h-screen ml-auto max-w-[400px]">
                <div className="flex items-center justify-between p-3 border-b">
                    <p className='font-semibold' >Your Activities</p>
                    <button onClick={toggleActivities} > <CgClose /> </button>
                </div>
                <div className="p-5">
                    <div className="grid gap-4">
                    {
                        activities.map((item,idx) => (
                            <div key={idx} className='flex gap-3' >
                                <img className='rounded-full size-12' src={item.img} alt="image" />
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
            </div> : null
        }
      </main>
    </div>
  )
}

export default MainLayout
