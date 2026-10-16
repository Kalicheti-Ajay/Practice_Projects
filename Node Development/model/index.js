const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: String, required: true },
  marks: { type: Number, default: 0, min: 0, max: 100 },
});

const Student = mongoose.model('Student', studentSchema);