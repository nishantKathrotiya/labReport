import React, { useEffect, useState } from 'react'
import Datatable from '../Components/Datatable/Datatable';
import { Tooltip } from 'react-tooltip'
import { FiDownload } from "react-icons/fi";
import { getData , downloadFile} from '../services/operation/form';
import 'react-tooltip/dist/react-tooltip.css'
import './Dashboard.css'

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData(setData, setLoading)
    }, [])
    return (
        <div className='dashboardContainer'>
            <div className='dashboardTableContainer'>
                {
                    loading ? (<div className='loadingCenter'><h1>Loading...</h1></div>) : (
                        <>
                            {
                            data.length == 0 ? (<div className='loadingCenter'><h1>No Data Found</h1></div>) : (
                                <>
                                <Datatable data={data} />
                                <div className='toolTip downloadContainer' data-tooltip-content="Click To Download" onClick={downloadFile}>
                                    <FiDownload />
                                </div>
                            </>
                            )
                        }
                        </>
                    )
                }
            </div>

            <Tooltip anchorSelect=".toolTip" className='toopTipStyle' />
        </div>
    )
}

export default Dashboard