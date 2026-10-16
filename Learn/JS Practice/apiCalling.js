function getStudent() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({id:556,name:"Ajay"}),1000)
    })
}

function getMarks(studentId){
    return new Promise((resolve) => {
        setTimeout(() => resolve({id:556,marks:91}),1000)
    })
}

getStudent()
    .then((student) => {
        console.log("Students details found")
        console.log(student)

        return getMarks(student.id)
        }
    )
    .then((marksDetails) => {
        console.log("Marks found for the Student")
        console.log(marksDetails)
    })
    .catch((err) => {
        console.log(err.message)
    })
    .finally(()=>{
        console.log("Student Details retrieved successfully")
    })