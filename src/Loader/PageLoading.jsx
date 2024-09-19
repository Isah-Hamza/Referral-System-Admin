import React from 'react'
import spinner from '../assets/images/loading.gif';

const PageLoading = ({ adjustHeight }) => {
  return (
    <div className={`w-full h-[calc(100vh-0px)] text-center text-sm grid place-content-center ${adjustHeight && 'h-[calc(100vh-125px)]'}`}>
      <div className="flex items-center gap-2">
        <img className='w-10' src={spinner} />
      </div>
    </div>
  )
}

export default PageLoading
