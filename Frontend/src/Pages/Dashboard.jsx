import React, { useEffect, useState } from 'react'
import Datatable from '../Components/Datatable/Datatable';
import { Tooltip } from 'react-tooltip'
import { FiDownload, FiRefreshCw, FiSearch } from "react-icons/fi";
import { getData, downloadFile } from '../services/operation/form';
import 'react-tooltip/dist/react-tooltip.css'
import './Dashboard.css'
import Footer from '../Components/Footer/Footer';
import universityLogo from '../assets/university.png';
import instituteLogo from '../assets/institute.png';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = async () => {
        setLoading(true);
        try {
            await getData(setData, setLoading);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await fetchData();
        } finally {
            setRefreshing(false);
        }
    };

    const LoadingSpinner = () => (
        <div className='loadingCenter'>
            <div className="loading-spinner"></div>
            <h1>Loading Data...</h1>
        </div>
    );

    const NoDataMessage = () => (
        <div className='loadingCenter'>
            <h1>No Data Found</h1>
            <button 
                className="refresh-button" 
                onClick={handleRefresh}
                disabled={refreshing}
            >
                <FiRefreshCw className={refreshing ? 'spinning' : ''} />
                Refresh
            </button>
        </div>
    );

    return (
        <div className='dashboardContainer'>
            <div className='dashboardTableContainer'>
                <div className="logo-header">
                    <img src={universityLogo} alt="CHARUSAT Logo" className="logo logo-left" />
                    <img src={instituteLogo} alt="DEPSTAR Logo" className="logo logo-right" />
                </div>
                {loading ? (
                    <LoadingSpinner />
                ) : data.length === 0 ? (
                    <NoDataMessage />
                ) : (
                    <>
                        <div className="table-container">
                            <Datatable 
                                data={data.filter(item => 
                                    Object.values(item).some(val => 
                                        String(val).toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                )} 
                            />
                        </div>
                        <div 
                            className='toolTip downloadContainer' 
                            data-tooltip-content="Download Data" 
                            onClick={downloadFile}
                        >
                            <FiDownload />
                        </div>
                    </>
                )}
            </div>
            <Tooltip anchorSelect=".toolTip" className='toopTipStyle' />
            <Footer />
        </div>
    )
}

export default Dashboard