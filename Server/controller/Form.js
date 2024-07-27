const formSchema  = require("../model/form");
const {ApiError} = require("../utils/ApiError");
const XLSX = require('xlsx');

const registerForm = async (req, res) => {
  try {
    const {formData} = req.body;
    
    await formSchema.create({
        labno:formData.labno,
        date:formData.date,
        fromTime:formData.fromTime,
        toTime:formData.toTime,
        personID:formData.personID,
        personName:formData.personName,
        problem:(formData.problem=="") ? (null) : (formData.problem)
    });

    return res.json({
      success: true,
      message: "Saved",
    });

  } catch (error) {
    console.log(error);
    res.json({
      ...e,
      message: e.message
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
        personID: form.personID,
        personName: form.personName,
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
