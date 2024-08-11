import React from 'react'
import { IoIosInformationCircleOutline } from "react-icons/io";
import './Dataview.css'
const Dataview = ({entry , setOpenModal , setProblemData}) => {
  return (
    <div className='rowdata'>
                    <span className='titlelable'>{entry.labno}</span>
                    <span className='titlelable'>{entry.personID}</span>
                    <span className='titlelable'>{entry.personName}</span>
                    <span className='titlelable'>{entry.date.split('T')[0]}</span>
                    <span className='titlelable'>{entry.fromTime}</span>
                    <span className='titlelable'>{entry.toTime}</span>
                    <span className='titlelable'>{entry.problem==null ? (<>No</>):(<IoIosInformationCircleOutline className='iconSmall' onClick={()=>{setOpenModal(true); setProblemData({problemName:entry.problemName, data:entry.problem})}} />)}</span>
                </div>
  )
}

export default Dataview