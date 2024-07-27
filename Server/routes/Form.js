const express = require("express")
const router = express.Router()

const {registerForm ,createExcelSheet ,getAllForms } = require("../controller/Form");
const {isValidData} = require("../middleware/validation")

router.post("/register",isValidData,registerForm );
router.get("/download",createExcelSheet);
router.get("/dashboard",getAllForms);

module.exports = router;