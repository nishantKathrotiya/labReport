import React, { useEffect, useState } from 'react';
import Dataview from '../Dataview/Dataview';
import { MdFilterAltOff } from "react-icons/md";
import OpenModal from '../OpenModal/OpenModal';
import Filter from '../Dropdown/Filter';
import "./Datatable.css";

const Datatable = ({ data }) => {
    const [labnoQuery, setLabnoQuery] = useState('');
    const [textQuery, setTextQuery] = useState('');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [timeRange, setTimeRange] = useState({ from: '', to: '' });
    const [sortConfig, setSortConfig] = useState(null);
    const [filteredData, setFilteredData] = useState(data);

    const [openModal, setOpenModal] = useState(false);
    const [problemData, setProblemData] = useState(null);



    useEffect(() => {
        let filtered = data;

        if (labnoQuery) {
            filtered = filtered.filter(entry => entry.labno.includes(labnoQuery));
        }

        if (textQuery) {
            filtered = filtered.filter(entry =>
                entry.personID.toLowerCase().includes(textQuery.toLowerCase()) ||
                entry.personName.toLowerCase().includes(textQuery.toLowerCase())
            );
        }

        if (dateRange.from || dateRange.to) {
            const from = dateRange.from ? new Date(dateRange.from) : new Date('1970-01-01');
            const to = dateRange.to ? new Date(dateRange.to) : new Date();
            filtered = filtered.filter(entry => {
                const date = new Date(entry.date);
                return date >= from && date <= to;
            });
        }

        if (timeRange.from || timeRange.to) {
            const fromTime = timeRange.from ? timeRange.from : '00:00';
            const toTime = timeRange.to ? timeRange.to : '23:59';
            filtered = filtered.filter(entry =>
                entry.fromTime >= fromTime && entry.toTime <= toTime
            );
        }

        if (sortConfig !== null) {
            filtered.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        setFilteredData(filtered);
    }, [labnoQuery, textQuery, dateRange, timeRange, sortConfig, data]);



    const handleSearchChange = (e) => {
        setTextQuery(e.target.value);
    };


    const handleDateRangeChange = (e) => {
        setDateRange({
            ...dateRange,
            [e.target.name]: e.target.value,
        });
    };

    const handleTimeRangeChange = (e) => {
        setTimeRange({
            ...timeRange,
            [e.target.name]: e.target.value,
        });
    };

    const clearFilters = () => {
        setLabnoQuery('');
        setTextQuery('');
        setDateRange({ from: '', to: '' });
        setTimeRange({ from: '', to: '' });
        setSortConfig(null);
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const filterData = [

        {
            id: "labno",
            title: "Ascending",
            callback: () => requestSort('labno')
        },
        {
            id: "labno",
            title: "Descending",
            callback: () => requestSort('labno',)
        },
        {
            id: "labno",
            title: 104,
            callback: () => setLabnoQuery(104)
        },
        {
            id: "labno",
            title: 105,
            callback: () => setLabnoQuery(105)
        },
        {
            id: "labno",
            title: 107,
            callback: () => setLabnoQuery(107)
        },
        {
            id: "labno",
            title: 108,
            callback: () => setLabnoQuery(108)
        },
        {
            id: "labno",
            title: 109,
            callback: () => setLabnoQuery(109)
        },
        {
            id: "labno",
            title: 110,
            callback: () => setLabnoQuery(110)
        },
        {
            id: "labno",
            title: 114,
            callback: () => setLabnoQuery(114)
        },
        {
            id: "labno",
            title: 116,
            callback: () => setLabnoQuery(116)
        },
        {
            id: "labno",
            title: 118,
            callback: () => setLabnoQuery(118)
        },
        {
            id: "id",
            title: "Ascending",
            callback: () => requestSort('personID')
        },
        {
            id: "id",
            title: "Descending",
            callback: () => requestSort('personID')
        },
        {
            id: "name",
            title: "Ascending",
            callback: () => requestSort('personName')
        },
        {
            id: "name",
            title: "Descending",
            callback: () => requestSort('personName')
        },
        {
            id: "date",
            title: "Ascending",
            callback: () => requestSort('date')
        },
        {
            id: "date",
            title: "Descending",
            callback: () => requestSort('date')
        },
        {
            id: "date",
            icon: "from",
            title: <input
                type='date'
                name='from'
                placeholder='From Date'
                value={dateRange.from}
                onChange={handleDateRangeChange} />,
        },
        {
            id: "date",
            icon: "to",
            title: <input
                type='date'
                name='to'
                placeholder='To Date'
                value={dateRange.to}
                onChange={handleDateRangeChange}
            />,
        },
        {
            id: "fromTime",
            icon: "from",
            title: <input
                type='time'
                name='from'
                placeholder='From Time'
                value={timeRange.from}
                onChange={handleTimeRangeChange}
            />,
        },
        {
            id: "toTime",
            icon: "To",
            title: <input
                type='time'
                name='to'
                placeholder='To Time'
                value={timeRange.to}
                onChange={handleTimeRangeChange} />,
        },
    ]

    return (
        <div className='dataTableContainer'>
            <div className='titleRow'>
                <div className='headertext'>Better Spaces Start Here</div>
                <div className='searchDiv'>

                    <input
                        type='text'
                        placeholder='Search ID or Name'
                        value={textQuery}
                        onChange={handleSearchChange}
                    />

                    <button onClick={clearFilters} className='toolTip' data-tooltip-content="Click To Clear Filter">
                        <MdFilterAltOff className='iconMedium' />
                    </button>
                </div>
            </div>
            <div className='dataTableOverflow'>
                <div className='columnTitle'>
                    <span className='titlelable'>Lab no <Filter filterData={filterData} id="labno" /></span>
                    <span className='titlelable' >ID <Filter filterData={filterData} id="id" /></span>
                    <span className='titlelable' >Name <Filter filterData={filterData} id="name" /></span>
                    <span className='titlelable' >Date <Filter filterData={filterData} id="date" /></span>
                    <span className='titlelable' >Time</span>
                    <span className='titlelable' >No. of Student</span>
                    <span className='titlelable' >Purpose</span>
                    <span className='titlelable'>Problem</span>
                </div>
                {
                    filteredData.length == 0 ? (<div className='loadingCenter'><h1>No Data Found</h1></div>) : (
                        <>
                            {filteredData.map((entry, i) => (
                                <Dataview key={i} entry={entry} setOpenModal={setOpenModal} setProblemData={setProblemData} />
                            ))}
                        </>
                    )
                }
            </div>
            {
                openModal && <OpenModal setOpenModal={setOpenModal} problemData={problemData} setProblemData={setProblemData} />
            }
        </div>
    );
};

export default Datatable;
