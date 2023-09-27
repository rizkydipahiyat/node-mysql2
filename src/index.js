const express = require("express");
const userRoutes = require("./routes/userRoutes");
const middlewareRequest = require("./middleware/logs");
const upload = require("./middleware/multer");
const extractPage = require("./middleware/page");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(middlewareRequest);
app.use(extractPage);

app.use("/img", express.static("uploads"));

app.use("/users", userRoutes);
app.post("/upload", upload.array("image"), (req, res) => {
  const urls = [];
  const { files } = req;
  for (const file of files) {
    const { filename } = file;
    urls.push(`/img/${filename}`);
  }
  res.status(200).json({
    status: "Created",
    message: urls,
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
