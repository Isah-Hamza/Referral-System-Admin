import React from 'react'
import { MdArrowForward } from 'react-icons/md'
import MultipleBarChart from '../../../components/Chart/MultipleBarCharts'
import MultipleBarChartWeekly from '../../../components/Chart/MultipleBarChartsWeekly'
import SampleAreaChart from '../../../components/Chart/AreaChart'
import PieChart from '../../../components/Chart/PieChart'
import NoShowPieChart from '../../../components/Chart/NoShowPieChart'

const Appoint = () => {
  return (
    <div className='mt-7'>
      <div className="grid grid-cols-11 gap-5">
        <div className="bg-white rounded-lg px-4 p-5 border col-span-5">
              <p>Scheduled</p>
              <div className="flex items-center gap-2">
                <p className='font-semibold text-xl my-3'>239</p>
                <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-3xl' >+21</p>
              </div>
              <div className="flex items-center justify-between gap-5 mt-5">
                  <p className='text-sm py-0.5' >Compared to last month</p>
                  <button className="text-primary flex items-center gap-1 font-semibold pl-7 text-sm">
                      <span>View All</span>
                      <MdArrowForward />
                  </button>
              </div>
        </div>
        <div className="bg-white rounded-lg px-4 p-5 border col-span-3">
              <p>Completed</p>
              <div className="flex items-center gap-2">
                <p className='font-semibold text-xl my-3'>239</p>
                <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-3xl' >+21</p>
              </div>
              <div className="flex items-center justify-between gap-5 mt-5">
                  <p className='text-sm py-0.5' >Compared to last month</p>
              </div>
        </div>
        <div className="bg-white rounded-lg px-4 p-5 border col-span-3">
              <p>Canceled</p>
              <div className="flex items-center gap-2">
                <p className='font-semibold text-xl my-3'>239</p>
                <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-3xl' >+21</p>
              </div>
              <div className="flex items-center justify-between gap-5 mt-5">
                  <p className='text-sm py-0.5' >Compared to last month</p>
              </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="w-full bg-white h-full p-5 rounded-lg border">
          <div className="flex items-center justify-between pb-3 border-b">
              <p className='font-semibold' >Appointment Trend</p>
          </div>
          <div className="mt-3"> 
              <p className='text-sm' >Graphs showing trends in appointment scheduling, completion, and cancellations over time. </p> 
              <div className="mt-5">
              <div className="mb-2 flex items-center text-center gap-10">
                  <div className="">
                      <div className="text-sm flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-[#00C49F]"></div>
                          <span>Schedules </span>
                      </div>
                  </div>
                  <div className="">
                      <div className="text-sm flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-light_blue"></div>
                          <span>Completion</span>
                      </div>
                  </div>
                  <div className="">
                      <div className="text-sm flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                          <span>Cancellation</span>
                      </div>
                  </div>
              </div> 
              <div className="-ml-5 w-[100%] h-[300px]">
                  <MultipleBarChartWeekly />
              </div>
              </div>
          </div>
        </div> 
      </div>
      <div className="mt-5 grid gap-5 grid-cols-11">
        <div className="col-span-6">
          <div className="w-full bg-white h-full p-5 rounded-lg border">
            <div className="flex items-center justify-between pb-3 border-b">
                <p className='font-semibold' >No-Show Rate</p>
            </div>
            <div className="mt-3"> 
                <p className='text-sm' >Percentage of missed appointments compared to the total appointments. </p> 
                <div className="w-full h-[300px] mt-5">
                  <SampleAreaChart />
                </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white h-full p-5 rounded-lg border col-span-5">
              <div className="flex items-center justify-between pb-3 border-b">
                    <p className='font-semibold' >No-Show Analysis</p>
              </div>
              <div className="mt-3"> 
                <p className='text-sm' >Analysis of no-show patterns and potential causes. </p> 
                <div className="flex gap-7 mt-10">
                    <div className="justify-center items-center text-center min-w-[200px] h-[250px]">
                        <NoShowPieChart
                            completed = {40} 
                            pending= { 50} 
                            />
                    </div>
                    <div className="flex flex-col  gap-5">
                        <div className="">
                            <div className="text-sm flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-[#00C49F]"></div>
                                <span>Emergency (Family <br /> and Personal)</span>
                            </div>
                            <p className='pl-3'>{ 40}</p>
                        </div>
                        <div className="">
                            <div className="text-sm flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-light_blue"></div>
                                <span>Double Booking </span>
                            </div>
                            <p className='pl-3'>{24}</p>
                        </div>
                        <div className="">
                            <div className="text-sm flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-light_blue"></div>
                                <span>Work Conflict </span>
                            </div>
                            <p className='pl-3'>{24}</p>
                        </div>
                        <div className="">
                            <div className="text-sm flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-light_blue"></div>
                                <span>Patient Forgot </span>
                            </div>
                            <p className='pl-3'>{19}</p>
                        </div>
                        <div className="">
                            <div className="text-sm flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-light_blue"></div>
                                <span>Long Wait Times </span>
                            </div>
                            <p className='pl-3'>{52}</p>
                        </div>
                    </div> 
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Appoint