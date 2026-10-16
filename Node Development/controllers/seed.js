
export async function seedIfEmpty() {
    const count = await Student.countDocuments();
    if (count > 0) return;
    
    await student.insertMany([
        { name: 'Alice', course: 'Math', marks: 85 },
        { name: 'Bob', course: 'Science', marks: 90 },
        { name: 'Charlie', course: 'History', marks: 78 },
    ]);
    console.log('Added 3 starter students.');
}