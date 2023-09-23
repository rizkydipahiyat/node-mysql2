const express = require("express");
const userRoutes = require("./routes/userRoutes");
const middlewareRequest = require("./middleware/logs");
const upload = require("./middleware/multer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(middlewareRequest);

app.use("/img", express.static("uploads"));

app.use("/users", userRoutes);
app.post("/upload", upload.single("image"), (req, res) => {
  res.status(200).json({
    status: "Created",
    message: "Upload Successfully",
  });
});

app.use((err, req, res, next) => {
  res.status(413).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
