const formSchema  = require("../model/form");
const {ApiError} = require("../utils/ApiError");
const XLSX = require('xlsx');
const mailSender = require("../Transporter/MailSender");
const { getIssueEmailTemplate } = require("../utils/emailTemplate");
const { getTechniciansByLabNumber } = require("../utils/labTechnicianMapping");
const registerForm = async (req, res) => {
  try {
    const {formData} = req.body;

    if(formData.problemName == "Everything Fine"){
      formData.problem = null;
    } else {
      // Send email to lab technician if there's an issue

      const issueDetails = {
        labno:  formData.labno,
        date: formData.date,
        fromTime: formData.fromTime,
        toTime: formData.toTime,
        problemName: formData.problemName,
        problem: formData.problem || 'No description provided',
        personName: formData.personName,
        personID: formData.personID
    };
      
      const emailBody = getIssueEmailTemplate(issueDetails);
      await mailSender(
        "mojonly813@gmail.com", // Lab technician email
        "Lab Report Issue Alert",
        emailBody
      );

      const { technicians } = getTechniciansByLabNumber(issueDetails.labno);
      if (!technicians.length) {
        console.error("No technician found for this lab number.");
        return;
      }
      await mailSender(
        technicians.map(t => t.email).join(','),
        `🚨 Lab Report Issue Alert - Lab ${issueDetails.labno}`,
        emailBody
    );

    }
    
    await formSchema.create({
        labno:formData.labno,
        date:formData.date,
        fromTime:formData.fromTime,
        toTime:formData.toTime,
        personID:formData.personID.trim(),
        personName:formData.personName.trim(),
        problemName:formData.problemName.trim(),
        problem:formData.problem,
        purpose:formData.purpose,
        numberOfStudent:formData.numberOfStudent,
    });

    return res.json({
      success: true,
      message: "Saved",
    });

  } catch (error) {
    console.log(error);
    res.json({
      ...error,
      message: error.message
    });
  }
};

const createExcelSheet = async (req, res) => {
  try {
    const forms = await formSchema.find();

    // Group data by labno
    const groupedData = forms.reduce((acc, form) => {
      const labno = form.labno;
      if (!acc[labno]) {
        acc[labno] = [];
      }
      acc[labno].push({
        labno: form.labno,
        date: form.date.toISOString().split('T')[0],
        fromTime: form.fromTime,
        toTime: form.toTime,
        numberOfStudent:form.numberOfStudent,
        purpose:form.purpose,
        personID: form.personID,
        personName: form.personName,
        problemName: form.problemName,
        problem: form.problem,
        createdAt: form.createdAt.toISOString(),
        updatedAt: form.updatedAt.toISOString()
      });
      return acc;
    }, {});

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Create a worksheet for each lab
    for (const [labno, data] of Object.entries(groupedData)) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, `Lab ${labno}`);
    }

    // Write workbook to file
    const filePath = 'forms.xlsx';
    XLSX.writeFile(workbook, filePath);

    // Send the file to the client
    res.download(filePath, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({success:false , message:"Error Downloading File"});
      }
    });

  } catch (error) {
    console.error('Error creating Excel sheet:', error);
    res.status(500).json({ message: 'Error creating Excel sheet', error: error.message });
  }
};

const getAllForms = async (req, res) => {
  try {
    const forms = await formSchema.find();

    return res.json({
      success: true,
      data: forms,
    });
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching form data',
      error: error.message,
    });
  }
};
module.exports = { registerForm , createExcelSheet , getAllForms};
