import React, { useEffect, useState } from 'react'
import { BiCalendar, BiCopy, BiEdit, BiPhoneIncoming, BiPlus, BiSolidUserDetail, BiTrash, BiTrashAlt, BiUser } from "react-icons/bi";
import { CgClose, CgLock } from 'react-icons/cg';
import { CiLocationOn, CiUser } from 'react-icons/ci';
import { MdOutlineLockPerson, MdOutlineMarkEmailUnread, MdTitle } from 'react-icons/md';
import { PiTestTube, PiTestTubeFill, PiUserCircleDuotone } from "react-icons/pi";
import Select from '../../../components/Inputs/Select';
import { BsArrowRight, BsCaretRight, BsClock, BsFillTrashFill, BsPersonAdd, BsTrash } from 'react-icons/bs';
import Button from '../../../components/Button'
import success from '../../../assets/images/success.svg';
import { IoIosArrowForward } from "react-icons/io";
import Input from '../../../components/Inputs';
import { RiBankCardLine } from 'react-icons/ri';
import { GrSettingsOption } from 'react-icons/gr';
import avatar from '../../../assets/images/avatar.svg'
import { FaLocationPin } from 'react-icons/fa6';
import { RiBankCard2Line } from "react-icons/ri";
import { MdOutlineAccountTree } from "react-icons/md";
import deleteIcon from '../../../assets/images/delete.svg';
import { FaEdit, FaEllipsisH, FaEyeSlash } from 'react-icons/fa';
import { LuTestTube2 } from 'react-icons/lu';
import stacey from '../../../assets/images/stacey.svg';
import inviteImg from '../../../assets/images/reactivate.svg';
import { useMutation, useQuery } from 'react-query';
import Settings from '../../../services/Settings';
import { errorToast, successToast } from '../../../utils/Helper';
import { useFormik } from 'formik';
import LoadingModal from '../../../Loader/LoadingModal';
import * as Yup from 'yup';
import moment from 'moment';
import PageLoading from '../../../Loader/PageLoading';
import Tests from '../../../services/Tests';
import { useNavigate } from 'react-router-dom';


export const CustomValidationError = ({ text='An error occured' }) => (
  <span className='text-xs text-red-700' >{text}</span>
)

const Profile = ({}) => {
  const navigate = useNavigate();
  const adminID = window.localStorage.getItem('referrer-admin-id');
  const department = JSON.parse(window.localStorage.getItem('referrer-admin'))?.department?.name;
  console.log(department)
  const [activeTab, setActiveTab] = useState(0);
  const [successful, setSuccessful] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [invite, setInvite] = useState(false);

  const [newCategory, setNewCategory] = useState(false);
  const [newCategory2, setNewCategory2] = useState(false);

  const [editCategory, setEditCategory] = useState(false);
  const [editCategory2, setEditCategory2] = useState(false);

  const [deleteCategory, setDeleteCategory] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(0);

  const [activeItem, setActiveItem] = useState(-1);
  const [changeRole, setChangeRole] = useState(false);
  const [adminData, setAdminData] = useState();
  const [departmentss, setDepartments] = useState([])
  const [departmentsOption, setDepartmentOption] = useState([])
  const [categories, setCategories] = useState([]);
  const [catTitle, setCatTitle] = useState('');
  const [catId, setCatId] = useState('');
  const [subAdmins, setSubAdmins] = useState([]);
  const [appointment, setAppointment] = useState();
  const [schedules, setSchedules] = useState();
  const [selectedDept, setSelectedDept] = useState('');
  const [invites, setInvites] = useState([
    {
      email:"",
      role_id:"",
    }
  ]);

  const toggleSuccessful = () => setSuccessful(!successful);
  const toggleDeleteAccount = () => setDeleteAccount(!deleteAccount);

  const toggleNewCategory = () => setNewCategory(!newCategory);
  const toggleNewCategory2 = () => setNewCategory2(!newCategory2);

  const toggleEditCategory = () => setEditCategory(!editCategory);
  const toggleEditCategory2 = () => setEditCategory2(!editCategory2);

  const toggleDeleteCategory = () => setDeleteCategory(!deleteCategory);
  const toggleChangeRole = () => setChangeRole(!changeRole);
  const toggleInvite = () => setInvite(!invite);

  const tabs = [
    {
      title:'General',
      icon:<BiSolidUserDetail size={20} />,
      onClick:() => { document.querySelector('#patient').scrollIntoView() },
    },
    {
      title:'Account & Security',
      icon:<GrSettingsOption size={20} />,
      onClick:() => {
        console.log('clicked')
        document.querySelector('#test').scrollIntoView()},
    },
    {
      title:'Test Categories',
      icon:<LuTestTube2 size={20} />,
      hide: ['Administration','Audit Unit','Laboratory Services','General','Laboratory Services' ,'Radiology'].indexOf(department) < 0,
    },
    {
      title:'Appointment Settings',
      icon:<BiCalendar size={20} />,
      onClick:() => { document.querySelector('#patient').scrollIntoView() },
      hide: ['Administration','Audit Unit','Customer Service Unit'].indexOf(department) < 0,
    },
    {
      title:'Departments',
      icon:<PiTestTube size={20} />,
      onClick:() => { document.querySelector('#patient').scrollIntoView() },
      hide: ['Administration','Audit Unit'].indexOf(department) < 0,
    },
    {
      title:'User Roles & Permissions',
      icon:<PiUserCircleDuotone size={20} />,
      onClick:() => { document.querySelector('#patient').scrollIntoView() },
      hide: ['Administration','Audit Unit'].indexOf(department) < 0,
    },
  ]

  const handleClickEllipses = (e,id,adminObj) => {
  // console.log(adminObj);
    if(activeItem == id){
      setActiveItem(-1);
      setSelectedAdminId(adminObj);
    }
    else
    {
      setActiveItem(id);
      setSelectedAdminId(adminObj);
    }
  }

  const dummy = [
    {
        user:'Jersey Russvelt',
        email:'roosevelt.jersey@gmail.com',
        phone:'903 2393 343',
        role:'Tests - Gynaecology'
    },
    {
        user:'Abdullahi Magdalene',
        email:'abd.mag@hotmail.com',
        phone:'801 4359 940',
        role:'Finance'
    },
    {
        user:'Jersey Russvelt',
        email:'roosevelt.jersey@gmail.com',
        phone:'903 2393 343',
        role:'Tests - Gynaecology'
    },
    {
        user:'Abdullahi Magdalene',
        email:'abd.mag@hotmail.com',
        phone:'801 4359 940',
        role:'Finance'
    },
    {
        user:'Jersey Russvelt',
        email:'roosevelt.jersey@gmail.com',
        phone:'903 2393 343',
        role:'Tests - Gynaecology'
    },
    {
        user:'Abdullahi Magdalene',
        email:'abd.mag@hotmail.com',
        phone:'801 4359 940',
        role:'Finance'
    },
  ]

  const close = () => {
    toggleSuccessful();
  }

  const { isLoading:loadingSchedules , refetch:refetchSchedule } = useQuery('schedules', ()=>Settings.GetSchedule(),{
    onSuccess:res => {
      setAppointment(res.data);
    },
    onError:e=>errorToast('error fetching admin data'),
  })

  const { isLoading:loadingProfile } = useQuery('profile', ()=>Settings.GetProfile(adminID),{
    onSuccess:res => {
      setAdminData(res.data);
    },
    onError:e=>errorToast('error fetching admin data'),
  })

  const { isLoading:loadingDepartments } = useQuery('departments', ()=>Settings.GetDepartments(),{
    onSuccess:res => {
      setDepartments(res.data.departments);
      setDepartmentOption(res.data.departments.map(item => (
        {
          label:item.name,
          value:item.department_id,
        }
      )))
    },
    onError:e=>errorToast('error fetching departments'),
  })

  const { isLoading:loadingCategories, refetch:refetchCategories}  = useQuery('categories',Tests.Categories, {
    onSuccess:res => {
        setCategories(res.data.categories);
        }
    });

    const { isLoading:changingRole, mutate:changeRoleMutate}  = useMutation(Settings.ChangeRole, {
      onSuccess:res => {
          toggleChangeRole()
          successToast(res.data.message);
          refetchSubAdmins();
          },
          onError:e => {
              errorToast(e.message);
          }
      });

    const { isLoading:deletingUser, mutate:deleteUserMutate}  = useMutation(Settings.RemoveSubAdmin, {
      onSuccess:res => {
          // toggleChangeRole()
          successToast(res.data.message);
          refetchSubAdmins();
          },
          onError:e => {
              errorToast(e.message);
          }
      });

    const { isLoading:creatingCat, mutate:createCategory}  = useMutation(Tests.CreateCategory, {
      onSuccess:res => {
          toggleNewCategory2();
          successToast(res.data.message);
          setCatTitle('');
          refetchCategories();
          },
          onError:e => {
              errorToast(e.message);
          }
      });

  const { isLoading:loadingSubAdmins , refetch:refetchSubAdmins} = useQuery('sub-admins', ()=>Settings.GetSubAdmins(),{
    onSuccess:res => {
      setSubAdmins(res.data.admins);
    },
    onError:e=>errorToast('error fetching admins'),
  })

  const { isLoading:updatingProfile, mutate:updateProfile } = useMutation(Settings.UpdateProfile, {
    onSuccess: res=> {
      successToast(res.data.message);
      
    },
    onError: e => {
      errorToast(e.message);
    }
  });

  const { isLoading:updatingBank, mutate:updateBank } = useMutation(Settings.UpdateBank, {
    onSuccess: res=> {
      successToast(res.data.message);
      
    },
    onError: e => {
      errorToast(e.message);
    }
  });

  const {handleSubmit, getFieldProps} = useFormik({
    enableReinitialize:true,
    initialValues:{
      admin_id: adminID,
      "first_name": adminData?.first_name ?? "",
      "last_name": adminData?.last_name ?? "",
      "email": adminData?.email ?? "",
      "phone_number": adminData?.phone_number ?? ""
    },
    onSubmit:values=>{
      updateProfile(values);
    }
  })

  
const { resetForm:resetFormPassword, errors:errorsPassword, handleSubmit:handleSubmitPassword, touched:touchedPassword, getFieldProps:getFieldPropsPassword } = useFormik({
  enableReinitialize:true,
  initialValues:{
      admin_id:adminID,
      password:'',
      old_password:'',
      password_confirmation:'',
  },
  validationSchema: Yup.object().shape({
    password: Yup.string().required().min(8),
    old_password: Yup.string().required(),
    password_confirmation: Yup.string().required('This field is required').oneOf([Yup.ref('password')],'Passwords mismatch'),

  }),
  onSubmit:values => {
      // console.log(values);
      changePassword(values);
  }
})
 
  
const { mutate:changePassword, isLoading:changingPassword } = useMutation(Settings.UpdatePassword, {
  onSuccess:res => {
      resetFormPassword();
      successToast(res.data.message);
      
  },
  onError:e => {
      errorToast(e.error);
  }
})
 
  
const { mutate:updateScheduleMutate, isLoading:updatingSchedule } = useMutation(Settings.UpdateSchedule, {
  onSuccess:res => {
      refetchSchedule();
      successToast(res.data.message);
      
  },
  onError:e => {
      errorToast(e.error);
  }
})
  
const { mutate:sendInviteMutate, isLoading:sendingInvite } = useMutation(Settings.InviteSubAdmin, {
  onSuccess:res => {
      toggleInvite();
      setInvites([ { email:'',role_id:'' }]);
      refetchSubAdmins();
      successToast(res.data.message);
  },
  onError:e => {
    const firstError = Object.entries(e.errors)[0][1][0];
    errorToast(firstError); 
  }
})

const { isLoading:updatingCat, mutate:updateCategory}  = useMutation(Tests.UpdateCategory, {
  onSuccess:res => {
      toggleEditCategory2();
      successToast(res.data.message);
      setCatTitle('');
      refetchCategories();
      },
      onError:e => {
          errorToast(e.message);
      }
  });
  

const updateSchedule = () => {
  const data = {
    schedules:schedules.schedules.map(item => {
      return ({
        ...item,
        start_time: (item.start_time).substring(0,5),
        end_time: (item.end_time).substring(0,5),
        status: item.status == 'active' ? 1 : 0,
      })
    }),
    session_interval:schedules.session_interval,
    patient_per_slot:schedules.patient_per_slot,
  }
  updateScheduleMutate(data);
}

  const profile = {};
  const { touched, values, errors, handleSubmit:handleSubmitBank, getFieldProps:getfieldPropsBank, setFieldValue:setFieldValueBank} = useFormik({
    enableReinitialize:true,
    initialValues:{
        "admin_id": adminID, 
        "bank_name": profile?.data?.bank_name ,
        "account_number":profile?.data?.account_number,
        "account_name": profile?.data?.account_name,
        "bank_code": profile?.data?.bank_code ?? "",
    },
    validationSchema: Yup.object().shape({
        "admin_id": Yup.string().required('This field is required'),
        "bank_name": Yup.string().required('This field is required'),
        "account_number": Yup.string().required('This field is required'),
        "account_name": Yup.string().required('This field is required'),
    }),
    onSubmit:values => {
        updateBank(values);
    }
})

const intervalOptions = [
  {
    label:'15 Mins',
    value:15,
  },
  {
    label:'30 Mins',
    value:30,
  },
  {
    label:'40 Mins',
    value:40,
  },
  {
    label:'45 Mins',
    value:45,
  },
  {
    label:'50 Mins',
    value:50,
  },
  {
    label:'60 Mins',
    value:60,
  },
]

const slotOptions = [
  {
    label:'1 Person',
    value:1,
  },
  {
    label:'2 Person',
    value:2,
  },
  {
    label:'3 Person',
    value:3,
  },
  {
    label:'4 Person',
    value:4,
  },
  {
    label:'5 Person',
    value:5,
  },
  {
    label:'6 Person',
    value:6,
  },
  {
    label:'7 Person',
    value:7,
  },
  {
    label:'8 Person',
    value:8,
  },
  {
    label:'9 Person',
    value:9,
  },
  {
    label:'10 Person',
    value:10,
  },
]

const handleStartChange = (value, id) => {
  const res = schedules.schedules?.map(item => {
    if(item.day_id == id){
      return ({...item, start_time:value})
    }else
    return item;
  })
  setSchedules(prev => ({...prev, schedules: res}));
}

const handleEndChange = (value, id) => {
  const res = schedules.schedules?.map(item => {
    if(item.day_id == id){
      return ({...item, end_time:value})
    }else
    return item;
  })
  setSchedules(prev => ({...prev, schedules: res}));
}

const toggleDay = (value, id) => {
  console.log(value)
  const res = schedules.schedules?.map(item => {
    if(item.day_id == id){
      return ({...item, status:value=='on' ? 'active' : 'inactive'})
    }else
    return item;
  })
  setSchedules(prev => ({...prev, schedules: res}));
}

const addMoreUser = () => {
  const template = { email:'',role_id:'' };
  setInvites(prev => [...prev, template]);
}

const removeUser = (idx) => {
  setInvites(prev => prev.filter((item,id) => id !== idx));
}

const sendInvites = () => {
  const data = invites.filter(item => item.email  && item.role_id);
  sendInviteMutate({subadmins:data});
}

useEffect(() => {
  if(appointment) setSchedules(appointment);
}, [appointment])


  return (
    <div className='w-full bg-white rounded-xl flex' >
      { !successful ? 
        <>
          <div className="w-[300px] border-r h-[calc(100vh-120px)] p-5 pt-7">
            <div className="grid gap-5 max-w-[250px]">
              {
                tabs.map((item,idx) => (
                  <div  onClick={() =>{ setActiveTab(idx); item.onClick()}} key={idx} 
                        className={`hover:font-medium hover:opacity-90 cursor-pointer text-sm flex items-center gap-2 rounded-3xl p-3 px-6 opacity-60 ${idx == activeTab && '!opacity-100 bg-[#f9f9f9] !font-medium'} ${item.hide ? '!hidden' : 'block'}`} >
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                ))
              }
            </div>
          </div>
          <div className='h-[calc(100vh-120px)] overflow-y-auto flex-1'>
            { activeTab == 0 ? 
            <> 
              {
                loadingProfile ?
                <div className="w-full h-full">
                  <PageLoading adjustHeight />
                </div> :
                <form onSubmit={handleSubmit} className=" p-10 pt-7">
                  <div className="flex justify-between">
                      <div id='patient' className="">
                        <p className='font-semibold mb-1' >Profile Details</p>
                        <p className='text-sm' >Manage your profile.</p>
                      </div>
                  </div>
                  <div className="mt-10 flex gap-5 items-center">
                    <img className='w-24' src={avatar} alt="user" />
                    <div className="grid gap-1">
                      <p className='font-medium' >Profile Picture</p>
                      <p className='text-text_color text-sm' >PNG, JPG, GIF max size of 5MB</p>
                    </div>
                  </div>
                  <div className="mt-10 grid grid-cols-2 gap-5 max-w-[600px]">
                    <div className="">
                        <Input {...getFieldProps('first_name')} label={'First Name'} placeholder={'John Doe'} icon={<CiUser size={24} />}/>
                    </div>
                    <div className="">
                        <Input {...getFieldProps('last_name')} label={'Last Name'} placeholder={'Doe'} icon={<CiUser size={24} />}/>
                    </div>
                    <div className=" col-span-2">
                        <Input disabled={true} {...getFieldProps('email')} label={'Email Address'} placeholder={'support@lifebridge.com'} type={'email'} icon={<MdOutlineMarkEmailUnread size={22} />}/>
                    </div>
                    <div className=" col-span-2">
                        <Input {...getFieldProps('phone_number')} label={'Phone Number'} placeholder={'Phone Number'} icon={<BiPhoneIncoming size={24} />}/>
                    </div>
                  </div>
                  <div className='w-fit mt-10' >
                    <Button type='submit' className={'px-14'} title={'Update Details'} />
                  </div>
                </form>
              }
            </>
            : activeTab == 4 ?
            <> 
            {
              loadingDepartments ?
              <div className="w-full h-full">
                <PageLoading adjustHeight />
              </div> :
              <div className="p-7">
                <div className="flex items-center justify-between gap-5">
                <div className="">
                    <p className='text-base font-semibold' >Departments</p>
                    <p className='text-sm' >Set up and manage your respective departments.</p>
                </div>
                <Button onClick={toggleNewCategory} className={'!text-sm px-5 !w-fit !bg-light_blue'} title={'Add New Department'}  /> 
                </div>
                <div className="grid grid-cols-2 w-full gap-5 mt-7">
                  {
                      departmentss?.map((item,idx) => (
                          <div key={idx} className='border rounded-xl p-5 bg-[#fcfcfd]' >
                              <p className='text-sm font-medium mb-1'>{item.name}</p>
                              <p>{item?.admin_count} user(s)</p>
                              <div className="mt-7 flex items-center justify-end gap-5">
                                  <div className="flex items-center gap-3">
                                      <button onClick={toggleEditCategory}><FaEdit className='opacity-80'  size={16 }/></button>
                                  </div>
                              </div>
                          </div>
                      ))
                  }
              </div>
              </div>
            }
          </>
            : activeTab == 5 ?
            <> 
              {
                loadingSubAdmins ?
                <div className="w-full h-full">
                  <PageLoading adjustHeight />
                </div> :
                <div className="p-7">
                  <div className="flex items-center justify-between gap-5">
                  <div className="">
                      <p className='text-base font-semibold' >User Roles & Permissions</p>
                      <p className='text-sm' >Manage user access levels and roles.</p>
                  </div>
                  <Button onClick={toggleInvite} className={'!text-sm px-5 !w-fit !bg-light_blue'} title={'Invite New User'}  /> 
                  </div>
                  <div className="mt-10">
                    <div className={`mt-5 text-[13px]`}>
                      <div className="header grid grid-cols-9 gap-3 px-5 font-medium">
                          <p className='col-span-3 line-clamp-1' >User Info</p>
                          <p className='line-clamp-2 col-span-2' >Phone Number</p>
                          <p className='line-clamp-2 col-span-3' >Assigned Role</p>
                          <p className='' >Action</p>
                      </div>
                      <div className="data text-text_color mt-3">
                          {
                              subAdmins?.map((item,idx) => (
                              <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} grid items-center grid-cols-9 gap-3 px-5 py-6 font-medium`}>
                                  <div className='col-span-3 overflow-x-hidden flex items-center gap-1' >
                                      <img className='w-8' src={avatar} alt="user" />
                                      <div className="">
                                        <p className='line-clamp-1'>{item.full_name}</p>
                                        <p className='line-clamp-1'>{item.email}</p>
                                      </div>
                                    </div>
                                    <p className='line-clamp-1 col-span-2'>{item.phone_number ?? '-'}</p>
                                    <p className='line-clamp-1 col-span-3'>{item.role}</p>
                                  <button onClick={(e) => handleClickEllipses(e,idx,item)} className='relative z-50' ><FaEllipsisH className='opacity-60 ' />
                                          { idx == activeItem ? 
                                              <div className="z-10 origin-top-right absolute right-5 mt-2 w-40 rounded-md shadow-lg bg-white">
                                                  <div className="bg-white py-2 p-2 w-full relative z-10">
                                                      <button 
                                                          onClick={toggleChangeRole} 
                                                          className="whitespace-nowrap flex items-center gap-2 w-full rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                                                          <BiEdit size={17} /> Change Role
                                                      </button> 
                                                      <button 
                                                          onClick={() => deleteUserMutate({ subadmin_id: selectedAdminId?.admin_id})} 
                                                          className="whitespace-nowrap flex items-center gap-2 text-red-700 w-full rounded-md px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                                                          <BiTrash size={17} /> Delete User
                                                      </button> 
                                                  </div>
                                              </div> : null
                                          }
                                  </button>
                              </div>
                              )) 
                          }

                      </div>
                    </div>
                  </div>
                </div>
              }
          </>
            :activeTab == 2 ? 
            <> 
            {
              loadingCategories ?
              <div className="w-full h-full">
                <PageLoading adjustHeight />
              </div> :
              <div className={`p-5 text-[13px]`}>
                <div className="mb-7 flex items-center justify-between gap-10" >
                  <div className="">
                        <p className='text-base font-semibold' >Test Categories</p>
                        <p className='text-sm' >View/manage test categoreis.</p>
                    </div>
                    <button onClick={toggleNewCategory2} className="justify-center bg-light_blue text-white border rounded-3xl flex  items-center gap-3 font-medium px-10 py-2 text-sm">
                    <span>Add New Category</span>
                </button>

                </div>
                <div className="grid grid-cols-3 gap-5">
                {
                    categories?.map((item,idx) => (
                        <div key={idx} className='border rounded-xl p-5 bg-[#fcfcfd]' >
                            <p className='line-clamp-2 text-base font-semibold'>{item.name}</p>
                            <p>{item.tests_count} Test(s)</p>
                            <div className="mt-7 flex items-center justify-between gap-5">
                                <button onClick={() => navigate(`${item.cat_id}`, { state: { 'category':item } })} className='flex items-center gap-1 font-medium text-primary' >
                                    <span>View Details</span> <BsArrowRight /> 
                                </button>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => { setCatTitle(item.name); toggleEditCategory2(); setCatId(item.cat_id) }}><FaEdit className='opacity-80'  size={16 }/></button>
                                    <button onClick={toggleDeleteCategory}> <FaEyeSlash color='red' size={15 } /></button>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
           </div>
            }
          </>
            :activeTab == 3 ? 
            <> 
            {
              loadingSchedules ?
              <div className="w-full h-full">
                <PageLoading adjustHeight />
              </div> :
              <div className='p-10 pt-7'>
                  <div className="flex justify-between">
                    <div id='patient' className="">
                      <p className='font-semibold mb-1' >Appointment Settings</p>
                      <p className='text-sm' >Set up and manage your appointment timeline and schedules.</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-7 mt-5">
                  <Select value={schedules?.session_interval} onChange={e => setSchedules(prev => ({...prev, session_interval:e.target.value}))} className={'!rounded-3xl'} label={'Session Interval'} options={intervalOptions} icon={<BsClock size={22} />}/>
                  <Select value={schedules?.patient_per_slot} onChange={e => setSchedules(prev => ({...prev, patient_per_slot:e.target.value}))} className={'!rounded-3xl'} label={'No. of Patients allowed per slot'} options={slotOptions} icon={<BsPersonAdd size={22} />}/>
                </div>
                <div className="mt-5 grid gap-6">
                  {
                    schedules?.schedules?.map((item,idx) => (
                      <div key={idx} className="grid grid-cols-10 items-center gap-5">
                        <div className="col-span-2 mt-3 flex items-center gap-1 text-sm">
                          <input onChange={(e) => toggleDay(e.target.value, item.day_id)} defaultChecked={item.status == 'active'} type="checkbox" className='accent-primary' id={item.day} />
                          <label htmlFor={item.day}>{item.day}</label>
                        </div>
                        <div className="col-span-4">
                          <Input 
                          // defaultValue={item.start_time} 
                            value={item.start_time}
                            onChange={e => handleStartChange(e.target.value, item.day_id)}
                          type='time' className='col-span-3 !rounded-3xl !py-2' containerClass='cols-'  label={'Start Time'} />
                        </div>
                        <div className="col-span-4">
                          <Input value={item.end_time} 
                          onChange={e => handleEndChange(e.target.value, item.day_id)}
                          type='time' className='col-span-3 !rounded-3xl !py-2'  label={'End Time'} />
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className='w-fit mt-10' >
                  <Button onClick={updateSchedule} className={'px-14'} title={'Update Schedule'} />
                </div>
              </div>
            }
          </>

            : activeTab == 1 ?
            <form onSubmit={handleSubmitPassword} className=" p-10 pt-7">
              <div className="flex justify-between">
                  <div id='patient' className="">
                    <p className='font-semibold mb-1' >Account & Security</p>
                    <p className='text-sm' >Update your old password.</p>
                  </div>
              </div>
              <div className="mt-10 grid gap-5 max-w-[600px]">
                <div className="">
                    <Input {...getFieldPropsPassword('old_password')} label={'Old Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                    {
                        touchedPassword.old_password && errorsPassword.old_password && <CustomValidationError text={errorsPassword.old_password} />
                    }
                </div>
                <div className="">
                    <Input {...getFieldPropsPassword('password')} label={'New Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                    {
                        touchedPassword.password && errorsPassword.password && <CustomValidationError text={errorsPassword.password} />
                    }
                    <p className='text-xs text-text_color' >Password must contain at least one lowercase letters, uppercase letters, numbers and special symbols</p>
                </div>
                <div className="">
                    <Input {...getFieldPropsPassword('password_confirmation')} label={'Confirm New Password'} type={'password'} placeholder={'************'} icon={<MdOutlineLockPerson size={22} />}/>
                    {
                        touchedPassword.password_confirmation && errorsPassword.password_confirmation && <CustomValidationError text={errorsPassword.password_confirmation} />
                    }
                </div>
              </div>
            <div className='w-fit mt-10' >
              <Button type='submit' className={'px-14'} title={'Update Password'} />
            </div>
            </form>
            : null
          }
          </div>
        </>:
        <div className='p-10 h-[calc(100vh-130px)] flex flex-col justify-center items-center w-full' >
              <img className='-mt-5 w-[120px]' src={success} alt="success" />
              <div className="max-w-[600px] grid justify-center text-center">
                <p className='font-semibold' >You have successfuly referred Emmanuella Bami</p>
                <p className='text-sm max-w-[450px] text-center mx-auto ' >Get ready for a surprise! When your patients make a payment, your rebate will be sent to your wallet within 24 hours. </p>
                  <p className='mt-6' >Copy your referral link below:</p>
                  <div className="flex justify-between items-center gap-10 mt-3 bg-[#f9f9f9] text-light_blue rounded-3xl border px-1 pl-3 py-1">
                    <p className='underline ' >https://www.patients.lifebridge.com?ref=UYBFJK</p>
                    <button className='rounded-3xl text-black font-semibold bg-light_blue px-5 py-2 flex items-center gap-1' >
                      <BiCopy />
                      Copy
                    </button> 
                  </div>
                  <p className='mt-10' >Or Copy Your Invite Code</p>
                    <div className='mx-auto font-semibold text-light_blue px-5 py-2 flex items-center gap-1' >
                      UYBFJK
                      <BiCopy />
                    </div>
                    <div className="mt-10 justify-center flex items-center gap-7">
                      <button className='rounded-3xl text-white font-semibold bg-primary px-10 py-3 flex items-center gap-1' >
                        Share Link
                        <IoIosArrowForward />
                      </button> 
                      <button onClick={close} className='font-semibold' >Cancel</button>
                    </div>
              </div>
        </div>  
      }
      {
        deleteAccount ? 
        <div className='bg-black/50 fixed inset-0 grid place-content-center' >
          <div className="bg-white w-[350px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
            <img className='w-12 m-auto' src={deleteIcon} alt="delete" />
            <p className='text-base font-semibold' >Delete Your Account</p>
            <p className='text-sm' >Are you sure you want to delete your account? This action is irreversible.</p>
            <div className="mt-10 flex items-center gap-5 ">
            <Button onClick={toggleDeleteAccount} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
            <Button onClick={toggleDeleteAccount} className={'!px-5 bg-red-600'} title={'Yes Proceed'} />
            </div>
          </div>
        </div> : null
      }
      {
          newCategory || editCategory ? <div className='bg-black/50 fixed inset-0 grid place-content-center' >
          <div className="bg-white w-[400px] p-5 rounded-xl flex flex-col justify-center text-center gap-3 text-sm">
              <p className='text-base font-semibold' >{newCategory ? 'Add New' : 'Edit'} Department</p>
              <div className="grid gap-5 text-left mt-7">
                  <Input placeholder={'Enter name here..'} icon={<LuTestTube2 className='opacity-80' size={17} />} type={'text'} label={'Department Name'} />
              </div>

              <div className="mt-10 flex items-center gap-5 ">
                  <Button onClick={ newCategory ? toggleNewCategory : toggleEditCategory} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                  <Button onClick={ newCategory ? toggleNewCategory : toggleEditCategory} className={'!px-5 !bg-light_blue text-white'} title={`${newCategory ? 'Add Department' : 'Save Changes'}`} />
              </div>
          </div>
        </div> : null
      }
      {
          newCategory2 || editCategory2 ? <div className='bg-black/50 fixed inset-0 grid place-content-center' >
          <div className="bg-white w-[400px] p-5 rounded-xl flex flex-col justify-center text-center gap-3 text-sm">
            <div className="flex items-center justify-between gap-10">
              <p className='text-base font-semibold' >{newCategory2 ? 'Add New' : 'Edit'} Category</p>
             
            </div>
              <div className="grid gap-5 text-left mt-7">
                  <Input value={catTitle} onChange={e=>setCatTitle(e.target.value)} placeholder={'Enter title here..'} icon={<LuTestTube2 className='opacity-80' size={17} />} type={'text'} label={'Category Title'} />
              </div>

              <div className="mt-10 flex items-center gap-5 ">
                  <Button onClick={ newCategory2 ? toggleNewCategory2 : toggleEditCategory2} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                  <Button disabled={!catTitle} onClick={ newCategory2 ?  ()=> createCategory({name:catTitle,dept_id:"330004"}) : ()=> updateCategory({name:catTitle,cat_id:catId})} className={'!px-5 !bg-black text-white'} title={`${newCategory2 ? 'Add Category' : 'Save Changes'}`} />
              </div>
          </div>
      </div> : null
        }
        
        {
            deleteCategory ? 
               <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                 <div className="bg-white w-[350px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                   <img className='w-12 m-auto' src={deleteIcon} alt="delete" />
                   <p className='text-base font-semibold' >Disable This Category</p>
                   <p className='text-sm' >Are you sure you want to disable this category?</p>
                   <div className="mt-10 flex items-center gap-5 ">
                   <Button onClick={toggleDeleteCategory} className={'!px-5 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                   <Button onClick={toggleDeleteCategory} className={'!px-5 bg-red-600'} title={'Yes Proceed'} />
                   </div>
                 </div>
               </div> : null
        }
      {
        changeRole ? 
            <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                <div className="bg-white w-[400px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                  <p className='font-medium text-base text-center mb-2'>User Permissions</p>
                  <img className='w-12 m-auto' src={stacey} alt="reactivate" />
                  <p className='text-base font-semibold mb-3' >{selectedAdminId?.full_name}</p>
                  <div className="text-left">
                    <Select onChange={e => setSelectedDept(e.target.value)} label={'Roles'} options={departmentsOption} icon={<RiBankCard2Line size={22} />}/>
                  </div>
                  <div className="mt-10 flex items-center gap-3">
                    <Button onClick={toggleChangeRole} className={'!px-4 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                    <Button onClick={() =>changeRoleMutate({
                      subadmin_id:selectedAdminId.admin_id,
                      role_id:selectedDept,
                    })} className={'!px-4 '} title={'Change Role'} />
                  </div>
                </div>
            </div> : null
      }
      {
          invite ? 
              <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                  <div className="bg-white w-[500px] p-5 rounded-2xl flex flex-col justify-center text-center gap-3 text-sm">
                    <img className='w-12 m-auto' src={inviteImg} alt="reactivate" />
                    <p className='text-base font-semibold mb-3' >Invite New User(s)</p>
                    <div className="">
                      {
                        invites.map((item,idx) => (
                          <div key={idx} className="mb-2 flex items-center text-left w-full">
                            <div className="flex-1">
                            <Input value={item.email} onChange={(e) => {
                              const res = invites.map((it,id)=> {
                                if(idx == id) return { ...it, email:e.target.value}
                                else return it
                              })
                              setInvites(res);
                            }} 
                            className={'!py-3 mt-[2.5px] text-left flex-1 min-w-[200px] !rounded-none !rounded-l-3xl '} placeholder={'itshamzy@gmail.com'} />
                            </div>
                            <Select value={item.role_id}
                            onChange={(e) => {
                              const res = invites.map((it,id)=> {
                                if(idx == id) return { ...it, role_id:e.target.value}
                                else return it
                              })
                              setInvites(res);
                            }} 
                             className={'text-left !rounded-none !rounded-r-3xl '} options={departmentsOption} icon={<RiBankCard2Line size={22} />}/>
                             { invites.length >= 2 ? <CgClose onClick={()=>removeUser(idx)} size={18} className='block ml-2 mt-1 cursor-pointer' /> : null}
                          </div>
                        ))
                      }
                    </div>
                    <button onClick={addMoreUser} className='text-sm  to-primary flex items-center gap-1 font-medium'>
                      <BiPlus size={16} /> Add More Users
                    </button>
                    <div className="mt-10 flex items-center gap-3 ">
                      <Button onClick={toggleInvite} className={'!px-4 !bg-white !text-text_color border border-text_color '} title={'Cancel'} />
                      <Button onClick={sendInvites} className={'!px-4 !bg-light_blue'} title={'Send Invite(s)'} />
                    </div>
                  </div>
              </div> : null
      }

      {
         (deletingUser || changingRole || sendingInvite || updatingSchedule || updatingProfile || changingPassword || updatingCat || creatingCat ) ? <LoadingModal /> : null
      }
    </div>
  )
}

export default Profile
