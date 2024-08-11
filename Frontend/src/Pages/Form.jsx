import React, { useState } from 'react';
import { labNo, problemList, timeSlot } from "../Utils/Data";
import { toast } from 'react-toastify';
import { regitserForm } from '../services/operation/form';
import "./Form.css";

const Form = () => {
  const [formData, setFormData] = useState({
    labno: 104,
    date: '',
    fromTime:'9:10',
    toTime:'11:10',
    personID: '',
    personName: '',
    problem: '',
    problemName:'Everything Fine'
  });
  
  const [loading , setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name=="time"){
      setFormData({
        ...formData,
        fromTime:value.split("-")[0].trim(),
        toTime:value.split("-")[1].trim()
      });
    }else{
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    console.log(formData)
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
    if (!formData.personID) {
      toast.error('Faculty/Student ID is required');
      return false;
    }
    if ((!formData.personName)|| (formData.personName.trim() == "")) {
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
                <label htmlFor="time">Time Slot:</label>
                <br />
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                >
                  {
                    timeSlot.map((no) => <option key={no} value={no}>{no}</option>)
                  }
                </select>
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

              <div className="formFieldContainer">
                <label htmlFor="problemName">Select Problem:</label>
                <br />
                <select
                  name="problemName"
                  value={formData.time}
                  onChange={handleChange}
                >
                  {
                    problemList.map((no,index) => <option key={index} value={no}>{no}</option>)
                  }
                </select>
              </div>

              {/* TextArea is here  */}
            </div>
          </div>

          <div className="formFieldContainerTextArea">
                <label htmlFor="problem">If Any Problem Found* :</label>
                <br />
                <textarea id="problem" name="problem" value={formData.problem} onChange={handleChange} />
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
