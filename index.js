const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// View Engine
app.set("view engine", "ejs");

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// Multer Middleware
const upload = multer({
    storage: storage
});

// Home Page
app.get("/", (req, res) => {
    res.render("homepage");
});

// Upload Route
app.post("/upload", upload.single("image"), (req, res) => {

    if (!req.file) {
        return res.send("No file uploaded.");
    }
//for multi-image in one response  
/*
app.post("/upload", upload.array("images", 5), (req, res) => {

    console.log(req.files);
});*/  

    res.render("success", {
        file: req.file
    });

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});