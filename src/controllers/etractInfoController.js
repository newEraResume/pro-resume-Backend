const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const multer = require("multer");

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Filter to allow only PDF files
const fileFilter = function (req, file, cb) {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

// Initialize multer with the defined storage and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Define a POST endpoint for uploading a file and initiating a chat
const extractInfoController = async (req, res) => {
  try {
    // Create a FormData object
      const formData = new FormData();
      formData.append(
        "file",
        fs.createReadStream("Rishabh_Rai_Resume.pdf")
      );

    // Set up options for the axios request
    const options = {
      headers: {
        "x-api-key": "sec_iPeMml3qdHCh5NrnACXfVHTyNkjPwNgF",
        ...formData.getHeaders(),
      },
    };

    axios
    .post("https://api.chatpdf.com/v1/sources/add-file", formData, options)
    .then((response) => {
      console.log("Source ID:", response.data.sourceId);
      const config = {
        headers: {
          "x-api-key": "sec_iPeMml3qdHCh5NrnACXfVHTyNkjPwNgF",
          "Content-Type": "application/json",
        },
      };
      
      const data = {
        sourceId: response.data.sourceId,
        messages: [
          {
            role: "user",
            content: "List out all the important information in form of array",
          },
        ],
      };
      
      axios
        .post("https://api.chatpdf.com/v1/chats/message", data, config)
        .then((response) => {
          console.log("Result:", response.data.content);
        })
        .catch((error) => {
          console.error("Error:", error.message);
          console.log("Response:", error.response.data);
        });
    })
    .catch((error) => {
      console.log("Error:", error.message);
      console.log("Response:", error.response.data);
    });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: error.message });
  }
};

module.exports = { extractInfoController };