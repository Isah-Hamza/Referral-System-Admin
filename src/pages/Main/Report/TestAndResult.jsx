import React, { useState } from 'react'
import PieChart from '../../../components/Chart/PieChart'
import BarChart from '../../../components/Chart/BarChart'
import SampleAreaChart from '../../../components/Chart/AreaChart'
import Report from '../../../services/Report'
import { useQuery } from 'react-query'
import PageLoading from '../../../Loader/PageLoading'

const TestAndResult = ({testStats}) => {

    const [completion, setCompletion] = useState();


    const data = {
        Jan:90,
        Feb: 123,
        Mar:32,
        Apr: 33,
        Jun:50,
        Aug:88
    }

    
    const { isLoading:loadingCompletion, isRefetching:refetchingCompletion, refetch:refetchCompletion}  = useQuery(['completion'], Report.TestCompletion, {
        onSuccess:res => {
            setCompletion(res.data.monthly_tests);
          }
    });
  

    if(loadingCompletion ){
        return <PageLoading adjustHeight={true} />
     }
    
  

  return (
    <div>
        <div className="mt-7 flex gap-5">
            <div className="w-2/5 grid grid-cols-2 gap-5">
                <div className="grid col-span-2 grid-cols-2 gap-5">
                    <div className="bg-white rounded-lg px-4 p-5 border">
                        <p>Completed Tests</p>
                        <div className="flex items-center gap-2">
                        <p className='font-semibold text-xl my-3'>{testStats?.total_completed_tests}</p>
                        {/* <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-3xl' >+21</p> */}
                        </div>
                        <div className="flex items-center justify-between gap-5 mt-5">
                            {/* <p className='text-sm py-0.5' >Compared to last month</p> */}
                            
                        </div>
                    </div>
                    <div className="bg-white rounded-lg px-4 p-5 border">
                        <p>Average Test Duration</p>
                        <div className="flex items-center gap-2">
                            <p className='font-semibold text-xl my-3'>{testStats?.average_test_duration}</p>
                        </div> 
                    </div>
                </div>
                <div className="bg-white rounded-lg px-4 p-5 border col-span-2">
                    <p>Average Result Delivery Time</p>
                    <div className="flex items-center gap-2">
                        <p className='font-semibold text-xl my-3'>{testStats?.average_result_delivery_time}</p>
                    </div>
                   
                </div>
            </div>
            <div className="flex-1">
                <div className="w-full bg-white h-full p-5 rounded-lg border">
                    <div className="flex items-center justify-between pb-3 border-b">
                            <p className='font-semibold' >Result Status</p>
                    </div>
                    <div className="mt-3"> 
                        <p className='text-sm' >Current status of delivered test results. </p> 
                        <div className="flex">
                            <div className="justify-center items-center text-center -ml-10 w-[300px] h-[250px]">
                                <PieChart
                                    completed = {testStats?.result_status?.completed_results} 
                                    pending= {testStats?.result_status?.pending_results} 
                                    />
                            </div>
                            <div className="flex justify-center items-center text-center gap-10">
                                <div className="">
                                    <div className="text-sm flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-[#00C49F]"></div>
                                        <span>Completed</span>
                                    </div>
                                    <p className='pl-'>{testStats?.result_status?.completed_results}</p>
                                </div>
                                <div className="">
                                    <div className="text-sm flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-light_blue"></div>
                                        <span>Pending</span>
                                    </div>
                                    <p className='pl-'>{testStats?.result_status?.pending_results}</p>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-5">
            <div className="flex-1 rounded-lg border border-custom_gray bg-white">
                <div className="flex items-center justify-between p-3 border-b">
                    <p className='font-semibold' >Test Completion</p>
                </div>
                <div className="p-5">
                    <p className='text-sm' >Trends in the number of tests performed over a specified period.</p>
                    <div className="mt-5 -ml-10 min-w-[400px] h-[250px]">
                        <BarChart data = {completion} />
                    </div>
                </div>
            </div>
            <div className="">
            <div className="w-full bg-white h-full p-5 rounded-lg border">
                <div className="flex items-center justify-between pb-3 border-b">
                    <p className='font-semibold' >Test Efficiency</p>
                </div>
                <div className="mt-3"> 
                    <p className='text-sm' >Analysis of the efficiency of test processing across different departments. </p> 
                    <div className="w-full h-[220px] mt-5">
                    <SampleAreaChart />
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default TestAndResult
