const Task = require("../models/Task");

// Get All Tasks for a User
exports.getTasks = async (req, res) => {
    let pageNumber = req.query.page_number ? Number(req.query.page_number) : 0
    try {
        const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(10).skip(pageNumber * 10) ;
        res.status(200).json({ tasks });
    } catch (error) {
        throw new Error({status:  500, message: error.message});
        // res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Add a New Task
exports.addTask = async (req, res) => {
    const { title, description } = JSON.parse(req.body.data);
    let fileLocation = ""
    if(req.files){
        fileLocation = req.files[0].path
    }
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        const task = await Task.create({
            title,
            description,
            userId: req.user.id,
            image: fileLocation
        });
        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a Task
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const data = JSON.parse(req.body.data);
    if(req.files){
        data.image = req.files[0].path
    }
    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, userId: req.user.id },data,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a Task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.deleteOne({ _id: id, userId: req.user.id });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
