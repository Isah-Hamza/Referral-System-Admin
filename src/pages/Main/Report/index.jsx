import React, { useState } from 'react'
import Select from '../../../components/Inputs/Select'
import { MdArrowForward } from 'react-icons/md';
import PiechartWithNeedle from '../../../components/Chart/PieChartWithNeedle';
import MultipleBarChart from '../../../components/Chart/MultipleBarCharts';
import PieChart from '../../../components/Chart/PieChart';
import Ref from './Ref';
import Appoint from './Appoint';
import Reb from './Reb';
import TestAndResult from './TestAndResult';
import ReportService from '../../../services/Report';
import { useQuery } from 'react-query';

const Report = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [refStat, setRefStat] = useState();
    const [rebateStats, setRebateStats] = useState();
    const [appointmentStat, setAppointmentStat] = useState();
    const [appointmentTrend, setAppointmentTrend] = useState();

    const durations = [
        {
            label:'This month',
            value:'month',
        }
    ]

    const tabs = ['Referrers & Referrals', 'Appointments','Rebates', 'Tests & Results']

    const { isLoading:loadingRef, isRefetching:refetchingRef, refetch:refetchRef}  = useQuery(['ref-stats'], ReportService.RefStats, {
      onSuccess:res => {
          setRefStat(res.data);
        }
  });

    const { isLoading:loadingAppointmentStats, isRefetching:refetchingAppointmentStats, refetch:refetchAppointemntStats}  = useQuery(['appointment-stats'], ReportService.AppointmentStats, {
      onSuccess:res => {
          setAppointmentStat(res.data.appointments);
        }
  });

    const { isLoading:loadingAppointmentTrend, isRefetching:refetchingAppointmentTrend, refetch:refetchAppointemntTrend}  = useQuery(['appointment-trend'], ReportService.AppointmentTrends, {
      onSuccess:res => {
          setAppointmentTrend(res.data.data);
        }
  });

    const { isLoading:loadingRebateStats, isRefetching:refetchingRebateStats, refetch:refetchRebateStats}  = useQuery(['rebate-stats'], ReportService.RebateStats, {
      onSuccess:res => {
          setRebateStats(res.data);
        }
  });



  return (
    <div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center text-sm bg-[#ededed] rounded-3xl">
            {
                tabs.map((item,idx) => <button key={idx} onClick={() => setActiveTab(idx)} className={`${activeTab == idx && 'bg-primary text-white rounded-3xl'} min-w-[120px] py-3 px-3`} >{item}</button>)
            }
        </div>
        <Select className={'min-w-[120px]'} options={durations} />
      </div>
      {
        activeTab == 0 ? <Ref {...{refStat,}} /> :
        activeTab == 1 ? <Appoint {...{appointmentStat, appointmentTrend}} /> : 
        activeTab == 2 ? <Reb {...{rebateStats}}/> :
        activeTab == 3 ? <TestAndResult /> :
        null
      }
      
    </div>
  )
}

export default Report
