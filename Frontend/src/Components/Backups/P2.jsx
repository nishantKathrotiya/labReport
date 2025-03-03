import React, { useState } from 'react';
import { labNo, problemList, purposeOfuse, timeSlot } from "../Utils/Data"; 
import { toast } from 'react-toastify';
import { regitserForm } from '../services/operation/form';
import "./Form.css";
import Purpose from '../Components/Purpose/Purpose';

const facultyList = [
  { id: "375", name: "Amit Nayak" },
  { id: "473", name: "Hardik Jayswal" },
  { id: "8209", name: "Rajesh Patel" },
  { id: "6039", name: "Radhika Patel" },
  { id: "6060", name: "Akash Patel" },
  { id: "6045", name: "Sachin Patel" },
  { id: "6056", name: "Ritika Jani" },
  { id: "6076", name: "Shital Sharma" },
  { id: "6082", name: "Ashish Kataria" },
  { id: "6089", name: "Hitesh Makwana" },
  { id: "6094", name: "Pooja Chaudhry" },
  { id: "6095", name: "Dipika Damodar" },
  { id: "6066", name: "Chintak Raval" }
];

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
    userType: 'Student'  // Default to Student
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "time") {
      setFormData({
        ...formData,
        fromTime: value.split("-")[0].trim(),
        toTime: value.split("-")[1].trim()
      });
    } else if (name === "purpose") {
      if (value === "other") {
        setShowModal(true);
      } else {
        setFormData({
          ...formData,
          [name]: value
        });
        setShowModal(false);
      }
    } else if (name === "userType") {
      setFormData({
        ...formData,
        [name]: value,
        personID: '',
        personName: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFacultySelect = (facultyID) => {
    const selectedFaculty = facultyList.find(faculty => faculty.id === facultyID);
    if (selectedFaculty) {
      setFormData({
        ...formData,
        personID: selectedFaculty.id,
        personName: selectedFaculty.name
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      console.log(formData);
      return;
    }
    regitserForm(formData, setFormData, setLoading);
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
                  <select name="time" value={formData.time} onChange={handleChange}>
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
                {/* User Type Dropdown */}
                <div className="formFieldContainer">
                  <label htmlFor="userType">Select User Type:</label>
                  <br />
                  <select name="userType" value={formData.userType} onChange={handleChange}>
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                  </select>
                </div>

                {/* Faculty dropdown when "Faculty" is selected */}
                {formData.userType === 'Faculty' && (
                  <div className="formFieldContainer">
                    <label htmlFor="facultySelect">Select Faculty:</label>
                    <br />
                    <select
                      name="facultySelect"
                      onChange={(e) => handleFacultySelect(e.target.value)}
                    >
                      <option value="">Select Faculty</option>
                      {facultyList.map(faculty => (
                        <option key={faculty.id} value={faculty.id}>
                          {faculty.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* If "Student" is selected, allow user to input their own ID and Name */}
                {formData.userType === 'Student' && (
                  <>
                    <div className="formFieldContainer">
                      <label htmlFor="personID">Student ID* :</label>
                      <br />
                      <input type="text" name="personID" id="personID" value={formData.personID} onChange={handleChange} />
                    </div>

                    <div className="formFieldContainer">
                      <label htmlFor="personName">Student Name* :</label>
                      <br />
                      <input type="text" name="personName" id="personName" value={formData.personName} onChange={handleChange} />
                    </div>
                  </>
                )}

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
