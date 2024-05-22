const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios')
const routes = require('./src/routes');
const cors = require('cors');
const connectDB = require('./src/config/config');
connectDB();

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use('/', routes);
const pdf = require('pdf-parse');
const fs = require('fs')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const extractInfoWithOpenAI = async (text) => {
  const prompt = `
  Extract the following information from the resume text . List out all the important information in form of array
    Resume Text:
    ${text}
  `;

  try {
      const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt }
            ],
            max_tokens: 150,
            temperature: 0.7

          },
          {
              headers: {
                  'Authorization': `Bearer ${"sk-proj-NmLQP3ZP7YvmZMBnxBefT3BlbkFJbsnVAFeCvlVbJlnBWlUd"}`,
                  'Content-Type': 'application/json'
              }
          }
      );

      const output = response.data.choices[0].message.content.trim();
      return output;
  } catch (error) {
      console.error('Error calling OpenAI API:', error.response ? error.response.data : error.message);
      throw new Error('Error extracting information using OpenAI API');
  }
};

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;

  // Read the uploaded PDF file
  fs.readFile(filePath, (err, data) => {
      if (err) {
          return res.status(500).json({ error: 'Error reading file' });
      }

      // Parse the PDF file
      pdf(data).then(async parsedData => {
          // Extract information using OpenAI API
          try {
              const extractedInfo = await extractInfoWithOpenAI(parsedData.text);

              // Delete the file after parsing
              fs.unlink(filePath, (err) => {
                  if (err) {
                      console.error('Error deleting file:', err);
                  }
              });

              // Return the extracted information
              res.json({ extractedInfo });
          } catch (error) {
              res.status(500).json({ error: error.message });
          }
      }).catch(err => {
          res.status(500).json({ error: 'Error parsing PDF' });
      });
  });
});

  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
