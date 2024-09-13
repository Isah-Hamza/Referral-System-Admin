import React, { useEffect, useState } from 'react'
import Input from '../../components/Inputs'
import { BiCopy, BiCopyAlt, BiPhoneIncoming, BiSearch, BiTestTube, BiUser, BiZoomOut } from 'react-icons/bi'
import Select from '../../components/Inputs/Select'
import Button from '../../components/Button'
import { CgClose, CgMail } from 'react-icons/cg'
import stacey from '../../assets/images/stacey.svg'
import { MdArrowForward, MdOutlineEmail } from 'react-icons/md'
import completed from '../../assets/images/completed.svg'
import New from '../../components/Referral/New'
import { useLocation } from 'react-router-dom'
 
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'; 
import preview from '../../assets/images/preview.svg';
import { FaEdit } from 'react-icons/fa'
import { BsFillTrashFill } from 'react-icons/bs'
import { FcDownload } from 'react-icons/fc'
import moment from 'moment'
import Result from '../../services/Result'
import { useQuery } from 'react-query'

const Results = () => {
    
    const query = useLocation().search.split('=')[1];
    const [acitveTab, setActiveTab] = useState(0);
    const [date,setDate] = useState();
    const [uploadedResults, setUploadedResults] = useState([]);
    const [awaitingResults, setAwaitingResults] = useState([]); 
    const [page,setPage] = useState(1);

    const [viewDetails, setViewDetails] = useState(false);
    const [uploadTest, setUploadTest] = useState(false);
    const [viewTest, setViewTest] = useState(false);

    const toggleViewDetails = () => setViewDetails(!viewDetails);
    const toggleUploadTest = () => setUploadTest(!uploadTest);
    const toggleViewTest = () => setViewTest(!viewTest);

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

         
    const { isLoading:loadingAwaiting}  = useQuery('awaiting', () => Result.GetAwaitingResults({ page }), {
        onSuccess:res => {
            setAwaitingResults(res.data.awaitingResults);
            }
        });
         
    const { isLoading:loadingUploaded}  = useQuery('uploaded', () => Result.GetUploadedResults({ page }), {
        onSuccess:res => {
            setUploadedResults(res.data.uploadedResults);
            }
        });
        

    useEffect(() => {

    }, [date])
    

  return (
   <div className='mt-3 w-full border border-custom_gray rounded-xl bg-white mb-7'>
        <div className="relative border-b p-3 flex justify-between items-center">
            <div className={`transition-all duration-300 absolute h-0.5 w-[132px] bg-primary left-5 bottom-0 ${acitveTab == 1 && '!left-[190px] w-52'} ${acitveTab == 2 && '!left-[260px] w-40'} `}></div>
            <div className="flex gap-14 text-sm pl-5">
                {
                    ['Awaiting Results', 'Uploaded Results'].map((item, idx) => (
                        <button onClick={() => setActiveTab(idx)} className={`opacity-70  ${acitveTab==idx && 'font-semibold opacity-100'}`} key={idx}>{item}</button>
                    ))
                }
            </div>
            <div className="flex items-center gap-4">
               {
               acitveTab  != 2 ? <Input className={'!rounded-3xl !py-2.5 !min-w-[300px]'} placeholder={'Type user name here...'} icon={<BiSearch size={20} className='text-custom_gray' />} /> :
                <button onClick={toggleNewCategory} className="justify-center bg-light_blue text-white border rounded-3xl flex  items-center gap-3 font-medium px-10 py-2 text-sm">
                    <span>Add New Category</span>
                </button>}
                {/* <Select className={'!rounded-3xl !py-2.5 !min-w-[120px]'} options={[ { label:'All Status',value:null }, {label:'Completed',value:''},{label:'Ongoing'}]} /> */}
            </div>
        </div>
        <div className={`mt-5 text-[13px] hidden ${(acitveTab == 0 ) && '!block'}`}>
            <div className="header grid grid-cols-9 gap-3 px-5 font-medium">
                <p className='mt-1' > <input type="checkbox" className="accent-primary" id="" /></p>
                <p className='col-span-2 line-clamp-1' >Full Name</p>
                <p className='col-span-2 line-clamp-1' >Assigned Test</p>
                <p className='col-span-2 line-clamp-1' >Test Date</p>
                <p className='' >Action</p>
            </div>
            <div className="data text-text_color mt-3">
                {
                    awaitingResults?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-9  gap-3 px-5 py-6 font-medium`}>
                    <p className='' > <input type="checkbox" className="accent-primary" id="" /></p>
                    <p className='col-span-2 line-clamp-1' >{item.full_name}</p>
                    <p className='col-span-2 line-clamp-1 pr-5' >{item.assigned_test}</p>
                    <p className='col-span-2 line-clamp-1' >{moment(item.test_date).format('lll')}</p> 
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
                <p className='col-span-2 line-clamp-1' >Assigned Test</p>
                <p className='col-span-2 line-clamp-1' >Test Date</p>
                <p className='col-span-2 line-clamp-1' >Uploaded Date/Time</p>
                <p className='col-span-2' >Action</p>
            </div>
            <div className="data text-text_color mt-3">
                {
                    uploadedResults?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-11  gap-3 px-5 py-6 font-medium`}>
                    <p className='' > <input type="checkbox" className="accent-primary" id="" /></p>
                    <p className='col-span-2 line-clamp-1' >{item.full_name}</p>
                    <p className='col-span-2 line-clamp-1' >{item.assigned_test}</p>
                    <p className='col-span-2 line-clamp-1' >{moment(item.test_date).format('lll')}</p> 
                    <p className='col-span-2 line-clamp-1' >{moment(item.uploaded_date).format('lll')}</p> 
                    <p onClick={toggleViewDetails} className='col-span-2 font-semibold text-light_blue cursor-pointer' >View Details</p>
                    </div>
                    )) 
                }

            </div>
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
                    <p className='font-semibold text-base' >Test Type</p>
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
                    <div className="mt-5 grid grid-cols-2 gap-5 gap-y-7 text-sm">
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
                    <div className="mt-10 text-sm mb-16 ">
                    <p className='font-semibold text-base' >Uploded Results</p>
                    <div className="my-7 mt-5 grid grid-cols-3 gap-2 gap-y-4">
                        {
                            [1,2,3,4,5].map(item => (
                                <div key={item}>
                                    <div onClick={() => {toggleViewDetails(); toggleViewTest()}} className="cursor-pointer group relative overflow-hidden rounded-lg">
                                        <div className="group-hover:grid absolute inset-0 bg-black/50 hidden place-content-center">
                                            <BiZoomOut size={20} className='text-white' />
                                        </div>
                                        <img className='max-h-[80vh]' src={preview} alt="preview" />
                                        {/* <button className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white border grid place-content-center">
                                            <BsFillTrashFill size={15} color='red' />
                                        </button>   */}
                                    </div>
                                    {/* <div className="flex items-center justify-between gap-3">
                                        <p>Stacey MRI Test</p>
                                        <FaEdit />
                                    </div> */}
                                </div>
                            ))
                        }
                    </div>
                </div>
                    <div className="grid  gap-5 mt-20">
                        <button onClick={() => {toggleUploadTest(); toggleViewDetails()}} className="justify-center bg-light_blue text-white border rounded-3xl flex  items-center gap-3 font-medium pl-7  py-2 text-sm">
                            <BiTestTube size={18} />
                            <span>Upload Tests Result</span>
                        </button>
                    </div>
                </div>
                {/* <div className="p-5 text-sm">
                    <p className='font-semibold' >Uploded Results</p>
                    <div className="my-7 grid grid-cols-3 gap-3 gap-y-7">
                        {
                            [1,2,3].map(item => (
                                <div key={item}>
                                    <div className="relative">
                                        <img className='max-h-[80vh]' src={preview} alt="preview" />
                                        <button className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white border grid place-content-center">
                                            <BsFillTrashFill size={15} color='red' />
                                        </button>  
                                    </div>
                                    <div className="flex items-center justify-between gap-3">
                                        <p>Stacey MRI Test</p>
                                        <FaEdit />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div> */}
               
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
           uploadTest ? <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                <div className="relative grid grid-cols-3 overflow-hidden bg-[#ededed] w-[1000px] max-h-[95vh] my-auto  rounded-2xl gap-3 text-sm">
                    <div className="col-span-2 max-h-[inherit] px-7 py-14">
                        <img className='w-full h-full' src={preview} alt="previwe" />
                    </div>
                    <div className="bg-white flex flex-col overflow-y-auto">
                        <div className="p-3 flex items-center gap-5 justify-between">
                            <p className='font-semibold opacity-90 '>Uploaded Tets</p>
                            <button className='underline'>upload more</button>
                        </div>
                        <div className="my-7 grid grid-cols-2 gap-3 gap-y-7 px-5">
                            {
                                [1,2,3].map(item => (
                                    <div key={item}>
                                        <div className="relative">
                                            <img className='max-h-[80vh]' src={preview} alt="preview" />
                                            <button className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white border grid place-content-center">
                                                <BsFillTrashFill size={15} color='red' />
                                            </button>  
                                        </div>
                                        <div className="flex items-center justify-between gap-3">
                                            <p>Stacey MRI Test</p>
                                            <FaEdit />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="mt-auto p-5 grid grid-cols-2 gap-5">
                            <button onClick={toggleUploadTest} className="justify-center border rounded-3xl flex items-center gap-2 font-medium py-2 text-sm">
                                <span>Close</span>
                            </button>
                            <button onClick={() => {toggleFollowUp(); toggleViewDetails()}} className="justify-center bg-light_blue text-white border rounded-3xl flex items-center gap-2 font-medium py-2 text-sm">
                                <CgMail size={18} />
                                <span>Send Result</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div> : null
        }
        {
           viewTest ? <div className='text-white bg-black/50 fixed inset-0 grid px-5' >
                        <button onClick={toggleViewTest} className="ml-auto flex items-center gap-1 border-b">
                        <CgClose color='white' />
                            close</button>
                        <img className='flex-1 mx-auto mb-5' src={preview} alt="previwe" />       
                        <button className="-mt-10 mb-5 mx-auto bg-primary px-7 p-2 rounded-3xl flex items-center gap-1 text-white"> <FcDownload color='white' /> Download Result</button>            
            </div> : null
        }

    </div> 
  )
}

export default Results
