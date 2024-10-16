import React, { useState } from 'react'
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs'
import { ConvertToNaira } from '../../../utils/Helper'
import avatar from '../../../assets/images/avatar.svg';
import BarChart from '../../../components/Chart/BarChart';
import Report from '../../../services/Report';
import { useQuery } from 'react-query';

const Reb = ({rebateStats}) => {
    const [topEarners, setTopEarners] = useState([]);
    const [earnings, setEarnings] = useState();

    const data = {
        Jan:90,
        Feb: 123,
        Mar:32,
        Apr: 33,
        Jun:50,
        Aug:88
    }

    
    const { isLoading:loadingTopEarners, isRefetching:refetchingTopEarners, refetch:refetchTopEarners}  = useQuery(['top-earners'], Report.RebateTopEarners, {
        onSuccess:res => {
            setTopEarners(res.data.data);
          }
    });

    
    const { isLoading:loadingEarnings, isRefetching:refetchingEarnings, refetch:refetchEarnings}  = useQuery(['earnings-chart'], Report.RebateEarningChart, {
        onSuccess:res => {
            setEarnings(res.data.monthly_earnings);
          }
    });
  
  return (
    <div className='mt-7'>
        <div className="grid grid-cols-10 gap-5">
            <div className="col-span-4 grid gap-5">
                <div className="bg-white rounded-lg p-5 border">
                    <p>Monthly Rebate Earned</p>
                    <p className='font-semibold text-xl my-3'>{ ConvertToNaira(rebateStats?.total_rebate_earned)}</p>
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
                    <p className='font-semibold text-xl my-3'>{ConvertToNaira(rebateStats?.total_payout_settled)}</p>
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
                        topEarners?.map((item,idx) => (
                            <div className='flex items-center justify-between  gap-10'>
                                <div className="flex items-center gap-1">
                                    <p>{idx + 1}.</p>
                                    <img className='w-5 h-5' src={avatar} alt="avatar" />
                                    <p>{item.doctor_name}</p>
                                </div>
                                <p className='font-semibold' >{ConvertToNaira(item?.total_earned)}</p>
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
                        <BarChart data = {earnings} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reb
