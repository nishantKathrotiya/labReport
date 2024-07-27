import React, { useRef } from 'react';
import useOnClickOutside from "../../customHooks/useOnClickOutside";
import { IoIosCloseCircleOutline } from "react-icons/io";

const OpenModal = ({ setOpenModal, problemData, setProblemData }) => {
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

                    <div className='probleTextSection'>
                        <p>sdfsd
                            <fieldset>sdfsdf
                                sdfsdfsdf
                            </fieldset>
                            dsf
                            sdf
                            dsff
                            sd

                            fsdf
                            sd

                            <fieldset>sdfsd
                                <fieldset>sdfsd
                                    f
                                    sdfsdf

                                    sdfsdfsdfsdf
                                </fieldset>
                            </fieldset>
                            fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s

                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s


                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s


                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s

                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s  fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s

                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                           fgh
                            gfh
                            g
                            h
                            fghfg

                           sdfsdfsdfdsf
                           s
                         
                        </p>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpenModal;
