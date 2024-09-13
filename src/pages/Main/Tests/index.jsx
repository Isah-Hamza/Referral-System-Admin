import React, { useEffect, useState } from 'react'
import Input from '../../../components/Inputs'
import { BiCalendar, BiCopy, BiCopyAlt, BiEdit, BiPhoneIncoming, BiSearch, BiTestTube, BiUser, BiZoomOut } from 'react-icons/bi'
import Select from '../../../components/Inputs/Select'
import Button from '../../../components/Button'
import { CgClose, CgMail } from 'react-icons/cg'
import stacey from '../../../assets/images/stacey.svg'
import { MdArrowForward, MdOutlineEmail } from 'react-icons/md'
import completed from '../../../assets/images/completed.svg'
import New from '../../../components/Referral/New'
import { Link, useLocation, useNavigate } from 'react-router-dom'
 
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'; 
import preview from '../../../assets/images/preview.svg';
import { FaEdit } from 'react-icons/fa'
import { BsArrowRight, BsCheck, BsFillTrashFill, BsTrash } from 'react-icons/bs'
import { FcDownload } from 'react-icons/fc';
import { LuTestTube, LuTestTube2 } from 'react-icons/lu';
import deleteIcon from '../../../assets/images/delete.svg';
import moment from 'moment'
import { useMutation, useQuery } from 'react-query'
import TestService from '../../../services/Tests'
import { ConvertToNaira, errorToast, successToast } from '../../../utils/Helper'
import testIcon from '../../../assets/images/Test.svg'
import LoadingModal from '../../../Loader/LoadingModal'

const Tests = () => {
    const navigate = useNavigate();

    const [acitveTab, setActiveTab] = useState(0);
    const [date,setDate] = useState();
    const [tests, setTests] = useState([]);
    const [page,setPage] = useState(1);
    const [pendingTests, setPendingTests] = useState([]);
    const [id,setId] = useState(0);
    const [testDetails, setTestDetails]  = useState(null);
    const [viewDetails, setViewDetails] = useState(false);
    const [uploadTest, setUploadTest] = useState(false);
    const [viewTest, setViewTest] = useState(false);
    const [newCategory, setNewCategory] = useState(false);
    const [editCategory, setEditCategory] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [categories, setCategories] = useState([]);
    const [catTitle, setCatTitle] = useState('');
    const [catId, setCatId] = useState('');

    const toggleViewDetails = () => setViewDetails(!viewDetails);
    const toggleUploadTest = () => setUploadTest(!uploadTest);
    const toggleViewTest = () => setViewTest(!viewTest);
    const toggleNewCategory = () => setNewCategory(!newCategory);
    const toggleEditCategory = () => setEditCategory(!editCategory);
    const toggleDeleteCategory = () => setDeleteCategory(!deleteCategory);
    const toggleCompleted = () => setCompleted(!completed);

    
        
    const { isLoading:loadingPending}  = useQuery('pending', () => TestService.GetPendingTests({ page }), {
        onSuccess:res => {
            setPendingTests(res.data.tests);
            }
        });
        
    const { isLoading:loadingAll}  = useQuery('all', () => TestService.GetAllTests({ page }), {
        onSuccess:res => {
            setTests(res.data.tests);
            }
        });

            
        const { isLoading:loadingTestDetails, mutate:viewTestMutate}  = useMutation(TestService.TestDetail, {
            onSuccess:res => {
                setTestDetails(res.data.details);
                }
            });
            
        const { isLoading:loadingCategories, refetch:refetchCategories}  = useQuery('categories',TestService.Categories, {
            onSuccess:res => {
                setCategories(res.data.categories);
                }
            });
            
        const { isLoading:markingCompleted, mutate:markCompleted}  = useMutation(TestService.MarkComplete, {
            onSuccess:res => {
                toggleCompleted();
                successToast(res.data.message);
                viewTestMutate(id);
                },
                onError:e => {
                    errorToast(e.message);
                }
            });
            
            
        const { isLoading:creatingCat, mutate:createCategory}  = useMutation(TestService.CreateCategory, {
            onSuccess:res => {
                toggleNewCategory();
                successToast(res.data.message);
                setCatTitle('');
                refetchCategories();
                },
                onError:e => {
                    errorToast(e.message);
                }
            });
            
        const { isLoading:updatingCat, mutate:updateCategory}  = useMutation(TestService.UpdateCategory, {
            onSuccess:res => {
                toggleEditCategory();
                successToast(res.data.message);
                setCatTitle('');
                refetchCategories();
                },
                onError:e => {
                    errorToast(e.message);
                }
            });
            

        const viewTestDetails = (id) => {
            setId(id);
            toggleViewDetails();
        }
        
        

    useEffect(() => {
        if(id) viewTestMutate(id);
    }, [id])


    

  return (
   <div className='mt-3 w-full border border-custom_gray rounded-xl bg-white mb-7'>
        <div className="relative border-b p-3 flex justify-between items-center">
            <p className='font-semibold text-base opacity-90' >Department of Radiology</p>
            <div className="flex items-center gap-4">
                {/* <button onClick={toggleNewCategory} className="justify-center bg-light_blue text-white border rounded-3xl flex  items-center gap-3 font-medium px-10 py-2 text-sm">
                    <span>Add New Category</span>
                </button> */}
                {/* <Input className={'!rounded-3xl !py-2.5 !min-w-[300px]'} placeholder={'Type user name here...'} icon={<BiSearch size={20} className='text-custom_gray' />} /> */}
                {/* <Select className={'!rounded-3xl !py-2.5 !min-w-[120px]'} options={[ { label:'All Status',value:null }, {label:'Completed',value:''},{label:'Ongoing'}]} /> */}
            </div>
        </div>
        <div className="relative border-b p-3 flex justify-between items-center">
            <div className={`transition-all duration-300 absolute h-0.5 w-28 bg-primary left-7 bottom-0 ${acitveTab == 1 && '!left-[150px] w-28'} ${acitveTab == 2 && '!left-[260px] w-40'} `}></div>
            <div className="flex gap-14 text-sm pl-5">
                {
                    ['Pending Tests', 'All Tests','Test Categories'].map((item, idx) => (
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
            <div className="header grid grid-cols-11 gap-3 px-5 font-medium">
                <p className='mt-1' > <input type="checkbox" className="accent-primary" id="" /></p>
                <p className='col-span-2 line-clamp-1' >Full Name</p>
                <p className='col-span-2 line-clamp-1' >Assigned Test</p>
                <p className='col-span-2 line-clamp-1' >Appiontment Date</p>
                <p className='col-span-2 line-clamp-1' >Check In</p>
                <p className='' >Action</p>
            </div>
            <div className="data text-text_color mt-3">
                {
                    pendingTests?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-11  gap-3 px-5 py-6 font-medium`}>
                    <p className='' > <input type="checkbox" className="accent-primary" id="" /></p>
                    <p className='col-span-2 line-clamp-1' >{item.full_name}</p>
                    <p className='col-span-2 line-clamp-1 pr-5' >{item.assigned_test}</p>
                    <p className='col-span-2 line-clamp-1' >{moment(item.appointment_date).format('lll')}</p> 
                    <p className='col-span-2 line-clamp-1 pr-5' >{item.check_in_time}</p>
                    <p onClick={() =>viewTestDetails(item.lab_id)} className='col-span-2 font-semibold text-light_blue cursor-pointer' >View Details</p>
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
                <p className='col-span-2 line-clamp-1' >Appiontment Date</p>
                <p className='col-span-2 line-clamp-1' >Status</p>
                <p className='col-span-2' >Action</p>
            </div>
            <div className="data text-text_color mt-3">
                {
                    tests?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-11  gap-3 px-5 py-6 font-medium`}>
                    <p className='' > <input type="checkbox" className="accent-primary" id="" /></p>
                    <p className='col-span-2 line-clamp-1' >{item.full_name}</p>
                    <p className='col-span-2 line-clamp-1' >{item.assigned_test}</p>
                    <p className='col-span-2 line-clamp-1' >{moment(item.appointment_date).format('lll')}</p> 
                    <p className='col-span-2 line-clamp-1 pr-5' >
                        {item.status == 'Completed' ? <div className='bg-green-600 w-fit text-white p-1.5 px-3 rounded-3xl font-medium' >Completed</div> : null}
                        {item.status == 0 ? <div className='bg-red-500 w-fit text-white p-1.5 px-3 rounded-3xl font-medium' >Not Checked In</div> : null}
                        {item.status == 'Not Started' ? <div className='bg-black w-fit text-white p-1.5 px-3 rounded-3xl font-medium' >Not Started</div> : null}
                    </p>
                    <p onClick={() =>viewTestDetails(item.lab_id)} className='col-span-2 font-semibold text-light_blue cursor-pointer' >View Details</p>
                    </div>
                    )) 
                }

            </div>
        </div>
        <div className={`p-5 text-[13px] hidden ${(acitveTab == 2 ) && '!block'}`}>
           <div className="grid grid-cols-3 gap-5">
            {
                categories?.map((item,idx) => (
                    <div className='border rounded-xl p-5 bg-[#fcfcfd]' >
                        <p className='line-clamp-2 text-base font-semibold'>{item.name}</p>
                        <p>{item.tests_count} Test(s)</p>
                        <div className="mt-7 flex items-center justify-between gap-5">
                            <button onClick={() => navigate(`${item.cat_id}`, { state: { 'category':item } })} className='flex items-center gap-1 font-medium text-primary' >
                                <span>View Details</span> <BsArrowRight /> 
                            </button>
                            <div className="flex items-center gap-3">
                                <button onClick={() => { setCatTitle(item.name); toggleEditCategory(); setCatId(item.cat_id) }}><FaEdit className='opacity-80'  size={16 }/></button>
                                <button onClick={toggleDeleteCategory}> <BsTrash size={15 } /></button>
                            </div>
                        </div>
                    </div>
                ))
            }
           </div>
        </div>
        {/* <div className={`mt-5 text-[13px] hidden ${acitveTab == 2 && '!block' }`}>
            <Calendar className={'min-w-[700px] !leading-[6] !text-lg'} onChange={setDate}  />
        </div> */}
        {viewDetails ? <div className="fixed inset-0 bg-black/70 flex justify-end">
            <div className="flex flex-col bg-white w-[500px] max-h-screen overflow-y-auto">
                <div className="flex items-center justify-between p-3 border-b">
                    <p className='font-semibold' >Referral Details</p>
                    <button onClick={toggleViewDetails} className="font-medium flex items-center gap-2">
                        <span>Close</span>
                        <CgClose />
                    </button>
                </div>
                <div className="flex flex-col gap-1 border-b p-5">
                    <img className='w-16 mx-auto' src={stacey} alt="stacey" />
                    <p className='text-center font-medium' >{testDetails?.full_name}</p>
                    <div className="mt-5 grid grid-cols-4 gap-3 text-sm">
                        <div className="flex flex-col justify-center text-center">
                            <div className="mx-auto mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                <MdOutlineEmail />
                             </div>
                            <p className='font-semibold' >Email Address</p>
                            <p className='line-clamp-1 underline text-light_blue' >{testDetails?.email}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center text-center">
                            <div className="mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                <BiPhoneIncoming />
                             </div>
                            <p className='font-semibold' >Phone Number</p>
                            <p className='line-clamp-1' >{testDetails?.phone_number}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center text-center">
                            <div className="mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                <BiUser />
                             </div>
                            <p className='font-semibold' >Gender</p>
                            <p className='line-clamp-1' >{testDetails?.gender}</p>
                        </div>
                        <div className="flex flex-col justify-center items-center text-center">
                            <div className="mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                <BiCalendar />
                             </div>
                            <p className='font-semibold' >Age</p>
                            <p className='line-clamp-1' >{testDetails?.age}</p>
                        </div>
                    </div>
                </div>
                <div className="p-5 text-sm mb-10">
                    <div className="mt-5 grid grid-cols-2 gap-5 gap-y-7 text-sm">
                        <div className="flex flex-col ">
                            <p className='font-medium' >Test Name</p>
                            <p className=' ' >{testDetails?.test_name}</p>
                        </div>
                        <div className="flex flex-col ">
                            <p className='font-medium' >Test Category</p>
                            <p className=' ' >-</p>
                        </div>
                        <div className="flex flex-col ">
                            <p className='font-medium' >Test Price</p>
                            <div className="w-fit flex items-center gap-2 bg-custom_gray p-1 rounded-3xl pr-3">
                                <p className='font-semibold' >{ ConvertToNaira(Number(testDetails?.test_price))}</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Check In Time</p>
                            <p className=' text-primary font-semibold' >{testDetails?.check_in_time}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Appointment Date</p>
                            <p className=' ' >{testDetails?.appointment_date}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className='font-medium' >Test Status</p>
                            <p className=' ' >{testDetails?.test_status}</p>
                        </div>
                    </div>
                </div>
                <div className="grid  gap-2 mt-auto m-5">
                    <button onClick={toggleCompleted} className="justify-center bg-light_blue text-white border rounded-3xl flex  items-center gap-3 font-medium pl-7  py-2.5 text-sm">
                        <BsCheck size={22} />
                        <span>Mark as "Completed"</span>
                    </button>
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
            <div className="bg-white w-[400px] p-5 rounded-xl flex flex-col justify-center text-center gap-3 text-sm">
                <p className='text-base font-semibold' >{newCategory ? 'Add New' : 'Edit'} Category</p>
                <div className="grid gap-5 text-left mt-7">
                    <Input value={catTitle} onChange={e=>setCatTitle(e.target.value)} placeholder={'Enter title here..'} icon={<LuTestTube2 className='opacity-80' size={17} />} type={'text'} label={'Category Title'} />
                </div>

                <div className="mt-10 flex items-center gap-5 ">
                    <Button onClick={ newCategory ? toggleNewCategory : toggleEditCategory} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                    <Button disabled={!catTitle} onClick={ newCategory ?  ()=> createCategory({name:catTitle,dept_id:"330004"}) : ()=> updateCategory({name:catTitle,cat_id:catId})} className={'!px-5 !bg-black text-white'} title={`${newCategory ? 'Add Category' : 'Save Changes'}`} />
                </div>
            </div>
        </div> : null
        }

        {
            completed ? 
               <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                 <div className="bg-white w-[350px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                   <img className='w-12 m-auto' src={testIcon} alt="delete" />
                   <p className='text-base font-semibold' >Mark Test as Completed</p>
                   <p className='text-sm' >You are confirming that this user has completed the assigned test and their status has been changed to "Awaiting Result."</p>
                   <div className="mt-10 flex items-center gap-5 ">
                   <Button onClick={toggleCompleted} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                   <Button onClick={()=>markCompleted({lab_id:id})} className={'!px-5 bg-light_blue'} title={'Yes Proceed'} />
                   </div>
                 </div>
               </div> : null
        }

        {
            deleteCategory ? 
               <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                 <div className="bg-white w-[350px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                   <img className='w-12 m-auto' src={deleteIcon} alt="delete" />
                   <p className='text-base font-semibold' >Delete This Category</p>
                   <p className='text-sm' >Are you sure you want to delete this category? This action is irreversible.</p>
                   <div className="mt-10 flex items-center gap-5 ">
                   <Button onClick={toggleDeleteCategory} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                   <Button onClick={toggleDeleteCategory} className={'!px-5 bg-red-600'} title={'Yes Proceed'} />
                   </div>
                 </div>
               </div> : null
        }
        {
            (markingCompleted || creatingCat  || updatingCat) ? <LoadingModal /> : null
        }

    </div> 
  )
}

export default Tests
