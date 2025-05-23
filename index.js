const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const connectToMongo = require("./config/db.js");

connectToMongo();

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  console.log("request hit");
  return res.status(200).send("Welcome To The Back-End");
});

<<<<<<< HEAD
app.use("/api/v1/user", require("./routes/user.js"));
app.use("/api/v1/role", require("./routes/roleType.js"));
app.use("/api/v1/config", require("./routes/config.js"));
app.use("/api/v1/destinations", require("./routes/destinations.js"));
app.use("/api/v1/video", require("./routes/video.js"));
app.use("/api/v1/location", require("./routes/location.js"));

/* cloudinary.config({
=======
app.use("/user", require("./routes/user.js"));
app.use("/role", require("./routes/roleType.js"));
app.use("/config", require("./routes/config.js"));
app.use("/destinations", require("./routes/destinations.js"));
app.use("/video", require("./routes/video.js"));

cloudinary.config({
>>>>>>> c26ddf2af5e2ff8fd3d0becded9c81543af29267
  cloud_name: "drp5eeosr",
  api_key: "613279887455942",
  api_secret: "K_RKVzf7sGUeewIns6nIieVUPos",
});

const upload2 = multer({ dest: "uploads/" }); // Destination folder for multer to store temporary files

<<<<<<< HEAD
app.post("/video/upload", upload2.single("media"), (req, res) => {
  const media = req.file.path; // Path to the uploaded file
  console.log("Uploaded media path:", media);
  console.log("Request body:", req.body);
  console.log("Request file:", req.file);

  cloudinary.uploader.upload(
    media,
    { resource_type: "video" },
    (error, result) => {
      // Delete the temporary file uploaded by multer
      fs.unlinkSync(media);

      if (error) {
        console.error(error);
        return res.status(500).json({
          error: error.message,
          message: "Something went wrong while uploading media",
        });
      } else {
        console.log(result);
        return res.status(201).json({ result });
      }
    }
  );
}); */
=======
app.post("/video/upload", upload2.single("image"), (req, res) => {
  const image = req.file.path; // Path to the uploaded file
  console.log("Uploaded image path:", image);

  cloudinary.uploader.upload(image, (error, result) => {
    // Delete the temporary file uploaded by multer
    fs.unlinkSync(image);

    if (error) {
      console.error(error);
      return res.status(500).json({
        error: error.message,
        message: "Something went wrong while uploading image",
      });
    } else {
      console.log(result);
      return res.status(201).json({ result });
    }
  });
});
>>>>>>> c26ddf2af5e2ff8fd3d0becded9c81543af29267

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
