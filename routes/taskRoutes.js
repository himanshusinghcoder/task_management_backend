const express = require("express");
const { getTasks, addTask, updateTask, deleteTask } = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");
const fileUpload = require("../middleware/fileUpload");
const { handleError } = require("../middleware/errorHandler");
const router = express.Router();

router.use(authMiddleware);
router.get("/", handleError(getTasks));
router.post("/", fileUpload, handleError(addTask));
router.put("/:id", fileUpload, handleError(updateTask));
router.delete("/:id", handleError(deleteTask));

module.exports = router;