const stream = require("stream");
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { google } = require("googleapis");
const app = express();
const upload = multer();
const apiRoutes = require("./routes/api");
const Admin = require("./models/Admin");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.sendFile(`${__dirname}/index.html`);
// });

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/xyz";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(cors());
app.use("/api", apiRoutes);

const KEYFILEPATH = path.join(__dirname, "cred.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

app.post("/upload", upload.any(), async (req, res) => {
  try {
      console.log(req.body);
      console.log(req.files);
      const { body, files } = req;

      for (let f = 0; f < files.length; f += 1) {
          await uploadFile(files[f]);
      }

      res.status(200).send("Form Submitted");
  } catch (f) {
      res.send(f.message);
  }
});

const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
      media: {
          mimeType: fileObject.mimeType,
          body: bufferStream,
      },
      requestBody: {
          name: fileObject.originalname,
          parents: ["1t4M7MiTkAz8QPsQgwXtywY-j58MaL9al"],
      },
      fields: "id,name",
  });
  console.log(`Uploaded file ${data.name} ${data.id}`);
};

const fetchImagesFromDrive = async () => {
  const drive = google.drive({ version: "v3", auth });

  try {
    const response = await drive.files.list({
      q: "1CRKQSibMJccj1SLFHP-z3u58F1EnjiU3", // Replace 'YOUR_FOLDER_ID' with the actual folder ID
      fields: "files(id, name, webViewLink)",
    });

    return response.data.files;
  } catch (error) {
    console.error("Error fetching images from Google Drive:", error);
    return [];
  }
};

// Endpoint to fetch images
app.get("/images", async (req, res) => {
  try {
    const images = await fetchImagesFromDrive();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

app.listen(5050, () => {
  console.log("Form running on port 5050");
});
