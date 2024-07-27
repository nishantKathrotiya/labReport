import { toast } from "react-toastify";
import { apiConnector } from "../connector";
import { endpoints } from "../api";
import { saveAs } from "file-saver";
import axios from 'axios';

export async function regitserForm(formData, setFormData, setLoading) {
  setLoading(true);

  try {
    const response = await apiConnector("POST", endpoints.FORM, { formData });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    setFormData({
      labno: 104,
      date: "",
      fromTime: "",
      toTime: "",
      personID: "",
      personName: "",
      problem: "",
    });
    toast.success("Updated");
  } catch (error) {
    toast.error(error.message);
    console.error("Error fetching Student details:", error);
  }
  setLoading(false);
}

export async function getData(setData, setLoading) {
  setLoading(true);

  try {
    const response = await apiConnector("GET", endpoints.GET_DATA);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    setData(response.data.data);
  } catch (error) {
    toast.error(error.message);
    console.error("Error fetching Student details:", error);
  }
  setLoading(false);
}

export async function downloadFile() {
  try {

    const response = await axios.get(endpoints.DOWNLOAD, {
        responseType: "blob",
    });

    const blob = new Blob([response.data], { type: response.data.type });
    saveAs(blob, "forms.xlsx");

  } catch (error) {
    console.error("Error downloading the file:", error);
    toast.error("Error downloading the file");
  }
}
