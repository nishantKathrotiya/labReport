import React, { useRef } from 'react';
import useOnClickOutside from '../../customHooks/useOnClickOutside';

const Purpose = ({ formData, setFormData, setShowModal }) => {
    const ref = useRef(null);
    useOnClickOutside(ref, () => { setShowModal(false); });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            purpose: e.target.value
        });
    };

    const handleSubmit = () => {
        setFormData({
            ...formData,
            purpose: formData.purpose // Update purpose with the custom value
        });
        setShowModal(false);
    };

    return (
        <div className='absConatiner'>
            <div className='actualField' ref={ref}>
                <label htmlFor="forUseOther">Describe your purpose to use lab : *</label>
                <div className="formFieldContainer" id="testFileContainer">
                    <label htmlFor="purpose">Enter Purpose *:</label>
                    <br />
                    <input type="text" name="purpose" id="reason" value={formData.purpose} onChange={handleChange} />
                </div>
                <div className='otherBtn'>
                    <button type="button" onClick={handleSubmit}>Update</button>
                </div>
            </div>
        </div>
    );
}

export default Purpose;
