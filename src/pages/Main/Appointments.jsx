import React, { useEffect, useState } from 'react'
import Input from '../../components/Inputs'
import { BiCalendar, BiCheck, BiCopy, BiCopyAlt, BiNote, BiPhoneIncoming, BiSearch, BiUser } from 'react-icons/bi'
import Select from '../../components/Inputs/Select'
import Button from '../../components/Button'
import { CgClose, CgEye, CgMail } from 'react-icons/cg'
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
import missedIcon from '../../assets/images/missed_appoitment.svg'
import paid from '../../assets/images/paid2.svg';
import rescheduleImg from '../../assets/images/reschedule.svg';
import AppointmentService from '../../services/Appointment'
import { useMutation, useQuery } from 'react-query'
import moment from 'moment'
import PageLoading from '../../Loader/PageLoading'
import { ConvertToNaira, errorToast, successToast } from '../../utils/Helper'
import { HiEllipsisHorizontal } from 'react-icons/hi2'
import LoadingModal from '../../Loader/LoadingModal';
import checkinIcon from '../../assets/images/checkin.svg';
import { useFormik } from 'formik'


const Appointments = () => {
    
    const query = useLocation().search.split('=')[1];
    const [acitveTab, setActiveTab] = useState(0);
    const [date,setDate] = useState();
    const [page,setPage] = useState(1);
    const [upcoming, setUpcoming] = useState([]);
    const [all, setAll] = useState([]);
    const [id, setId] = useState(0);
    const [appointment, setAppointment] = useState({});
    const [times,setTimes] = useState([]);
    const [missed, setMissed] = useState(false);

    const [viewDetails, setViewDetails] = useState(false);
    const [newReferral, setNewReferral] = useState(() => query == 'true' ? true : false);
    const [followUp, setFollowUp] = useState(false);
    const [checkin, setCheckin] = useState(false);
    const [markPaid, setMarkPaid] = useState(false);
    const [reschedule, setReschedule] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [comment, setComment] = useState('');

    const toggleViewDetails = () => setViewDetails(!viewDetails);
    const toggleNewReferral = () => setNewReferral(!newReferral);
    const toggleReschedule = () => setReschedule(!reschedule);    
    const toggleFollowUp = () => setFollowUp(!followUp);
    const toggleCheckin = () => setCheckin(!checkin);
    const toggleMarkPaid = () => setMarkPaid(!markPaid);
    const toggleShowMore = () => setShowMore(!showMore);
    const toggleMissed = () => setMissed(!missed);
    const [search, setSearch] = useState('');


    const {handleSubmit, values, getFieldProps, setFieldValue} = useFormik({
        enableReinitialize:true,
        initialValues:{
            date:'',
            time:'',
            appointment_id:id,
        },
        onSubmit:values => {
            rescheduleMutate(values);
        }
    })

    const {handleSubmit:handleSubmitPayment, getFieldProps:getFieldPropsPayment} = useFormik({
        enableReinitialize:true,
        initialValues:{
            admin_id:localStorage.getItem('referrer-admin-id'),
            receipt_id:'',
            appointment_id:id,
            amount:'',
        },
        onSubmit:values => {
            makePayment(values);
        }
    })

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
    
    const { isLoading:loadingUpcoming, isRefetching:refetchingUpcoming}  = useQuery('upcoming', () => AppointmentService.GetUpcomingAppointments({ page }), {
        onSuccess:res => {
            setUpcoming(res.data.appointments);
            }
        });
        
    const { isLoading:loadingAll, isRefetching:refetchingAll}  = useQuery('all', () => AppointmentService.GetAllAppointments({ page }), {
        onSuccess:res => {
            setAll(res.data.appointments);
            }
        });
        
    const { isLoading:loadingAppointment, mutate:getAppoinment}  = useMutation(AppointmentService.GetAppointment, {
        onSuccess:res => {
            setAppointment(res.data);
            }
        });
        
    const { isLoading:checkingIn, mutate:checkIn}  = useMutation(AppointmentService.CheckIn, {
        onSuccess:res => {
            toggleCheckin();
            successToast(res.data.message);
            getAppoinment(id);
            refetchingAll();
            refetchingUpcoming();
        },
        onError: e=> {
            errorToast(e.errors);
        }
        });
        
    const { isLoading:followingUp, mutate:followUpMutate}  = useMutation(AppointmentService.FollowUp, {
        onSuccess:res => {
            successToast(res.data.message);
            toggleFollowUp();
            setComment('');
        },
        onError: e=> {
            errorToast(e.message);
        }
        });
        
    const { isLoading:missing, mutate:missAppointment}  = useMutation(AppointmentService.missAppoitment, {
        onSuccess:res => {
            successToast(res.data.message);
            toggleMissed();
            getAppoinment(id);
        },
        onError: e=> {
            errorToast(e.errors);
        }
        });
        
        
    const { isLoading:rescheduling, mutate:rescheduleMutate}  = useMutation(AppointmentService.Reschedule, {
        onSuccess:res => {
            successToast(res.data.message);
            toggleReschedule();
            getAppoinment(id);
        },
        onError: e=> {
            errorToast(e.errors);
        }
        });
        
    const { isLoading:gettingTime, mutate:getTimes}  = useMutation(AppointmentService.GetTimeSlots, {
        onSuccess:res => {
            const formatted = res.data.available_slots.map(item => ({ label:item,value:item }))
            setTimes(formatted);
        },
        onError: e=> {
            errorToast(e.response.data.errors.date[0]);
        }
        });
        
    const { isLoading:makingPayment, mutate:makePayment}  = useMutation(AppointmentService.MakePayment, {
        onSuccess:res => {
            successToast(res.data.message);
            toggleMarkPaid();
            getAppoinment(id);
        },
        onError: e=> {
            if(e.errors.receipt_id){
                errorToast(e.errors.receipt_id);
                return;
            }
            errorToast(e.errors);
        }
        });

        const viewAppointment = (id) => {
            setId(id);
            toggleViewDetails();
        }

        const { isLoading:searchingUpcoming, mutate:searchUpcoming }  = useMutation(AppointmentService.SearchUpcomingAppointments, {
            onSuccess:res => {
                setUpcoming(res.data.appointments);
                }
            });

        const { isLoading:searchingAll, mutate:searchAll }  = useMutation(AppointmentService.SearchAllAppointments, {
            onSuccess:res => {
                setAll(res.data.appointments);
                }
            });

    
            const handleSearch = (e) => {
                e.preventDefault();
                acitveTab == 0 ? searchUpcoming({query:search}) : searchAll({query:search})
            }
        

    useEffect(() => {
        if(id) getAppoinment(id);
    }, [id])

    useEffect(() => {
        if(values.date) getTimes(moment(values.date).format('YYYY-MM-DD'));
    }, [values.date])


    if(loadingUpcoming || refetchingUpcoming || loadingAll || refetchingAll || searchingAll || searchingUpcoming){
        return <PageLoading adjustHeight={true} />
    }


  return (
  <>
   {!newReferral ? 
   <div className='mt-3 w-full border border-custom_gray rounded-xl bg-white mb-7'>
        <div className="relative border-b p-3 flex justify-between items-center">
            <div className={`transition-all duration-300 absolute h-0.5 w-44 bg-primary left-7 bottom-0 ${acitveTab == 1 && '!left-[220px] w-40'} ${acitveTab == 2 && '!left-[360px] w-40'} `}></div>
            <div className="flex gap-14 text-sm pl-5">
                {
                    ['Upcoming Appointments', 'All Appointments'].map((item, idx) => (
                        <button onClick={() => {setActiveTab(idx); setSearch('')}} className={`opacity-70  ${acitveTab==idx && 'font-semibold opacity-100'}`} key={idx}>{item}</button>
                    ))
                }
            </div>
            <form onSubmit={handleSearch} className="flex items-center gap-4">
                <Input value={search} onChange={e => setSearch(e.target.value)} className={'!rounded-3xl !py-2.5 !min-w-[300px]'} placeholder={'Type user name here...'} icon={<BiSearch size={20} className='text-custom_gray' />} />
            </form>
        </div>
        <div className={`mt-5 text-[13px] hidden ${(acitveTab == 0 ) && '!block'}`}>
            <div className="header grid grid-cols-8 gap-3 px-5 font-medium">
                <p className='col-span-2 line-clamp-1' >Full Name</p>
                <p className='col-span-2 line-clamp-1' >Email Address</p>
                <p className='col-span-2 line-clamp-1' >Appointment Date</p>
                <p className='' >Action</p>
            </div>
            <div className="data text-text_color mt-3">
                {
                    upcoming?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-8  gap-3 px-5 py-6 font-medium`}>
                    <p className='col-span-2 line-clamp-1' >{item.patient_name}</p>
                    <p className='col-span-2 line-clamp-1 pr-5' >{item.patient_email}</p>
                    <p className='col-span-2 line-clamp-1' >{moment(item.appointment_date).format('lll')}</p> 
                    <p onClick={()=>viewAppointment(item.appointment_id)} className='col-span-2 font-semibold text-light_blue cursor-pointer' >View Details</p>
                    </div>
                    )) 
                }

            </div>
        </div>
        <div className={`mt-5 text-[13px] hidden ${(acitveTab == 1 ) && '!block'}`}>
            <div className="header grid grid-cols-10 gap-3 px-5 font-medium">
                <p className='col-span-2 line-clamp-1' >Full Name</p>
                <p className='col-span-2 line-clamp-1' >Appointment Schedule</p>
                <p className='col-span-2 line-clamp-1' >Amount Paid</p>
                <p className='col-span-2 line-clamp-1' >Status</p>
                <p className='col-span-2' >Action</p>
            </div>
            <div className="data text-text_color mt-3">
                {
                    all?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-10  gap-3 px-5 py-6 font-medium`}>
                    <p className='col-span-2 line-clamp-1' >{item.patient_name}</p>
                    <p className='col-span-2 line-clamp-1' >{moment(item.appointment_date).format('lll')}</p> 
                    <p className='col-span-2 line-clamp-1 pr-5' >{ item.amount_paid !== 'N/A' ? ConvertToNaira(item.amount_paid) : item.amount_paid } </p>
                    <p className='col-span-2 line-clamp-1 pr-5' >
                        {item.status == 1 ? <div className='bg-primary w-fit text-white p-1.5 px-3 rounded-3xl font-medium' >Checked In</div> : null}
                        {item.status == 0 ? <div className='bg-red-500 w-fit text-white p-1.5 px-3 rounded-3xl font-medium' >Not Checked In</div> : null}
                        {item.status == 2 ? <div className='bg-black w-fit text-white p-1.5 px-3 rounded-3xl font-medium' >Canceled</div> : null}
                    </p>
                    <p onClick={()=>viewAppointment(item.appointment_id)} className='col-span-2 font-semibold text-light_blue cursor-pointer' >View Details</p>
                    </div>
                    )) 
                }

            </div>
        </div>
        <div className={`mt-5 text-[13px] hidden ${acitveTab == 2 && '!block' }`}>
            <Calendar className={'min-w-[700px] !leading-[6] !text-lg'} onChange={setDate}  />
        </div>
        {viewDetails ? <div className="fixed inset-0 bg-black/70 flex justify-end">
            {
                loadingAppointment ? 
                    <div className="bg-white w-[500px] max-h-screen overflow-y-auto">
                        <PageLoading />
                    </div> :
                    <div className="bg-white w-[500px] max-h-screen overflow-y-auto">
                        <div className="flex items-center justify-between p-3 border-b">
                            <p className='font-semibold' >Referral Details</p>
                            <button onClick={toggleViewDetails} className="font-medium flex items-center gap-2">
                                <span>Close</span>
                                <CgClose />
                            </button>
                        </div>
                        <div className="flex flex-col gap-1 border-b p-5">
                            <img className='w-16 mx-auto' src={stacey} alt="stacey" />
                            <p className='text-center font-medium' >{appointment?.patient?.patient_name}</p>
                            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
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
                            </div>
                        </div>
                        <div className="p-5 text-sm">
                            <p className='font-semibold' >Test Type</p>
                            <div className="mt-3 grid grid-cols-2 gap-2">
                                {
                                    appointment?.testDetails?.map((item,idx) => (
                                        <div key={idx} className="bg-white rounded-md border p-3 text-sm">
                                            <div className="mb-2 font-semibold flex gap-2 justify-between items-center">
                                                <p className='line-clamp-2' >{item.name}</p>
                                                {/* <p className='text-3xl opacity-70' >0{idx + 1}</p> */}
                                            </div>
                                            <div className="flex text-sm items-center justify-between gap-2">
                                                <p className='line-clamp-2' >{item.category}</p>
                                            
                                                <p className='text-base font-medium' >{ConvertToNaira(Number(item.price))}</p>
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
                                    <p className='font-medium' >Appointment Date</p>
                                    <p className=' ' >{moment(appointment?.appointments?.appointment_date).format('lll')}</p>
                                </div>
                                <div className="flex flex-col ">
                                    <p className='font-medium' >Referrer's Name</p>
                                    <div className="w-fit flex items-center gap-2 bg-custom_gray p-1 rounded-3xl pr-3">
                                        <img className='w-7' src={stacey} alt="stacey" />
                                        <p className=' ' >{appointment?.appointments?.referral_name}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className='font-medium' >Invitation Code</p>
                                    <p className=' text-primary font-semibold' >{appointment?.appointments?.invite_code}</p>
                                </div>
                                {/* <div className="flex flex-col">
                                    <p className='font-medium' >Appointment</p>
                                    <p className=' ' >09 September 11:30am</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className='font-medium' >Booking Number</p>
                                    <p className=' ' >003</p>
                                </div> */}
                                <div className="flex flex-col">
                                    <p className='font-medium' >Pament Status</p>
                                    <p className='' >{appointment?.appointments?.payment_status}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className='font-medium' >Total Test Payment</p>
                                    <p className='text-primary font-semibold' >{ConvertToNaira(Number(appointment?.total_amount))}</p>
                                </div>
                            </div>
                            <div className="flex gap-5 mt-10">
                            {/* {
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
                                } */}
                                {
                                    appointment?.appointments?.appointment_status == 'Not Checked In' ?
                                    <button onClick={appointment?.appointments?.payment_status == 'Not Paid' ? toggleMarkPaid : toggleCheckin} className="flex-1 justify-center bg-light_blue text-white border rounded-3xl flex items-center gap-3 font-medium pl-7  py-2 text-sm">
                                        <span>Check Patient In</span>
                                    </button>
                                    : appointment?.appointments?.appointment_status == 'Checked In' ?
                                    <button disabled className="disabled:opacity-65 flex-1 justify-center bg-black text-white border rounded-3xl flex items-center gap-3 font-medium pl-7  py-2 text-sm">
                                        <span>Patient Checked In</span>
                                    </button>
                                    : appointment?.appointments?.appointment_status == 'Cancelled' ?
                                    <button disabled className="disabled:opacity-65 flex-1 justify-center bg-red-400 text-white border rounded-3xl flex items-center gap-3 font-medium pl-7  py-2 text-sm">
                                        <span>Appointment Cancelled</span>
                                    </button>
                                    : null
                                }
                                <button onClick={toggleShowMore} className='w-12 h-12 relative rounded-full grid place-content-center border border-black' >
                                    <HiEllipsisHorizontal />
                                   {showMore ? <div className="p-3 flex flex-col gap-3 absolute bottom-[60px] right-4 min-h-52 border rounded-lg bg-white shadow w-52">
                                        {/* <p className="h-fit flex items-center gap-3 font-medium  py-2 text-sm">
                                            <CgEye size={18} />
                                            <span>View Patient Details</span>
                                        </p> */}
                                        <p onClick={toggleFollowUp} className="h-fit flex items-center gap-3 font-medium  py-2 text-sm">
                                            <CgMail size={18} />
                                            <span>Send Follow Up</span>
                                        </p>
                                        <p onClick={toggleMarkPaid} className="h-fit flex items-center gap-3 font-medium  py-2 text-sm">
                                            <BiCheck size={18} />
                                            <span>Mark Paid</span>
                                        </p>
                                        <p onClick={toggleReschedule} className="h-fit flex items-center gap-3 font-medium  py-2 text-sm">
                                            <BiCalendar size={18} />
                                            <span>Reschedule</span>
                                        </p>
                                        <p onClick={toggleMissed} className="text-red-700 whitespace-nowrap h-fit flex items-center gap-3 font-medium  py-2 text-sm">
                                            <BiNote size={18} />
                                            <span>Missed Appointment</span>
                                        </p>
                                    </div> : null }
                                </button>
                            </div>
                        </div>
                    
                        {/* <div className="border-t my-5 p-5">
                            <Button onClick={toggleNewReferral} title={'Refer'} className={'w-full !px-10 !py-2.5 !text-sm  !bg-light_blue'} />
                        </div> */}
                    </div>
            }
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
                            placeholder='Type your message here..'
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            />
                    </div>
                    <div className="mt-10 flex items-center gap-5 ">
                        <Button onClick={() => setFollowUp(false)} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                        <Button disabled={!comment} onClick={()=> followUpMutate({ appointment_id:id, comment })} className={'!px-5 bg-primary'} title={'Yes Proceed'} />
                    </div>
                </div>
            </div> : null
        }
        {
           missed ? <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                <div className="bg-white w-[400px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                    <img className='w-12 m-auto' src={missedIcon} alt="delete" />
                    <p className='text-base font-semibold' >Missed Appointment</p>
                    <p className='text-sm' >Select a reason for missing appointment.</p>
                    <div className="grid gap-4 text-left mt-5 pl-10">
                       {
                         ['Emergency (family&personal)','Double Bookings', 'Work Conflict','Patient Forgot','Long Wait Times'].map(item => <div className='flex items-center
                          gap-2 text-sm'>
                            <input type="radio" name={'missed_appointment'} id={item} radioGroup='missed_appointment' />
                            <label htmlFor={item} >{item}</label>
                         </div>)
                       }
                    </div>
                    <div className="mt-10 flex items-center gap-5 ">
                        <Button onClick={toggleMissed} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                        <Button  onClick={() => missAppointment({appointment_id:id, reason_id:"0191181"})} className={'!px-5 bg-red-600'} title={'Proceed'} />
                    </div>
                </div>
            </div> : null
        }
        {
           checkin ? <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                <div className="bg-white w-[400px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                    <img className='w-12 m-auto' src={checkinIcon} alt="delete" />
                    <p className='text-base font-semibold' >Check Patient In</p>
                    <p className='text-sm' >You are confirming that this user is present and will begin the assigned test shortly.</p>
                    <div className="mt-10 flex items-center gap-5 ">
                        <Button onClick={() => toggleCheckin()} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                        <Button onClick={() => checkIn({ appointment_id : id })} className={'!px-5 bg-primary'} title={'Yes Proceed'} />
                    </div>
                </div>
            </div> : null
        }
        {
           markPaid ? <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                <form onSubmit={handleSubmitPayment} className="bg-white w-[400px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                    <img className='w-12 m-auto' src={paid} alt="delete" />
                    <p className='text-base font-semibold' >Test Payment Not Made Yet.</p>
                    <p className='text-sm -mt-2' >Add the amount paid by this patient.</p>
                    <div className="mt-5 text-left grid gap-3">
                        <Input {...getFieldPropsPayment('amount')} className={'!px-3'} label={'Amount'} type={'number'} />
                        <Input {...getFieldPropsPayment('receipt_id')} className={'!px-3'} label={'Receipt'} />
                    </div>
                    <div className="mt-3">
                        <div className="flex justify-between items-center">
                            <p>Outstanding Payment</p>
                            <p className='font-medium' >{ConvertToNaira(Number(appointment?.total_amount))}</p>
                        </div>
                        <div className="border-b my-3 pb-2 flex justify-between items-center">
                            <p>Amount Paid</p>
                            <p className='font-medium' >{ConvertToNaira(0)}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>Amount Due</p>
                            <p className='font-medium' >{ConvertToNaira(Number(appointment?.total_amount))}</p>
                        </div>
                    </div>
                    <div className="mt-10 flex items-center gap-5 ">
                        <Button type='button' onClick={toggleMarkPaid} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                        <Button type='submit' className={'!px-5 bg-green-700'} title={'Yes Proceed'} />
                    </div>
                </form>
            </div> : null
        }
        {
           reschedule ? <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                <form onSubmit={handleSubmit} className="bg-white w-[400px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                    <img className='w-12 m-auto' src={rescheduleImg} alt="delete" />
                    <p className='text-base font-semibold' >Reschedule Appointment</p>
                    <div className="grid gap-5 text-left mt-10">
                        <Input {...getFieldProps('date')} type={'date'} label={'Date'} />
                        <Select onChange={e => setFieldValue('time',e.target.value)} options={times} disabled={gettingTime} label={'Time'} />
                    </div>
                    <p className='text-xs text-left'>Users will receive an email concerning this changes.</p>

                    <div className="mt-10 flex items-center gap-5 ">
                        <Button onClick={toggleReschedule} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                        <Button type='submit' className={'!px-5 !bg-black text-white'} title={'Reschedule'} />
                    </div>
                </form>
            </div> : null
        }
    </div> :
    <div className='w-full'>
        <New toggleNewReferral={toggleNewReferral} /> 
    </div>
    }
    {
        (makingPayment || checkingIn || followingUp || rescheduling || missing) ? <LoadingModal /> : null
    }
  </>
  )
}

export default Appointments
