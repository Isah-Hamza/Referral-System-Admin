import React, { useState } from 'react'
import Select from '../../../components/Inputs/Select'
import { MdArrowForward } from 'react-icons/md';
import { PieChart } from 'recharts';

const Report = () => {

    const [activeTab, setActiveTab] = useState(0);
    const durations = [
        {
            label:'This month',
            value:'month',
        }
    ]

    const tabs = ['Referrers & Referrals', 'Appointments','Rebates', 'Tests & Results']

  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center text-sm bg-[#ededed] rounded-3xl">
            {
                tabs.map((item,idx) => <button onClick={() => setActiveTab(idx)} className={`${activeTab == idx && 'bg-primary text-white rounded-3xl'} min-w-[120px] py-3 px-3`} >{item}</button>)
            }
        </div>
        <Select className={'min-w-[120px]'} options={durations} />
      </div>
      <div className="mt-7 flex">
        <div className="w-2/5 grid grid-cols-2 gap-5">
          <div className="bg-white rounded-lg px-4 p-5 border col-span-2">
              <p>Total Referrals</p>
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
          <div className="grid col-span-2 grid-cols-2 gap-5">
            <div className="bg-white rounded-lg px-4 p-5 border">
                <p>Total Referrers</p>
                <div className="flex items-center gap-2">
                  <p className='font-semibold text-xl my-3'>239</p>
                  <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-3xl' >+21</p>
                </div>
                <div className="flex items-center justify-between gap-5 mt-5">
                    <p className='text-sm py-0.5' >Compared to last month</p>
                    
                </div>
            </div>
            <div className="bg-white rounded-lg px-4 p-5 border">
                <p>Active Referrers</p>
                <div className="flex items-center gap-2">
                  <p className='font-semibold text-xl my-3'>239</p>
                  <p className='bg-[#C9E6FF] px-3 text-sm py-0.5 rounded-3xl' >+21</p>
                </div>
                <div className="flex items-center justify-between gap-5 mt-5">
                    <p className='text-sm py-0.5' >Compared to last month</p>
                    
                </div>
            </div>
          </div>
        </div>
        <div className="w-3/5">
        <div className="flex gap-5 mt-5">
                { department !== 'Rebate Unit' ? <div className="bg-white min-w-[35%] h-full p-5 rounded-lg border">
                    <div className="flex items-center justify-between pb-3 border-b">
                         <p className='font-semibold' >Referrals Stats</p>
                    </div>
                    <div className="mt-3"> 
                          <p className='text-sm' >Analysis of daily pending & completed tests </p> 
                        <div className="flex flex-col">
                            <div className=" -ml-10 h-[250px]">
                                <PieChart 
                                    completed = {44} 
                                    pending= {24} 
                                />
                            </div>
                            <div className="flex justify-center items-center text-center gap-10">
                                <div className="">
                                    <div className="text-sm flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-[#00C49F]"></div>
                                        <span>Completed</span>
                                    </div>
                                    <p className='pl-'>{ (department == 'Test Unit' || department == 'Laboratory Services' || department == 'Radiology' || department == 'Result Unit') ? testStats?.percentage?.completed_tests : referralStats?.completed}</p>
                                </div>
                                <div className="">
                                    <div className="text-sm flex items-center gap-1">
                                        <div className="w-2 h-2 rounded-full bg-light_blue"></div>
                                        <span>Pending</span>
                                    </div>
                                    <p className='pl-'>{(department == 'Test Unit' || department == 'Laboratory Services' || department == 'Radiology' || department == 'Result Unit') ? testStats?.percentage?.pending_tests : referralStats?.pending}</p>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div> : null}
            </div> 
        </div>
      </div>
    </div>
  )
}

export default Report
