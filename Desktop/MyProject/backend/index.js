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

app.post("/upload", upload.single("photo"), async (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    const { filename } = file;

    const driveResponse = await google
      .drive({ version: "v3", auth })
      .files.create({
        requestBody: {
          name: filename,
          parents: ["1CRKQSibMJccj1SLFHP-z3u58F1EnjiU3"],
        },
        media: {
          mimeType: file.mimetype,
          body: require("fs").createReadStream(file.path),
        },
      });

    // Save metadata to MongoDB
    const photo = {
      filename,
      driveFileId: driveResponse.data.id,
    };

    Admin.photos.push(photo);
    await Admin.save();

    res.status(200).send("Photos uploaded successfully");
  } catch (error) {
    console.error("Error uploading photos:", error);
    res.status(500).send("Error uploading photos");
  }
});

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
