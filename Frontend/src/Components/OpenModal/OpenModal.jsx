import React, { useRef } from 'react';
import useOnClickOutside from "../../customHooks/useOnClickOutside";
import { IoIosCloseCircleOutline } from "react-icons/io";

const OpenModal = ({setOpenModal, problemData, setProblemData }) => {
    const ref = useRef(null);
    useOnClickOutside(ref, () => { setOpenModal(false); setProblemData(null) });

    return (
        <div className='modalBackdrop'>
            <div className='problemContainer' ref={ref}>
                <div className='problemSection'>
                    <div className='titleSection'>
                        <p>Problem</p>
                        <IoIosCloseCircleOutline className='iconlarge' onClick={() => { setOpenModal(false); setProblemData(null) }} />
                    </div>
                        <div className='problemName'>
                            <h3>{problemData.problemName}</h3>
                        </div>
                    <div className='probleTextSection'>
                        <p>{problemData.data}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpenModal;
