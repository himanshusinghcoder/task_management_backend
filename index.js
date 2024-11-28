const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();


const app = express();

app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));


let errorMiddle = (error, req, res, next) => {
    const statusCode = error.statusCode || 400   
    res.status(statusCode).json({status: 'fail', error: error.message})
}
   
app.use(errorMiddle)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
