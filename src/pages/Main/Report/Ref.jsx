import React, { useState } from 'react'
import PiechartWithNeedle from '../../../components/Chart/PieChartWithNeedle'
import MultipleBarChart from '../../../components/Chart/MultipleBarCharts'
import PieChart  from '../../../components/Chart/PieChart'
import { MdArrowForward } from 'react-icons/md'
import { useQuery } from 'react-query'
import Dashboard from '../../../services/Dashboard'
import Report from '../../../services/Report'
import PageLoading from '../../../Loader/PageLoading'

const Ref = ({refStat}) => {

    const admin_id = window.localStorage.getItem('referrer-admin-id');
    const [referralStats, setReferralStats] = useState(null);
    const [analysis, setAnaylysis] = useState();
    
    const { isLoading:loadingReferralStats }  = useQuery('referral-stats', () => Dashboard.GetReferralStats(admin_id), {
        onSuccess:res => {
            setReferralStats(res.data);
            }
        });
    
    const { isLoading:loadingAnalysis }  = useQuery('analysis', Report.ComparativeAnalysis, {
        onSuccess:res => {
            setAnaylysis(res.data);
            }
        });
    
    
    if(loadingAnalysis || loadingReferralStats ){
        return <PageLoading adjustHeight={true} />
    }
        
      

  return (
    <div>
      <div className="mt-7 flex gap-5">
        <div className="w-2/5 grid grid-cols-2 gap-5">
          <div className="bg-white rounded-lg px-4 p-5 border col-span-2">
              <p>Total Referrals</p>
              <div className="flex items-center gap-2">
                <p className='font-semibold text-xl my-3'>{refStat?.total_referrals}</p>
                <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-3xl' >+21</p>
              </div>
              <div className="flex items-center justify-between gap-5 mt-5">
                  <p className='text-sm py-0.5' >Compared to last month</p>
                  {/* <button className="text-primary flex items-center gap-1 font-semibold pl-7 text-sm">
                      <span>View All</span>
                      <MdArrowForward />
                  </button> */}
              </div>
          </div>
          <div className="grid col-span-2 grid-cols-2 gap-5">
            <div className="bg-white rounded-lg px-4 p-5 border">
                <p>Total Referrers</p>
                <div className="flex items-center gap-2">
                  <p className='font-semibold text-xl my-3'>{refStat?.total_referrers}</p>
                  <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-3xl' >+21</p>
                </div>
                <div className="flex items-center justify-between gap-5 mt-5">
                    <p className='text-sm py-0.5' >Compared to last month</p>
                    
                </div>
            </div>
            <div className="bg-white rounded-lg px-4 p-5 border">
                <p>Active Referrers</p>
                <div className="flex items-center gap-2">
                  <p className='font-semibold text-xl my-3'>{refStat?.active_referrers}</p>
                  <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-3xl' >+21</p>
                </div>
                <div className="flex items-center justify-between gap-5 mt-5">
                    <p className='text-sm py-0.5' >Compared to last month</p>
                    
                </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex gap-5 w-full">
            <div className="w-full bg-white h-full p-5 rounded-lg border">
              <div className="flex items-center justify-between pb-3 border-b">
                    <p className='font-semibold' >Conversion Rate</p>
              </div>
              <div className="mt-3"> 
                <p className='text-sm' >Metric showing the referrals that are successfully converted into appointments.  </p> 
                <div className="grid grid-cols-2 gap-3 mt-10">
                    <div className="flex flex-col gap-10">
                        <div className="flex items-center gap-2">
                            <p className='font-semibold'>{ refStat?.convertion_rate?.converted_referrals}</p>
                            <div className="text-sm flex items-center gap-1">
                                <span>Converted Referrals</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className='font-semibold'>{ refStat?.convertion_rate?.non_converted_referrals}</p>
                            <div className="text-sm flex items-center gap-1">
                                <span>Non Converted Referrals</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className='font-semibold'>{refStat?.convertion_rate?.total_referrals}</p>
                            <div className="text-sm flex items-center gap-1">
                                <span>Total Referrals</span>
                            </div>
                        </div>
                        
                    </div> 
                    <div className="-ml-10 h-[300px] -mt-20">
                        <PiechartWithNeedle />
                    </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
      <div className="mt-7 flex gap-5">
        <div className="w-3/5">
            <div className="w-full bg-white h-full p-5 rounded-lg border">
                    <div className="flex items-center justify-between pb-3 border-b">
                        <p className='font-semibold' >Comparative Analysis</p>
                    </div>
                    <div className="mt-3"> 
                        <p className='text-sm' >Comparison of patient referrals, booked appointments, and payments made by referrers. </p> 
                        <div className="">
                        <div className="mb-2 flex justify-center items-center text-center gap-10">
                            <div className="">
                                <div className="text-sm flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-[#8884d8]"></div>
                                    <span>Referral</span>
                                </div>
                            </div>
                            <div className="">
                                <div className="text-sm flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-[#82ca9d]"></div>
                                    <span>Appointment</span>
                                </div>
                            </div>
                            <div className="">
                                <div className="text-sm flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-[#22ca9d]"></div>
                                    <span>Payment Made</span>
                                </div>
                            </div>
                        </div> 
                        <div className="-ml-7 w-[110%] h-[300px]">
                            <MultipleBarChart payload={analysis?.data} />
                        </div>
                        </div>
                    </div>
            </div> 
        </div>
        <div className="w-2/5">
          <div className="w-full bg-white h-full p-5 rounded-lg border">
              <div className="flex items-center justify-between pb-3 border-b">
                    <p className='font-semibold' >Referral Stats</p>
              </div>
              <div className="mt-3"> 
                <p className='text-sm' >Analysis of pending & completed referrals. </p> 
                <div className="flex flex-col mt-10">
                    <div className="justify-center items-center text-center -ml-10 h-[250px]">
                        <PieChart
                            completed = {referralStats?.completed} 
                            pending= {referralStats?.pending} 
                            />
                    </div>
                    <div className="flex justify-center items-center text-center gap-10">
                        <div className="">
                            <div className="text-sm flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-[#00C49F]"></div>
                                <span>Completed</span>
                            </div>
                            <p className='pl-'>{referralStats?.completed}</p>
                        </div>
                        <div className="">
                            <div className="text-sm flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-light_blue"></div>
                                <span>Pending</span>
                            </div>
                            <p className='pl-'>{referralStats?.pending}</p>
                        </div>
                    </div> 
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ref
