const formModal = require("../model/form");
const {ApiError} = require("../utils/ApiError")

exports.isValidData = async (req, res, next) => {
  try {
    const { formData } = req.body;

    const today = new Date().toISOString().split("T")[0];

    if (!formData.labno) {
      throw new ApiError(500, "Lab No. is required");
      return;
    }
    if (!formData.date) {
      throw new ApiError(500, "Date is required");
      return;
    } else if (formData.date < today) {
      throw new ApiError(500, "Date cannot be in the past");
      return;
    }
    if (!formData.fromTime) {
      throw new ApiError(500, "From time is required");
      return;
    }
    if (!formData.toTime) {
      throw new ApiError(500, "To time is required");
      return;
    }
    if (formData.fromTime && formData.toTime) {
      const fromTime = new Date(`1970-01-01T${formData.fromTime}:00`);
      const toTime = new Date(`1970-01-01T${formData.toTime}:00`);
      if (fromTime >= toTime) {
        throw new ApiError(500, "From time must be before To time");
        return;
      }
      const differenceInMinutes = (toTime - fromTime) / (1000 * 60);
      if (differenceInMinutes < 30) {
        throw new ApiError(
          500,
          "There must be at least a 30-minute difference between From and To times"
        );
        return;
      }
    }
    if (!formData.personID) {
      throw new ApiError(500, "Faculty/Student ID is required");
      return;
    }
    if (!formData.personName) {
      throw new ApiError(500, "Faculty/Student Name is required");
      return;
    }

    next();
  } catch (error) {
    res.json({
      ...e,
      message: e.message,
    });
  }
};
