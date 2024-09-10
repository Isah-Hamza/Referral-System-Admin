import React, { useEffect, useState } from 'react'
import Input from '../../components/Inputs'
import { BiCopy, BiCopyAlt, BiPhoneIncoming, BiSearch, BiUser } from 'react-icons/bi'
import Select from '../../components/Inputs/Select'
import Button from '../../components/Button'
import { CgClose, CgMail } from 'react-icons/cg'
import stacey from '../../assets/images/stacey.svg'
import { MdArrowForward, MdOutlineEmail } from 'react-icons/md'
import completed from '../../assets/images/completed.svg'
import New from '../../components/Referral/New'
import { useLocation } from 'react-router-dom'
import { RiCalendarScheduleFill } from 'react-icons/ri'
import { ImCheckmark } from 'react-icons/im'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import followUpIcon from '../../assets/images/followup.svg';
import paid from '../../assets/images/paid2.svg';
import rescheduleImg from '../../assets/images/reschedule.svg';
import AppointmentService from '../../services/Appointment'
import { useMutation, useQuery } from 'react-query'
import moment from 'moment'

const Appointments = () => {
    
    const query = useLocation().search.split('=')[1];
    const [acitveTab, setActiveTab] = useState(0);
    const [date,setDate] = useState();
    const [page,setPage] = useState(1);
    const [upcoming, setUpcoming] = useState([]);
    const [all, setAll] = useState([]);
    const [id, setId] = useState(0);
    const [appointment, setAppointment] = useState({});

    const [viewDetails, setViewDetails] = useState(false);
    const [newReferral, setNewReferral] = useState(() => query == 'true' ? true : false);
    const [followUp, setFollowUp] = useState(false);
    const [markPaid, setMarkPaid] = useState(false);
    const [reschedule, setReschedule] = useState(false);

    const toggleViewDetails = () => setViewDetails(!viewDetails);
    const toggleNewReferral = () => setNewReferral(!newReferral);
    const toggleReschedule = () => setReschedule(!reschedule);    
    const toggleFollowUp = () => setFollowUp(!followUp);
    const toggleMarkPaid = () => setMarkPaid(!markPaid);

    const dummy = [
        {
            name:'Marcia Cronin ',
            email:'gerald37@hotmail.com',
            appointment:'12-09-2023 09:00am',
            gender:'Female',
            test:'-',
            rebate:'-',
            pay_date:'14-04-2024 11:39pm',
        },
        {
            name:'Luke Hudsonlee Jack',
            email:'earnestine_macejkovic89@yahoo.com',
            appointment:'12-09-2023 09:00am',
            gender:'Male',
            test:'3',
            rebate:'₦103,000',
            pay_date:'09-11-2012 09:15pm',

        },
        {
            name:'Anthony Von',
            email:'emily.rolfson@hotmail.com',
            appointment:'12-09-2023 09:00am',
            gender:'Male',
            test:'-',
            pay_date:'09-11-2012 09:15pm',
            rebate:'-',
        },
        {
            name:'Stacey Jacobs Volkswagon',
            email:'mohammad.schimmel@gmail.com',
            appointment:'12-09-2023 09:00am',
            gender:'Female',
            pay_date:'14-04-2024 11:39pm',
            rebate:'₦21,000',
        },
        {
            name:'Luke Hudson',
            email:'earnestine_macejkovic89@yahoo.com',
            appointment:'12-09-2023 09:00am',
            gender:'Male',
            pay_date:'14-04-2024 11:39pm',
            rebate:'-',
        },
        {
            name:'Anthony Von',
            email:'emily.rolfson@hotmail.com',
            appointment:'12-09-2023 09:00am',
            gender:'Male',
            pay_date:'14-04-2024 11:39pm',
            rebate:'₦55,000',
        },
        {
            name:'Stacey Jacobs',
            email:'mohammad.schimmel@gmail.com',
            appointment:'12-09-2023 09:00am',
            gender:'Female',
            pay_date:'14-04-2024 11:39pm',
            rebate:'₦21,000',
        },
    ]

    const today_booking = [
        {
            name:'Felix Otti',
            tests: 4,
            time:'10:00am - 11:00am',
            status:'paid',
        },
        {
            name:'Christine Jones',
            tests: 4,
            time:'02:00pm - 02:30pm',
            status:'unpaid',
        },
        {
            name:'Felix Otti',
            tests: 4,
            time:'10:00am - 11:00am',
            status:'paid',
        },
        {
            name:'Christine Jones',
            tests: 4,
            time:'02:00pm - 02:30pm',
            status:'unpaid',
        },
    ]
    
    const selectedTests = [
        {
          type:'C.T. Scan - Pelvimetry',
          category:'C.T Test',
          amount:'₦28,000',
        },
        {
            type:'Menstrual Irregularities',
            category:'Endocrinology',
            amount:'₦8,000',
        },
        {
          type:'C.T. Scan - Pelvimetry',
          category:'C.T Test',
          amount:'₦28,000',
        },
        {
            type:'Fibronology',
            category:'HAEMATOLOGY',
            amount:'₦5,500',
        },
    ]

    
    const { isLoading:loadingUpcoming}  = useQuery('upcoming', () => AppointmentService.GetUpcomingAppointments({ page }), {
        onSuccess:res => {
            setUpcoming(res.data.appointments);
            }
        });
        
    const { isLoading:loadingAll}  = useQuery('all', () => AppointmentService.GetAllAppointments({ page }), {
        onSuccess:res => {
            setAll(res.data.appointments);
            }
        });
        
    const { isLoading:loadingAppointment, mutate:getAppoinment}  = useMutation(AppointmentService.GetAppointment, {
        onSuccess:res => {
            setAppointment(res.data);
            }
        });
        

    useEffect(() => {
        getAppoinment(id);
    }, [id])
    

  return (
  <>
   {!newReferral ? 
   <div className='mt-3 w-full border border-custom_gray rounded-xl bg-white mb-7'>
        <div className="relative border-b p-3 flex justify-between items-center">
            <div className={`transition-all duration-300 absolute h-0.5 w-44 bg-primary left-7 bottom-0 ${acitveTab == 1 && '!left-[220px] w-40'} ${acitveTab == 2 && '!left-[360px] w-40'} `}></div>
            <div className="flex gap-14 text-sm pl-5">
                {
                    ['Upcoming Appointments', 'All Appointments'].map((item, idx) => (
                        <button onClick={() => setActiveTab(idx)} className={`opacity-70  ${acitveTab==idx && 'font-semibold opacity-100'}`} key={idx}>{item}</button>
                    ))
                }
            </div>
            <div className="flex items-center gap-4">
                <Input className={'!rounded-3xl !py-2.5 !min-w-[300px]'} placeholder={'Type user name here...'} icon={<BiSearch size={20} className='text-custom_gray' />} />
                {/* <Select className={'!rounded-3xl !py-2.5 !min-w-[120px]'} options={[ { label:'All Status',value:null }, {label:'Completed',value:''},{label:'Ongoing'}]} /> */}
            </div>
        </div>
        <div className={`mt-5 text-[13px] hidden ${(acitveTab == 0 ) && '!block'}`}>
            <div className="header grid grid-cols-9 gap-3 px-5 font-medium">
                <p className='mt-1' > <input type="checkbox" className="accent-primary" id="" /></p>
                <p className='col-span-2 line-clamp-1' >Full Name</p>
                <p className='col-span-2 line-clamp-1' >Email Address</p>
                <p className='col-span-2 line-clamp-1' >Payment Date</p>
                <p className='' >Action</p>
            </div>
            <div className="data text-text_color mt-3">
                {
                    upcoming?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-9  gap-3 px-5 py-6 font-medium`}>
                    <p className='' > <input type="checkbox" className="accent-primary" id="" /></p>
                    <p className='col-span-2 line-clamp-1' >{item.patient_name}</p>
                    <p className='col-span-2 line-clamp-1 pr-5' >{item.patient_email}</p>
                    <p className='col-span-2 line-clamp-1' >{moment(item.appointment_date).format('lll')}</p> 
                    <p onClick={toggleViewDetails} className='col-span-2 font-semibold text-light_blue cursor-pointer' >View Details</p>
                    </div>
                    )) 
                }

            </div>
        </div>
        <div className={`mt-5 text-[13px] hidden ${(acitveTab == 1 ) && '!block'}`}>
            <div className="header grid grid-cols-11 gap-3 px-5 font-medium">
                <p className='mt-1' > <input type="checkbox" className="accent-primary" id="" /></p>
                <p className='col-span-2 line-clamp-1' >Full Name</p>
                <p className='col-span-2 line-clamp-1' >Appointment Schedule</p>
                <p className='col-span-2 line-clamp-1' >Amount Paid</p>
                <p className='col-span-2 line-clamp-1' >Status</p>
                <p className='col-span-2' >Action</p>
            </div>
            <div className="data text-text_color mt-3">
                {
                    all?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-11  gap-3 px-5 py-6 font-medium`}>
                    <p className='' > <input type="checkbox" className="accent-primary" id="" /></p>
                    <p className='col-span-2 line-clamp-1' >{item.patient_name}</p>
                    <p className='col-span-2 line-clamp-1' >{moment(item.appointment_date).format('lll')}</p> 
                    <p className='col-span-2 line-clamp-1 pr-5' >{item.amount ?? '-'}</p>
                    <p className='col-span-2 line-clamp-1 pr-5' >
                        {item.status == 1 ? <div className='bg-primary w-fit text-white p-1.5 px-3 rounded-3xl font-medium' >Checked In</div> : null}
                        {item.status == 0 ? <div className='bg-red-500 w-fit text-white p-1.5 px-3 rounded-3xl font-medium' >Not Checked In</div> : null}
                        {item.status == 2 ? <div className='bg-black w-fit text-white p-1.5 px-3 rounded-3xl font-medium' >Canceled</div> : null}
                    </p>
                    <p onClick={toggleViewDetails} className='col-span-2 font-semibold text-light_blue cursor-pointer' >View Details</p>
                    </div>
                    )) 
                }

            </div>
        </div>
        <div className={`mt-5 text-[13px] hidden ${acitveTab == 2 && '!block' }`}>
            <Calendar className={'min-w-[700px] !leading-[6] !text-lg'} onChange={setDate}  />
        </div>
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
                    <img className='w-16 mx-auto' src={stacey} alt="stacey" />
                    <p className='text-center font-medium' >Stacey Jacobs</p>
                    <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                        <div className="flex flex-col justify-center text-center">
                            <div className="mx-auto mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                <MdOutlineEmail />
                             </div>
                            <p className='font-semibold' >Email Address</p>
                            <p className='line-clamp-1 underline text-light_blue' >earnestine_macejkovic89@yahoo.com</p>
                        </div>
                        <div className="flex flex-col justify-center items-center text-center">
                            <div className="mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                <BiPhoneIncoming />
                             </div>
                            <p className='font-semibold' >Phone Number</p>
                            <p className='line-clamp-1' >299-470-4508</p>
                        </div>
                        <div className="flex flex-col justify-center items-center text-center">
                            <div className="mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                <BiUser />
                             </div>
                            <p className='font-semibold' >Gender</p>
                            <p className='line-clamp-1' >Female</p>
                        </div>
                    </div>
                </div>
                <div className="p-5 text-sm">
                    <p className='font-semibold' >Test Type</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                        {
                            selectedTests.map((item,idx) => (
                                <div key={idx} className="bg-white rounded-md border p-3 text-sm">
                                    <div className="mb-2 font-semibold flex gap-2 justify-between items-center">
                                        <p className='' >{item.type}</p>
                                        <p className='text-3xl opacity-70' >0{idx + 1}</p>
                                    </div>
                                    <div className="flex text-sm items-center justify-between gap-2">
                                        <p className='' >{item.category}</p>
                                      
                                        <p className='text-base font-medium' >{item.amount}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="mt-5 mb-16 grid grid-cols-2  gap-5 gap-y-7 text-sm">
                        <div className="flex flex-col ">
                            <p className='font-medium' >Rebate</p>
                            <p className=' ' >10% on each Test</p>
                        </div>
                        <div className="flex flex-col ">
                            <p className='font-medium' >Date</p>
                            <p className=' ' >09 September, 2024</p>
                        </div>
                        <div className="flex flex-col ">
                            <p className='font-medium' >Referrer's Name</p>
                            <div className="w-fit flex items-center gap-2 bg-custom_gray p-1 rounded-3xl pr-3">
                                <img className='w-7' src={stacey} alt="stacey" />
                                <p className=' ' >Emmanuella Bami</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Invitation Code</p>
                            <p className=' text-primary font-semibold' >UYBFJK</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Appointment</p>
                            <p className=' ' >09 September 11:30am</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Booking Number</p>
                            <p className=' ' >003</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Referral Status</p>
                            <p className='' >pending</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Total Test Payment</p>
                            <p className='text-primary font-semibold' >₦112,000</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5 mt-10">
                       {
                        acitveTab == 0 ? 
                            <button onClick={() => { toggleReschedule(); toggleViewDetails() }} className="border rounded-3xl flex items-center gap-3 font-medium pl-7  py-2 text-sm">
                                <RiCalendarScheduleFill />
                                <span>Reschedule</span>
                            </button>
                            :
                            <button onClick={() => {toggleMarkPaid(); toggleViewDetails() }} className="border rounded-3xl flex items-center gap-3 font-medium pl-7  py-2 text-sm">
                                <ImCheckmark />
                                <span>Mark as Paid</span>
                            </button>
                        }
                        <button onClick={() => {toggleFollowUp(); toggleViewDetails()}} className="bg-light_blue text-white border rounded-3xl flex items-center gap-3 font-medium pl-7  py-2 text-sm">
                            <CgMail size={18} />
                            <span>Send Follow Up</span>
                        </button>
                    </div>
                </div>
               
                {/* <div className="border-t my-5 p-5">
                    <Button onClick={toggleNewReferral} title={'Refer'} className={'w-full !px-10 !py-2.5 !text-sm  !bg-light_blue'} />
                </div> */}
            </div>
        </div> : null}
        {
            date ? <div onClick={() => setDate()} className='bg-white/80 inset-0 fixed grid place-content-center'>
                        <div className="bg-white shadow border p-5 rounded-lg w-[400px]">
                            <div className="flex justify-between items-center gap-5">
                                <p className='text-sm font-semibold mt-1' >Scheduled For The Day</p>
                                <p className='text-sm  mt-1' >Tuesday | January 02 2025</p>

                            </div>
                            <div className="grid gap-3 mt-5">
                                {
                                    today_booking.map((item,idx) => (
                                        <div className='text-sm p-3 px-2 rounded-md border' key={idx}>
                                            <div className="flex items-center justify-between gap-5">
                                                <p className='font-medium mb-1'>{item.name}</p>
                                                <p className={`text-white p-1  rounded-xl text-xs w-[50px] text-center ${item.status == 'paid' ? 'bg-primary' : 'bg-yellow-400'}`} >{item.status}</p>
                                            </div>
                                            <p className='text-xs line-clamp-1' >{item.tests} Test(s) booked &bull; {item.time} </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

            </div> : null
        }
        {
           followUp ? <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                <div className="bg-white w-[400px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                    <img className='w-12 m-auto' src={followUpIcon} alt="delete" />
                    <p className='text-base font-semibold' >Send Follow up Email</p>
                    <p className='text-sm' >Are you sure you want to send an email remainder to this User?</p>
                    <div className="text-left mt-5">
                        <p className='font-medium mb-1'>Comment</p>
                        <textarea 
                            className='outline-none rounded-lg p-3 border w-full min-h-[100px]'
                            placeholder='Type your message here..' />
                    </div>
                    <div className="mt-10 flex items-center gap-5 ">
                        <Button onClick={toggleFollowUp} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                        <Button onClick={toggleFollowUp} className={'!px-5 bg-primary'} title={'Yes Proceed'} />
                    </div>
                </div>
            </div> : null
        }
        {
           markPaid ? <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                <div className="bg-white w-[400px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                    <img className='w-12 m-auto' src={paid} alt="delete" />
                    <p className='text-base font-semibold' >Mark as Paid</p>
                    <p className='text-sm' >Confirm that this user has made a payment. Their status will change to "Paid”</p>
                    <div className="mt-10 flex items-center gap-5 ">
                        <Button onClick={toggleFollowUp} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                        <Button onClick={toggleFollowUp} className={'!px-5 bg-green-700'} title={'Yes Proceed'} />
                    </div>
                </div>
            </div> : null
        }
        {
           reschedule ? <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                <div className="bg-white w-[400px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                    <img className='w-12 m-auto' src={rescheduleImg} alt="delete" />
                    <p className='text-base font-semibold' >Reschedule Appointment</p>
                    <div className="grid gap-5 text-left mt-10">
                        <Input type={'date'} label={'Date'} />
                        <Input type={'time'} label={'Time'} />
                    </div>
                    <p className='text-xs text-left'>Users will receive an email concerning this changes.</p>

                    <div className="mt-10 flex items-center gap-5 ">
                        <Button onClick={toggleReschedule} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                        <Button onClick={toggleReschedule} className={'!px-5 !bg-black text-white'} title={'Reschedule'} />
                    </div>
                </div>
            </div> : null
        }
    </div> :
    <div className='w-full'>
        <New toggleNewReferral={toggleNewReferral} /> 
    </div>
    }
  </>
  )
}

export default Appointments
