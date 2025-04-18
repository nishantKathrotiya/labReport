import React, { useState, useEffect } from 'react';
import { labNo, problemList, purposeOfuse, timeSlot,facultyList } from "../Utils/Data";
import { toast } from 'react-toastify';
import { regitserForm } from '../services/operation/form';
import "./Form.css";
import Purpose from '../Components/Purpose/Purpose';

const Form = () => {
  const [formData, setFormData] = useState({
    labno: 104,
    date: '',
    fromTime: '9:10',
    toTime: '11:10',
    numberOfStudent: 1,
    personID: '',
    personName: '',
    problem: '',
    purpose: "Academic Work", 
    problemName: 'Everything Fine',
    selectedUser: 'Student'  // Default to Student
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle time input change
    if (name === "time") {
      setFormData({
        ...formData,
        fromTime: value.split("-")[0].trim(),
        toTime: value.split("-")[1].trim()
      });
    } 
    // Handle purpose change
    else if (name === "purpose") {
      if (value === "other") {
        setShowModal(true);
      } else {
        setFormData({
          ...formData,
          [name]: value
        });
        setShowModal(false);
      }
    } 
    // Handle selection change for user type (Faculty/Student)
    else if (name === "selectedUser") {
      if (value === 'Student') {
        // Clear the fields when switching back to Student
        setFormData({
          ...formData,
          selectedUser: value,
          personID: '',
          personName: ''
        });
      } else {
        // Find the selected faculty
        const selectedFaculty = facultyList.find(faculty => faculty.id === value);
        if (selectedFaculty) {
          setFormData({
            ...formData,
            selectedUser: value,
            personID: selectedFaculty.id,
            personName: selectedFaculty.name
          });
        }
      }
    } 
    // Handle regular input fields
    else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    regitserForm(formData, setFormData, setLoading);
  };

  // Validation function
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
    if ((!formData.personName) || (formData.personName.trim() === "")) {
      toast.error('Faculty/Student Name is required');
      return false;
    }
    return true;
  };

  return (
    <div className='formPage'>
      <div className='formContainer'>
        <h1 className='title'>Fill Out the form</h1>
        {loading ? (<h1>Loading...</h1>) : (
          <form className='fullWidth' onSubmit={handleSubmit}>
            <div className='formItSelf'>
              <div className='formSection'>
                <div className="formFieldContainer">
                  <label htmlFor="labno">Lab No.* :</label>
                  <br />
                  <select name="labno" value={formData.labno} onChange={handleChange}>
                    {labNo.map((no) => <option key={no} value={no}>{no}</option>)}
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
                  <select name="time" onChange={handleChange}>
                    {timeSlot.map((no) => <option key={no} value={no}>{no}</option>)}
                  </select>
                </div>

                <div className="formFieldContainer">
                  <label htmlFor="numberOfStudent">No. of Student :*</label>
                  <br />
                  <input type="number" min="1" max="25" name="numberOfStudent" id="numberOfStudent" value={formData.numberOfStudent} onChange={handleChange} />
                </div>

                <div className="formFieldContainer">
                  <label htmlFor="purpose">Select Purpose:</label>
                  <br />
                  <select name="purpose" value={formData.purpose} onChange={handleChange}>
                    {purposeOfuse.map((no, index) => (
                      <option key={index} value={no}>{no}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='formSection'>
                {/* Dropdown for selecting Faculty or Student */}
                <div className="formFieldContainer">
                  <label htmlFor="selectedUser">Select User:</label>
                  <br />
                  <select name="selectedUser" value={formData.selectedUser} onChange={handleChange}>
                    <option value="Student">Student</option>
                    {facultyList.map(faculty => (
                      <option key={faculty.id} value={faculty.id}>
                        {faculty.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* If Faculty is selected, show Faculty ID/Name fields */}
                <div className="formFieldContainer">
                  <label htmlFor="personID">
                    {formData.selectedUser === 'Student' ? 'Student ID* :' : 'Faculty ID:'}
                  </label>
                  <br />
                  <input 
                    type="text" 
                    name="personID" 
                    id="personID" 
                    value={formData.personID} 
                    onChange={handleChange} 
                    readOnly={formData.selectedUser !== 'Student'}
                  />
                </div>

                <div className="formFieldContainer">
                  <label htmlFor="personName">
                    {formData.selectedUser === 'Student' ? 'Student Name* :' : 'Faculty Name:'}
                  </label>
                  <br />
                  <input 
                    type="text" 
                    name="personName" 
                    id="personName" 
                    value={formData.personName} 
                    onChange={handleChange} 
                    readOnly={formData.selectedUser !== 'Student'}
                  />
                </div>

                <div className="formFieldContainer">
                  <label htmlFor="problemName">Select Problem:</label>
                  <br />
                  <select name="problemName" value={formData.problemName} onChange={handleChange}>
                    {problemList.map((no, index) => <option key={index} value={no}>{no}</option>)}
                  </select>
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
        )}
      </div>
      {showModal && (
        <Purpose
          formData={formData}
          setFormData={setFormData}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default Form;