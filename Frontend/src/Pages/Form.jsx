import React, { useState } from 'react';
import { labNo } from "../Utils/Data";
import { toast } from 'react-toastify';
import { regitserForm } from '../services/operation/form';
import "./Form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    labno: 104,
    date: '',
    fromTime: '',
    toTime: '',
    personID: '',
    personName: '',
    problem: ''
  });
  
  const [loading , setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    const today = new Date().toISOString().split('T')[0];
  
    if (!formData.labno) {
      toast.error('Lab No. is required');
      return false;
    }
    if (!formData.date) {
      toast.error('Date is required');
      return false;
    } else if (formData.date < today) {
      toast.error('Date cannot be in the past');
      return false;
    }
    if (!formData.fromTime) {
      toast.error('From time is required');
      return false;
    }
    if (!formData.toTime) {
      toast.error('To time is required');
      return false;
    }
    if (formData.fromTime && formData.toTime) {
      const fromTime = new Date(`1970-01-01T${formData.fromTime}:00`);
      const toTime = new Date(`1970-01-01T${formData.toTime}:00`);
      if (fromTime >= toTime) {
        toast.error('From time must be before To time');
        return false;
      }
      const differenceInMinutes = (toTime - fromTime) / (1000 * 60);
      if (differenceInMinutes < 30) {
        toast.error('There must be at least a 30-minute difference between From and To times');
        return false;
      }
    }
    if (!formData.personID) {
      toast.error('Faculty/Student ID is required');
      return false;
    }
    if (!formData.personName) {
      toast.error('Faculty/Student Name is required');
      return false;
    }
  
    return true;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      console.log(formData)
      return;
    }
    regitserForm(formData , setFormData , setLoading);
  };

  return (
    <div className='formPage'>
      <div className='formContainer'>
        <h1 className='title'>Fill Out the form</h1>
       {
        loading ? (<h1>Loading...</h1>) : (
          <form className='fullWidth' onSubmit={handleSubmit}>

          <div className='formItSelf'>

            <div className='formSection'>
              <div className="formFieldContainer">
                <label htmlFor="labno">Lab No.* :</label>
                <br />
                <select
                  name="labno"
                  value={formData.labno}
                  onChange={handleChange}
                >
                  {
                    labNo.map((no) => <option key={no} value={no}>{no}</option>)
                  }
                </select>
              </div>

              <div className="formFieldContainer">
                <label htmlFor="date">Date* :</label>
                <br />
                <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} />
              </div>

              <div className="formFieldContainer">
                <label htmlFor="fromTime">From* :</label>
                <br />
                <input type="time" name="fromTime" id="fromTime" value={formData.fromTime} onChange={handleChange} />
              </div>

              <div className="formFieldContainer">
                <label htmlFor="toTime">To* :</label>
                <br />
                <input type="time" name="toTime" id="toTime" value={formData.toTime} onChange={handleChange} />
              </div>
            </div>

            <div className='formSection'>
              <div className="formFieldContainer">
                <label htmlFor="personID">Faculty/Student ID* :</label>
                <br />
                <input type="text" name="personID" id="personID" value={formData.personID} onChange={handleChange} />
              </div>

              <div className="formFieldContainer">
                <label htmlFor="personName">Faculty/Student Name* :</label>
                <br />
                <input type="text" name="personName" id="personName" value={formData.personName} onChange={handleChange} />
              </div>

              <div className="formFieldContainerTextArea">
                <label htmlFor="problem">If Any Problem Found* :</label>
                <br />
                <textarea id="problem" name="problem" value={formData.problem} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className='subBtnContainer'>
            <button type="submit">Submit</button>
          </div>
        </form>
        )
       }
      </div>
    </div>
  );
}

export default Form;
