app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();  
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

app.get('/students/:id', async (req, res) => {
  try {
    if(!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "This is not a valid id" });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

app.post('/students', async (req, res) => {
  try {
    const { name, course, marks } = req.body; 
    if (!name || !course) {
      return res.status(400).json({ message: "Name and course are required" });
    }
    
    const newStudent = await Student.create({ name, course, marks });
    res.status(201).json(newStudent);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ message: "Database error", error: error.message });
    }
});

app.put('/students/:id', async (req, res) => {
  try {
    if(!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "This is not a valid id" });
    }

    const changes = {};
    if (req.body.name !== undefined) {
      changes.name = req.body.name;
    }
    if (req.body.course !== undefined) {
      changes.course = req.body.course;
    }
    if (req.body.marks !== undefined) {
      changes.marks = req.body.marks;
    }

    const student = await Student.findByIdAndUpdate(req.params.id, changes, { new: true, runValidators: true });

    if(!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
    } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    if(!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "This is not a valid id" });
    }

    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted", student: deleted });
    } catch (error) {
    res.status(500).json({ message: "Database error", error: error.message });
  }
});