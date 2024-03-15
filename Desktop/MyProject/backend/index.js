const stream = require("stream");
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { google } = require("googleapis");
const app = express();
const apiRoutes = require("./routes/api");
const Admin = require("./models/Admin");
const fs = require("fs");
const exp = require("constants");

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
app.use(express.json());
app.use("/api", apiRoutes);

app.get("/fetchImages", async (req, res) => {
  try {
    const side = req.query.side;

    console.log(side);
    const auth = new google.auth.GoogleAuth({
      keyFile: "cred.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({
      version: "v3",
      auth,
    });

    let folderId;
    if (side === "bride") {
      folderId =
        "'1T44BI4QJaTRIhBHEWPEHVZKnpl-P7Qhd' in parents and mimeType contains 'image'";
    } else if (side === "groom") {
      folderId =
        "'1pXeE1RyDjUs4gSL2L5Q6ogp36TAre_kE' in parents and mimeType contains 'image'";
    } else {
      return res.status(400).json({ error: "Invalid side value" });
    }

    const response = await drive.files.list({
      q: folderId,
      fields: "files(id, name, webViewLink, thumbnailLink)",
    });

    res.json({ files: response.data.files });
  } catch (error) {
    console.log(error);
  }
});

app.get("/download/:id", async (req, res) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "cred.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({
      version: "v3",
      auth,
    });

    const fileId = req.params.id;

    drive.files
      .get({ fileId, alt: "media" }, { responseType: "stream" })
      .then((response) => {
        res.setHeader("Content-Disposition", "attachment; filename=file");
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

const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, callback) {
    const extention = file.originalname.split(".").pop();
    callback(null, `${file.filename}-${Date.now()}.${extention}`);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("files", "side"), async (req, res) => {
  try {
    
    const auth = new google.auth.GoogleAuth({
      keyFile: "cred.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    console.log(auth);
    const drive = google.drive({
      version: "v3",
      auth,
    });

    const side = req.query.side;

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

app.listen(5050, () => {
  console.log("Form running on port 5050");
});
