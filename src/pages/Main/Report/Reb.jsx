import React from 'react'
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs'
import { ConvertToNaira } from '../../../utils/Helper'
import avatar from '../../../assets/images/avatar.svg';
import BarChart from '../../../components/Chart/BarChart';

const Reb = () => {
    const data = {
        Jan:90,
        Feb: 123,
        Mar:32,
        Apr: 33,
        Jun:50,
        Aug:88
    }
  return (
    <div className='mt-7'>
        <div className="grid grid-cols-10 gap-5">
            <div className="col-span-4 grid gap-5">
                <div className="bg-white rounded-lg p-5 border">
                    <p>Monthly Rebate Earned</p>
                    <p className='font-semibold text-xl my-3'>{ ConvertToNaira(923110)}</p>
                    <div className="flex text-sm items-center gap-1 mt-5">
                        {
                         true == 'increase' ?
                              <div className="text-green-500 font-medium flex items-center gap-1">
                                <BsArrowUpRight color='' />
                                <span className='' >39%</span>
                            </div> :
                              <div className="text-red-500 font-medium flex items-center gap-1">
                                <BsArrowDownRight color='' />
                                <span className='' >39%</span>
                            </div> 
                        }
                        <span>vs last month</span>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-5 border">
                    <p>Total Payouts Settled</p>
                    <p className='font-semibold text-xl my-3'>₦3,020</p>
                    <div className="flex text-sm items-center gap-1 mt-5">
                        <span>Payment</span>
                        <div className="text-green-500 font-medium flex items-center gap-1">
                            <span className='' >Every Friday</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-white h-full p-5 rounded-lg border col-span-6">
              <div className="flex items-center justify-between pb-3 border-b">
                    <p className='font-semibold' >Top 10 Rebate Earners</p>
              </div>
              <div className="mt-3"> 
                <p className='text-sm' >Ranking of top referrers based on rebate earnings. </p> 
                <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-5 text-sm">
                    {
                        [1,2,3,4,5,6,7,8,9,10].map(item => (
                            <div className='flex items-center justify-between  gap-10'>
                                <div className="flex items-center gap-1">
                                    <p>{item}.</p>
                                    <img className='w-5 h-5' src={avatar} alt="avatar" />
                                    <p>Chester Grimes</p>
                                </div>
                                <p className='font-semibold' >{ConvertToNaira(203933)}</p>
                            </div>
                        ))
                    }
                </div>
              </div>
            </div>
        </div>
        <div className="mt-5">
          <div className="flex-1 rounded-lg border border-custom_gray bg-white">
                <div className="flex items-center justify-between p-3 border-b">
                    <p className='font-semibold' >Rebate Earning</p>
                   
                </div>
                <div className="p-5">
                    <p className='text-sm' >Earning history displayed per month</p>
                    <div className="mt-5 -ml-10 min-w-[400px] h-[250px]">
                        <BarChart data = {data} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reb
