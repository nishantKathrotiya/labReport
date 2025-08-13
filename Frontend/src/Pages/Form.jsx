import { useState } from 'react';
import { labNo, problemList, purposeOfuse, timeSlot, facultyList } from "../Utils/Data";
import { toast } from 'react-toastify';
import { regitserForm } from '../services/operation/form';
import "./Form.css";
import Purpose from '../Components/Purpose/Purpose';
import { FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa';
import universityLogo from '../assets/university.png';
import instituteLogo from '../assets/institute.png';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Footer from '../Components/Footer/Footer';

const Form = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    role: 'Student', // Student, Faculty, or Other
    roleName: '', // For "Other" role
    personID: '',
    personName: '',
    labno: 104,
    date: new Date().toISOString().split('T')[0], // Default to today
    fromTime: '9:10',
    toTime: '11:10',
    numberOfStudent: 1,
    purpose: "Academic Work",
    problemName: 'Everything Fine', // Default value
    problem: '' // Empty by default
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Function to handle input change
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
    } else if (name === "role") {
      setFormData({
        ...formData,
        role: value,
        personID: '',
        personName: '',
        roleName: ''
      });
    } else if (name === "personID" && formData.role === "Faculty") {
      const selectedFaculty = facultyList.find(faculty => faculty.id === value);
      setFormData({
        ...formData,
        personID: value,
        personName: selectedFaculty ? selectedFaculty.name : ''
      });
    } else if (name === "problemName") {
      // Reset problem description when switching back to "Everything Fine"
      setFormData({
        ...formData,
        problemName: value,
        problem: value === 'Everything Fine' ? '' : formData.problem
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Validation function
  const validate = () => {
    const today = new Date().toISOString().split('T')[0];

    if (currentStep === 1) {
      if (formData.role === "Other" && !formData.roleName) {
        toast.error('Role name is required');
        return false;
      }
      if (!formData.personID) {
        toast.error('ID is required');
        return false;
      }
      if (!formData.personName) {
        toast.error('Name is required');
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.labno) {
        toast.error('Location is required');
        return false;
      }
      if (!labNo.includes(parseInt(formData.labno))) {
        toast.error('Location number. Please enter a valid location');
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
    } else if (currentStep === 3) {
      // Only validate problem description if a problem is selected
      if (formData.problemName !== 'Everything Fine' && !formData.problem.trim()) {
        toast.error('Please provide a description of the problem');
        return false;
      }
    }
    return true;
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep !== 3) {
      return;
    }
    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      await regitserForm(formData, setFormData, setLoading);
      setShowSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setCurrentStep(1);
        setFormData({
          role: 'Student',
          roleName: '',
          personID: '',
          personName: '',
          labno: 104,
          date: '',
          fromTime: '9:10',
          toTime: '11:10',
          numberOfStudent: 1,
          purpose: "Academic Work",
          problemName: 'Everything Fine',
          problem: ''
        });
      }, 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const nextStep = () => {
    if (validate()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderProgressBar = () => (
    <div className="progress-container">
      <div className="progress-steps">
        <div className={`progress-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
          1
          <span className="progress-step-label">User Info</span>
        </div>
        <div className={`progress-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
          2
          <span className="progress-step-label">Details</span>
        </div>
        <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
          3
          <span className="progress-step-label">Problem</span>
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className='formSection'>

      <div className="formFieldContainer">
        <label htmlFor="role">Select Role:</label>
        <br />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {formData.role === "Other" && (
        <div className="formFieldContainer">
          <label htmlFor="roleName">Role Name:</label>
          <br />
          <input
            type="text"
            name="roleName"
            value={formData.roleName}
            onChange={handleChange}
          />
        </div>
      )}

      <div className="formFieldContainer">
        <label htmlFor="personID">
          {formData.role === "Student" ? "Student ID" :
            formData.role === "Faculty" ? "Faculty ID" : "ID"}:
        </label>
        <br />
        <input
          type="text"
          name="personID"
          value={formData.personID}
          onChange={handleChange}
        />
      </div>

      <div className="formFieldContainer">
        <label htmlFor="personName">
          {formData.role === "Student" ? "Student Name" :
            formData.role === "Faculty" ? "Faculty Name" : "Name"}:
        </label>
        <br />
        <input
          type="text"
          name="personName"
          value={formData.personName}
          onChange={handleChange}
          readOnly={formData.role === "Faculty"}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className='formSection'>

      <div className="step2-columns">
        <div className="step2-column">
          <div className="formFieldContainer">
            <label htmlFor="labno">Location* :</label>
            <br />
            <input
              type="number"
              name="labno"
              value={formData.labno}
              onChange={handleChange}
              placeholder="Enter Location"
              min="100"
              max="999"
            />

            <div style={{ color: 'red', fontSize: '0.8em', marginTop: '5px', height: "1px" }}>
              {formData.labno && !labNo.includes(parseInt(formData.labno)) && ("Invalid Location. Please enter a valid Location.")}
            </div>

          </div>

          <div className="formFieldContainer">
            <label htmlFor="date">Date* :</label>
            <br />
            <input type="date" name="date" id="date" value={formData.date} disabled />
          </div>

          <div className="formFieldContainer">
            <label htmlFor="time">Time Slot:</label>
            <br />
            <select name="time" onChange={handleChange}>
              {timeSlot.map((no) => <option key={no} value={no}>{no}</option>)}
            </select>
          </div>
        </div>

        <div className="step2-column">
          {
            formData.role !== "Student" && (
              <div className="formFieldContainer">
                <label htmlFor="numberOfStudent">No. of Student :*</label>
                <br />
                <input type="number" min="1" max="25" name="numberOfStudent" id="numberOfStudent" value={formData.numberOfStudent} onChange={handleChange} />
              </div>
            )
          }

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
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className='formSection'>

      <div className="formFieldContainer">
        <label htmlFor="problemName">Select Problem:</label>
        <br />
        <select name="problemName" value={formData.problemName} onChange={handleChange}>
          {problemList.map((no, index) => <option key={index} value={no}>{no}</option>)}
        </select>
      </div>

      <div className="formFieldContainerTextArea" style={{ height: "100px" }}>
        {formData.problemName !== 'Everything Fine' && (
          <>
            <label htmlFor="problem">Problem Description (Required)* :</label>
            <br />
            <textarea
              id="problem"
              name="problem"
              value={formData.problem}
              style={{ marginTop: '5px' }}
              onChange={handleChange}
              placeholder="Please describe the problem in detail"
            />
          </>
        )}
      </div>
    </div >
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  return (
    <div className='formPage'>
      <div className='formContainer'>
        <div className="logo-header2">
          <img src={universityLogo} alt="University Logo" className="logo2 logo-left" />
          <img src={instituteLogo} alt="Institute Logo" className="logo2 logo-right" />
        </div>
        <h1 className='title'>Help Us Improve our Space!</h1>
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <div className="loading-text">Submitting your request...</div>
          </div>
        ) : showSuccess ? (
          <div className="success-container">
            <div className="success-icon"></div>
            <div className="success-message">
              <h2>Thank You!</h2>
              <p>Your response has been successfully submitted.</p>
            </div>
          </div>
        ) : (
          <form className='fullWidth'>
            {renderProgressBar()}
            <div className='formItSelf'>
              <TransitionGroup>
                <CSSTransition
                  key={currentStep}
                  timeout={500}
                  classNames="step"
                  unmountOnExit
                >
                  {renderStep()}
                </CSSTransition>
              </TransitionGroup>
            </div>
            <div className='subBtnContainer'>
              {currentStep > 1 && (
                <button type="button" onClick={prevStep}>
                  <FaArrowLeft /> Previous
                </button>
              )}
              {currentStep < 3 ? (
                <button type="button" onClick={nextStep}>
                  Next <FaArrowRight />
                </button>
              ) : (
                <button type="button" onClick={handleSubmit}>
                  Submit <FaCheck />
                </button>
              )}
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
      <Footer />
    </div>
  );
}

export default Form;