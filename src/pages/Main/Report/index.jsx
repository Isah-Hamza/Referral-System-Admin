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
      {
        activeTab == 0 ? <Ref /> :
        activeTab == 1 ? <Appoint /> : 
        activeTab == 2 ? <Reb /> :
        activeTab == 3 ? <TestAndResult /> :
        null
      }
      
    </div>
  )
}

export default Report
