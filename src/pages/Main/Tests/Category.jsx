import React, { useEffect, useState } from 'react'
import Input from '../../../components/Inputs'
import { BiArrowBack, BiCopy, BiCopyAlt, BiEdit, BiMoney, BiPhoneIncoming, BiSearch, BiTestTube, BiTrash, BiUser, BiZoomOut } from 'react-icons/bi'
import Select from '../../../components/Inputs/Select'
import Button from '../../../components/Button'
import { CgClose, CgLock, CgMail } from 'react-icons/cg'
import stacey from '../../../assets/images/stacey.svg'
import { MdArrowForward, MdOutlineEmail } from 'react-icons/md'
import completed from '../../../assets/images/completed.svg'
import New from '../../../components/Referral/New'
import { Link, useLocation, useNavigate } from 'react-router-dom'
 
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'; 
import preview from '../../../assets/images/preview.svg';
import { FaEdit, FaEllipsisH } from 'react-icons/fa'
import { BsArrowRight, BsClock, BsFillTrashFill, BsTrash } from 'react-icons/bs'
import { FcDownload } from 'react-icons/fc';
import { LuTestTube, LuTestTube2 } from 'react-icons/lu';
import deleteIcon from '../../../assets/images/delete.svg';
import disableIcon from '../../../assets/images/disable.svg';

import { FaEyeSlash } from 'react-icons/fa6'
import TestService from '../../../services/Tests'
import { useQuery } from 'react-query'
import { ConvertToNaira } from '../../../utils/Helper'
import PageLoading from '../../../Loader/PageLoading'

const Category = () => {
    const navigate = useNavigate();

    const [acitveTab, setActiveTab] = useState(0);
    const [activeItem, setActiveItem] = useState(-1);
    const [date,setDate] = useState();
    const [id, setId] = useState(0);

    const [viewDetails, setViewDetails] = useState(false);
    const [uploadTest, setUploadTest] = useState(false);
    const [viewTest, setViewTest] = useState(false);
    const [newCategory, setNewCategory] = useState(false);
    const [editCategory, setEditCategory] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState(false);
    const [disable, setDisable] = useState(false);
    const [_delete_, setDelete] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [tests, setTests] = useState([]);

    const toggleViewDetails = () => setViewDetails(!viewDetails);
    const toggleUploadTest = () => setUploadTest(!uploadTest);
    const toggleViewTest = () => setViewTest(!viewTest);
    const toggleNewCategory = () => setNewCategory(!newCategory);
    const toggleEditCategory = () => setEditCategory(!editCategory);
    const toggleDeleteCategory = () => setDeleteCategory(!deleteCategory);
    const toggleShowMore = ( ) => setShowMore(!showMore);
    const toggleDisable = () => setDisable(!disable);
    const toggleDelete = () => setDelete(!_delete_);


    const { category } = useLocation().state;
    const cat_id = window.location.pathname.split('/')[2];

    const dummy = [
        {
            test:'24hr urine albumin/Creatine ratio',
            price:'₦20,000', 
        },
        {
            test:'Albumin',
            price:'₦52,500', 
        },
        {
            test:'Elephant 2 criticality call',
            price:'₦409,000', 
        },
        {
            test:'Uat too anomalies',
            price:'₦21,000', 
        },
        {
            test:'Elephant 2 criticality call',
            price:'₦409,000', 
        },
        {
            test:'Albumin',
            price:'₦52,500', 
        },
        {
            test:'Solutions idea metal your',
            price:'₦25,000', 
        },
        {
            test:'Activities ground seems',
            price:'₦85,000', 
        },
        {
            test:'Sorry race protocol',
            price:'₦32,500', 
        },

    ]


    const handleClickEllipses = (e,id) => {
        toggleShowMore();
        if(activeItem == id)
          setActiveItem(-1);
        else
          setActiveItem(id);
      }
    
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

                
    const { isLoading:loadingTests, refetch:refetchTests}  = useQuery(['tests',cat_id],() => TestService.CategoryTests(cat_id), {
        onSuccess:res => {
            setTests(res.data.tests);
            }
        });

  return (
   <div className='mt-3 w-full border border-custom_gray rounded-xl bg-white mb-7'>
        <div className="relative border-b p-3 flex justify-between items-center">
            <button onClick={() => navigate('/tests')} className="flex items-center gap-2">
                <BiArrowBack />
                <p className='font-semibold text-base opacity-90' >{category?.name}</p>
            </button>
            <div className="flex items-center gap-4">
                <button onClick={toggleNewCategory} className="justify-center bg-light_blue text-white border rounded-3xl flex  items-center gap-3 font-medium px-10 py-2 text-sm">
                    <span>Add New Test</span>
                </button>
                {/* <Input className={'!rounded-3xl !py-2.5 !min-w-[300px]'} placeholder={'Type user name here...'} icon={<BiSearch size={20} className='text-custom_gray' />} /> */}
                {/* <Select className={'!rounded-3xl !py-2.5 !min-w-[120px]'} options={[ { label:'All Status',value:null }, {label:'Completed',value:''},{label:'Ongoing'}]} /> */}
            </div>
        </div>
        <div className={`mt-5 text-[13px] hidden ${(acitveTab == 0 || acitveTab == 1 ) && '!block'}`}>
            <div className="header grid grid-cols-10 gap-3 px-5 font-medium">
                <p className='col-span-3 line-clamp-1' >Test</p>
                <p className='col-span-2 line-clamp-1' >Price</p>
                <p className='col-span-2 line-clamp-1' >Turnaround Time</p>
                <p className='col-span-2 line-clamp-1' >Instruction</p>
                <p className='' >Action</p>
            </div>
           {
            loadingTests ? <div className='-mt-32' ><PageLoading /></div>  :
            tests?.length ?
           <div className="data text-text_color mt-3">
                {
                    tests?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} grid items-center grid-cols-10 gap-3 px-5 py-6 font-medium`}>
                        <p className='col-span-3 line-clamp-1' >{item.name}</p>
                        <p className='col-span-2 line-clamp-1' >{ConvertToNaira(Number(item.price))}</p>
                        <p className='col-span-2 line-clamp-1' >{item.turn_around_time ?? '-'}</p>
                        <p className='col-span-2 line-clamp-1' >{item.instruction ?? '-'}</p>
                        <button onClick={(e) => handleClickEllipses(e,idx)} className='relative z-50' ><FaEllipsisH className='opacity-60 ' />
                                { idx == activeItem ? 
                                    <div className="z-10 origin-top-right absolute right-5 mt-2 w-48 rounded-md shadow-lg bg-white">
                                        <div className="bg-white py-2 p-2 w-full relative z-10">
                                            <button 
                                                onClick={toggleEditCategory} 
                                                className="whitespace-nowrap flex items-center gap-3 w-full rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                                <BiEdit size={17} /> Edit Test
                                            </button> 
                                            <button 
                                                onClick={toggleDisable} 
                                                className="whitespace-nowrap flex items-center gap-2 text-green-500 w-full rounded-md px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                                                <FaEyeSlash size={17} /> Disable Test
                                            </button> 
                                            <button 
                                                onClick={toggleDelete} 
                                                className="whitespace-nowrap flex items-center gap-2 text-red-700 w-full rounded-md px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                                                <BiTrash size={17} /> Delete Test
                                            </button> 
                                        </div>
                                    </div> : null
                                }
                        </button>
                    </div>
                    )) 
                }

            </div> : 
            <div className='my-20 text-center'>
                <p className='font-medium' >No data.</p>
                <p>Check back later</p>
            </div>
            }
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
            </div>
        </div> : null}
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

        {
            newCategory || editCategory ? <div className='bg-black/50 fixed inset-0 grid place-content-center' >
            <div className="bg-white w-[450px] p-5 rounded-xl flex flex-col justify-center text-center gap-3 text-sm">
                <p className='text-base font-semibold' >{newCategory ? 'Add New' : 'Edit'} Test</p>
                <div className="grid grid-cols-2 gap-5 text-left mt-7">
                    <div className="col-span-2"><Input placeholder={'Retinal Curvature Correction'} icon={<LuTestTube2 className='opacity-80 ' size={17} />} type={'text'} label={'Test'} /></div>
                    <Input placeholder={'₦20,000'} icon={<BiMoney className='opacity-80' size={17} />} type={'text'} label={'Price'} />
                    <Input placeholder={''} icon={<BsClock className='opacity-80' size={17} />} type={'text'} label={'Turnaround Time'} />
                    <div className="text-left col-span-2">
                        <p className='font-medium mb-1'>Instruction</p>
                        <textarea 
                            className='outline-none rounded-lg p-3 border w-full min-h-[100px]'
                            placeholder='Type your test instruction here..' />
                    </div>
                </div>

                <div className="mt-10 flex items-center gap-5 ">
                    <Button onClick={ newCategory ? toggleNewCategory : toggleEditCategory} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                    <Button onClick={ newCategory ? toggleNewCategory : toggleEditCategory} className={'!px-5 !bg-black text-white'} title={`${newCategory ? 'Add Test' : 'Save Changes'}`} />
                </div>
            </div>
        </div> : null
        }

        {
            _delete_ ? 
               <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                 <div className="bg-white w-[350px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                   <img className='w-12 m-auto' src={deleteIcon} alt="delete" />
                   <p className='text-base font-semibold' >Delete This Test</p>
                   <p className='text-sm' >Are you sure you want to delete this test? This action is irreversible.</p>
                   <div className="mt-10 flex items-center gap-5 ">
                   <Button onClick={toggleDelete} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                   <Button onClick={toggleDelete} className={'!px-5 bg-red-600'} title={'Yes Proceed'} />
                   </div>
                 </div>
               </div> : null
        }
        {
            disable ? 
               <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                 <div className="bg-white w-[350px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                   <img className='w-12 m-auto' src={disableIcon} alt="delete" />
                   <p className='text-base font-semibold' >Disable Test</p>
                   <p className='text-sm' >Are you sure you want to disable this test? It wouldn't be avaible to patients.</p>
                   <div className="mt-10 flex items-center gap-5 ">
                   <Button onClick={toggleDisable} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                   <Button onClick={toggleDisable} className={'!px-5 !bg-black'} title={'Yes Proceed'} />
                   </div>
                 </div>
               </div> : null
        }

    </div> 
  )
}

export default Category
