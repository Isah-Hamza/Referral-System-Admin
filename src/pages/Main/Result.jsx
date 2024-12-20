import React, { useEffect, useRef, useState } from 'react'
import Input from '../../components/Inputs'
import { BiCopy, BiCopyAlt, BiPhoneIncoming, BiPrinter, BiSearch, BiTestTube, BiUser, BiZoomOut } from 'react-icons/bi'
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
import { useMutation, useQuery } from 'react-query'
import { ConvertToNaira, errorToast, successToast } from '../../utils/Helper'
import LoadingModal from '../../Loader/LoadingModal'
import PageLoading from '../../Loader/PageLoading'

const Results = () => {

    const [isPdf, setIsPdf] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const query = useLocation().search.split('=')[1];
    const [acitveTab, setActiveTab] = useState(0);
    const [date,setDate] = useState();
    const [uploadedResults, setUploadedResults] = useState([]);
    const [awaitingResults, setAwaitingResults] = useState([]); 
    const [page,setPage] = useState(1);
    const [details, setDetails] = useState({});
    const [search, setSearch] = useState('');


    const [viewDetails, setViewDetails] = useState(false);
    const [uploadTest, setUploadTest] = useState(false);
    const [viewTest, setViewTest] = useState(false);

    const toggleViewDetails = () => setViewDetails(!viewDetails);
    const toggleUploadTest = () => setUploadTest(!uploadTest);
    const toggleViewTest = () => setViewTest(!viewTest);
    const [id,setId] = useState(0);
    const [item, setItem] = useState(null);
    const [file, setFile] = useState(null);
    
    const selectedTests = [
        {
          type:details?.assigned_test,
          category:details?.test_category,
          amount: ConvertToNaira(Number(details?.test_amount)),
        },
    ]

         
    const { isLoading:loadingAwaiting, isRefetching:refetchingAwaiting, refetch:refetchAwaiting}  = useQuery('awaiting', () => Result.GetAwaitingResults({ page }), {
        cacheTime:0,
        keepPreviousData:false,
        staleTime:0,
        onSuccess:res => {
            setAwaitingResults(res.data.awaitingResults);
            }
        });
         
    const { isLoading:loadingUploaded, isRefetching:refetchingUploaded, refetch:refetchUploaded}  = useQuery('uploaded', () => Result.GetUploadedResults({ page }), {
        cacheTime:0,
        keepPreviousData:false,
        staleTime:0,
        onSuccess:res => {
            setUploadedResults(res.data.uploadedResults);
            }
        });
                
    const { isLoading:loadingResultDetails, mutate:viewResult}  = useMutation(Result.GetResult, {
        onSuccess:res => {
            setDetails(res.data.resultDetails);
            }
        });
        
                
    const { isLoading:uploadingResult, mutate:uploadResult}  = useMutation(Result.UploadResult, {
        onSuccess:res => {
            successToast(res.data.message);
            toggleUploadTest();
            refetchAwaiting();
            refetchUploaded();
            setViewDetails(false);
            viewResult(id);
            },
        onError:e => {
            errorToast(e.errors.result_file[0]);
        }
        });

            
    const sendResult = () => {
        const formData = new FormData();
        formData.append('result_id', id),
        formData.append('result_file', file),
        uploadResult(formData);
    }

    const handlePrint = (remoteFileUrl) => {
        // Create a new window or iframe for printing the file
        const printWindow = window.open(remoteFileUrl, '_blank');
    
        // Wait for the content to load, then trigger the print dialog
        printWindow.onload = () => {
          printWindow.print(); // Trigger the print dialog
          printWindow.close(); // Close the print window after printing
        };
      };

    
    const { isLoading:searchingAwaiting, mutate:searchAwaiting }  = useMutation(Result.SearchAwaitingResults, {
        onSuccess:res => {
            setAwaitingResults(res.data.awaitingResults);
            }
        });
    
    const { isLoading:searchingUploaded, mutate:searchUploaded }  = useMutation(Result.SearchUploadedResults, {
        onSuccess:res => {
            setUploadedResults(res.data.uploadedResults);
            }
        });

        
    const handleSearch = (e) => {
        e.preventDefault();
        acitveTab == 0 ? searchAwaiting({query:search}) : searchUploaded({query:search})
    }

    useEffect(() => {
        if(id)   viewResult(id);
    }, [id])


    if(loadingAwaiting || loadingUploaded || searchingAwaiting || searchingUploaded){
        return <PageLoading adjustHeight={true} />
    }

    

  return (
   <div className='mt-3 w-full border border-custom_gray rounded-xl bg-white mb-7'>
        <div className="relative border-b p-3 flex justify-between items-center">
            <div className={`transition-all duration-300 absolute h-0.5 w-[132px] bg-primary left-5 bottom-0 ${acitveTab == 1 && '!left-[190px] w-52'} ${acitveTab == 2 && '!left-[260px] w-40'} `}></div>
            <div className="flex gap-14 text-sm pl-5">
                {
                    ['Awaiting Results', 'Uploaded Results'].map((item, idx) => (
                        <button onClick={() => {setActiveTab(idx); setSearch('')}} className={`opacity-70  ${acitveTab==idx && 'font-semibold opacity-100'}`} key={idx}>{item}</button>
                    ))
                }
            </div>
            <form onSubmit={handleSearch} className="flex items-center gap-4">
                <Input value={search} onChange={e => setSearch(e.target.value)} className={'!rounded-3xl !py-2.5 !min-w-[300px]'} placeholder={'Type user name here...'} icon={<BiSearch size={20} className='text-custom_gray' />} />
            </form>
        </div>
        <div className={`mt-5 text-[13px] hidden ${(acitveTab == 0 ) && '!block'}`}>
            <div className="header grid grid-cols-11 gap-3 px-5 font-medium">
                <p className='col-span-2 line-clamp-1' >Full Name</p>
                <p className='col-span-2 line-clamp-1' >Assigned Test</p>
                <p className='col-span-2 line-clamp-1' >Test Date</p>
                <p className='col-span-2 line-clamp-1' >Due Date</p>
                <p className='col-span-2' >Status</p>
                <p className='' >Action</p>
            </div>
            <div className="data text-text_color mt-3">
                {
                    awaitingResults?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-11 gap-3 px-5 py-6 font-medium`}>
                    <p className='col-span-2 line-clamp-1' >{item.full_name}</p>
                    <p className='col-span-2 line-clamp-1' >{item.assigned_test}</p>
                    <p className='col-span-2 line-clamp-1' >{moment(item.test_date).format('lll')}</p> 
                    <p className='col-span-2 line-clamp-1' >{moment(item.due_date).format('lll')}</p>
                    <p className='col-span-2 line-clamp-1' >
                        {item.due_status == 'Far' ? <div className='bg-green-500 w-fit text-white p-1.5 px-3 rounded-3xl font-medium' >Far</div> : null}
                        {item.due_status == 'Over Due' ? <div className='bg-red-500 w-fit text-white p-1.5 px-3 rounded-3xl font-medium' >Over Due</div> : null}
                        {item.due_status == 'Due Soon' ? <div className='bg-yellow-400 w-fit text-white p-1.5 px-3 rounded-3xl font-medium' >Due Soon</div> : null}
                    </p> 
                    <p onClick={() =>{ setId(item.result_id); toggleViewDetails();}} className='font-semibold text-light_blue cursor-pointer' >View Details</p>
                    </div>
                    )) 
                }

            </div>
        </div>
        <div className={`mt-5 text-[13px] hidden ${(acitveTab == 1 ) && '!block'}`}>
            <div className="header grid grid-cols-10 gap-3 px-5 font-medium">
                <p className='col-span-2 line-clamp-1' >Full Name</p>
                <p className='col-span-2 line-clamp-1' >Assigned Test</p>
                <p className='col-span-2 line-clamp-1' >Test Date</p>
                <p className='col-span-2 line-clamp-1' >Uploaded Date/Time</p>
                <p className='col-span-2' >Action</p>
            </div>
            <div className="data text-text_color mt-3">
                {
                    uploadedResults?.map((item,idx) => (
                    <div key={idx} className={`${idx % 2 !== 1 && 'bg-[#f9f9f9]'} header grid grid-cols-10  gap-3 px-5 py-6 font-medium`}>
                    <p className='col-span-2 line-clamp-1' >{item.full_name}</p>
                    <p className='col-span-2 line-clamp-1' >{item.assigned_test}</p>
                    <p className='col-span-2 line-clamp-1' >{moment(item.test_date).format('lll')}</p> 
                    <p className='col-span-2 line-clamp-1' >{moment(item.uploaded_date).format('lll')}</p> 
                    <p onClick={() =>{ setId(item.result_id); toggleViewDetails();}} className='col-span-2 font-semibold text-light_blue cursor-pointer' >View Details</p>
                    </div>
                    )) 
                }

            </div>
        </div>
        {viewDetails ? <div className="fixed inset-0 bg-black/70 flex justify-end">
            {
                loadingResultDetails ?
                <div className="bg-white w-[500px] max-h-screen overflow-y-auto">
                        <PageLoading />
                    </div> :
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
                        <p className='text-center font-medium' >{details?.full_name}</p>
                        <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
                            <div className="flex flex-col justify-center text-center">
                                <div className="mx-auto mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                    <MdOutlineEmail />
                                </div>
                                <p className='font-semibold' >Email Address</p>
                                <p className='line-clamp-1 underline text-light_blue' >{details?.email}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center text-center">
                                <div className="mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                    <BiPhoneIncoming />
                                </div>
                                <p className='font-semibold' >Phone Number</p>
                                <p className='line-clamp-1' >{details?.phone_number}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center text-center">
                                <div className="mb-2 text-center w-6 h-6 rounded-full grid place-content-center bg-custom_gray">
                                    <BiUser />
                                </div>
                                <p className='font-semibold' >Gender</p>
                                <p className='line-clamp-1' >{details?.gender}</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 text-sm">
                        <p className='font-semibold text-base' >Test Type</p>
                        <div className="mt-3 grid gap-2">
                            {
                                selectedTests.map((item,idx) => (
                                    <div key={idx} className="bg-white rounded-md border p-3 text-sm">
                                        <div className="mb-2 font-semibold flex gap-2 justify-between items-center">
                                            <p className='' >{item.type}</p>
                                            {/* <p className='text-3xl opacity-70' >0{idx + 1}</p> */}
                                        </div>
                                        <div className="flex text-sm items-center justify-between gap-2">
                                            <p className='' >{item.category}</p>
                                            {/* <p className='text-base font-medium' >{item.amount}</p> */}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-5 gap-y-7 text-sm">
                            <div className="flex flex-col ">
                                <p className='font-medium' >Patient Age</p>
                                <p className=' ' >{details?.age}</p>
                            </div>
                            <div className="flex flex-col ">
                                <p className='font-medium' >Test Date</p>
                                <p className=' ' >{ moment(details?.test_date).format('lll')}</p>
                            </div>
                            {/* <div className="flex flex-col ">
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
                            </div> */}
                            <div className="flex flex-col">
                                <p className='font-medium' >Result Status</p>
                                <p className='' >{details?.result_status}</p>
                            </div>
                            
                        </div>
                        { acitveTab == 1 ? <div className="mt-10 text-sm mb-16 ">
                            <p className='font-semibold text-base' >Uploaded Results</p>
                            <div className="my-7 mt-5 grid grid-cols-3 gap-2 gap-y-4">
                                <div key={item}>
                                    <div onClick={() => {toggleViewDetails(); toggleViewTest()}} className="cursor-pointer group relative overflow-hidden rounded-lg">
                                        <div className="group-hover:grid absolute inset-0 bg-black/50 hidden place-content-center">
                                            <BiZoomOut size={20} className='text-white' />
                                        </div>
                                        {
                                            details?.result_image?.endsWith('.pdf') ? 
                                            <div className='min-h-[150px] grid place-content-center text-center bg-black/25' > Click To preview PDF </div> :
                                            <img className='min-h-[100px]' src={details?.result_image} alt="preview" /> 
                                        }
                                            {/* <button className="shadow-md absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white border grid place-content-center">
                                            <BsFillTrashFill size={15} color='red' />
                                        </button>  */}
                                    </div>
                                </div>
                            </div> 
                        </div> : 
                        <div className="grid  gap-5 mt-20">
                            <input
                            onChange={(e) => {
                                setFile(e.target.files[0]);
                                if(e.target?.files[0]?.type == 'application/pdf')
                                    setIsPdf(true)
                                else setIsPdf(false);
                                
                                toggleUploadTest(); 
                                toggleViewDetails();
                                if (e.target.files.length > 0) {
                                    var reader = new FileReader();
                                    reader.onload = function(){
                                    setPreviewUrl(reader.result);
                                    };
                                    reader.readAsDataURL(e.target.files[0]);
                                
                                    // previewImage.style.display = 'block';
                                }
                            }} 
                            hidden accept='image/png,image/jpg,image/jpeg,image/webp,.pdf' type="file" name="file" id="file" />
                            <label htmlFor='file' 
                            className="cursor-pointer justify-center bg-light_blue text-white border rounded-3xl flex  items-center gap-3 font-medium pl-7  py-2 text-sm">
                                <BiTestTube size={18} />
                                <span>Upload Test Result</span>
                            </label>
                        </div>}
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
            }
        </div> : null}

        {
           uploadTest ? <div className='bg-black/50 fixed inset-0 grid place-content-center' >
                <div className="relative grid grid-cols-3 overflow-hidden bg-[#ededed] w-[1000px] max-h-[95vh] my-auto  rounded-2xl gap-3 text-sm">
                    <div className="col-span-2 max-h-[inherit] px-7 py-14 min-w-[200px] min-h-[300px]">
                     {
                        isPdf ? 
                        <embed
                            src={previewUrl}
                            width="100%"
                            height="500px"
                            type="application/pdf"
                            style={{ border: '1px solid #ccc' }}
                            />
                        :
                        <img className='w-full h-full' src={previewUrl ?? preview} alt="preview" />
                     }
                    </div>
                    <div className="bg-white flex flex-col overflow-y-auto">
                        <div className="p-3 flex items-center gap-5 justify-between">
                            {/* <p className='font-semibold opacity-90 '>Uploaded Tests</p> */}
                            {/* <button className='underline'>upload more</button> */}
                        </div>

                        <div className="mt-auto p-5 grid grid-cols-2 gap-5">
                            <button onClick={toggleUploadTest} className="justify-center border rounded-3xl flex items-center gap-2 font-medium py-2 text-sm">
                                <span>Close</span>
                            </button>
                            <button onClick={sendResult} className="justify-center bg-light_blue text-white border rounded-3xl flex items-center gap-2 font-medium py-2 text-sm">
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
                <button onClick={toggleViewTest} className="max-h-[30px] ml-auto flex items-center gap-1 border-b">
                <CgClose color='white' />
                    close</button>
                    {
                        details?.result_image?.endsWith('.pdf') ? 
                        <div className='mx-auto'>
                        <embed
                        src={details?.result_image}
                        width="700px"
                        height="500px"
                        type="application/pdf"
                        style={{ border: '1px solid #ccc' }}
                        /> </div>:
                        <img className='border rounded-md flex-1 max-h-[80dvh] min-h-[200px] min-w-[200px] bg-gray-100 mx-auto mb-5 ' src={details?.result_image} alt="preview" />       
                    }
                {/* <button onClick={() => downloadFile(details?.result_image,`${details?.full_name} Test Result`)} className="-mt-10 mb-5 mx-auto bg-primary px-7 p-2 rounded-3xl flex items-center gap-1 text-white"> <FcDownload color='white' /> Download Result</button>             */}
                <button onClick={() => handlePrint(details?.result_image)} className="max-h-[45px] border -mt-8 mb-5 mx-auto bg-primary px-7 p-2 rounded-3xl flex items-center gap-1 text-white"> <BiPrinter color='white' /> Print</button>            
            </div> : null
        }

        {
            (uploadingResult) ? <LoadingModal /> : null
        }

    </div> 
  )
}

export default Results
