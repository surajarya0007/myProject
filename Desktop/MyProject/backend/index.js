const stream = require("stream");
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { google } = require("googleapis");
const apiRoutes = require("./routes/api");
const Admin = require("./models/Admin");
const fs = require("fs");
const exp = require("constants");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

app.get("/fetchImages", async (req, res) => {
  try {
    const side = req.query.side;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({
      version: "v3",
      auth,
    });

    let folderId;
    if (side === "bride") {
      folderId = "'1T44BI4QJaTRIhBHEWPEHVZKnpl-P7Qhd' in parents";
    } else if (side === "groom") {
      folderId = "'1pXeE1RyDjUs4gSL2L5Q6ogp36TAre_kE' in parents";
    } else {
      return res.status(400).json({ error: "Invalid side value" });
    }

    const response = await drive.files.list({
      q: folderId,
      fields: "files(id, name, webViewLink, thumbnailLink, mimeType)",
    });

    res.json({ files: response.data.files });
  } catch (error) {
    console.log(error);
  }
});

app.get("/download/:id", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({
      version: "v3",
      auth,
    });

    const fileId = req.params.id;

    // Fetch file metadata to get MIME type and original filename
    const fileMetadata = await drive.files.get({
      fileId,
      fields: "mimeType, name",
    });

    // Extract MIME type and original filename from metadata
    const mimeType = fileMetadata.data.mimeType;
    const filename = fileMetadata.data.name;

    console.log(mimeType);

    drive.files
      .get({ fileId, alt: "media" }, { responseType: "stream" })
      .then((response) => {
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${filename}`
        );
        res.setHeader("Content-Type", mimeType);
        response.data
          .on("end", () => {
            console.log("Done downloading file.");
          })
          .on("error", (err) => {
            console.error("Error downloading file.");
            return res.status(500).send("Error downloading file");
          })
          .pipe(res);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error downloading file");
  }
});

// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: function (req, file, callback) {
//     const extention = file.originalname.split(".").pop();
//     callback(null, `${file.filename}-${Date.now()}.${extention}`);
//   },
// });

// const upload = multer({ storage: storage });

const storage = multer.diskStorage({
  destination: "/tmp/uploads",
  filename: function (req, file, callback) {
    const extension = file.originalname.split(".").pop();
    callback(null, `${file.filename}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    const drive = google.drive({
      version: "v3",
      auth,
    });

    const side = req.headers.side;

    let folderId;
    if (side === "bride") {
      folderId = "1T44BI4QJaTRIhBHEWPEHVZKnpl-P7Qhd";
    } else if (side === "groom") {
      folderId = "1pXeE1RyDjUs4gSL2L5Q6ogp36TAre_kE";
    } else {
      return res.status(400).json({ error: "Invalid side value" });
    }
    const uplodedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const response = await drive.files.create({
        requestBody: {
          name: file.originalname,
          mineType: file.mineType,
          parents: [folderId],
        },
        media: {
          body: fs.createReadStream(file.path),
        },
      });
      uplodedFiles.push(response.data);
    }
    res.json({ files: uplodedFiles });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
