
 const locations = [
 { locID: 1, name: "Banglore" },
 { locID: 2, name: "Hyderabad" },
 { locID: 3, name: "Chennai" },
 { locID: 4, name: "Mumbai" },
 { locID: 5, name: "Nellore" }
 ]

const salaries = [
 { locID: 1, amount: 100000 },
 { locID: 2, amount: 70000 },
 { locID: 3, amount: 10000 },
 { locID: 4, amount: 130000 },
 { locID: 5, amount: 50000 }
]

const employees = [
 { id: 1010, name: "Ajay",locID: 1},
 { id: 1011, name: "Raiyan",locID: 2},
 { id: 1012, name: "Siddhu",locID: 4},
 { id: 1013, name: "Sreekar",locID: 5}
 ]



 employees.forEach((emp) => {
 const location = locations.find((loc) => loc.locID === emp.locID)
 const salary = salaries.find((sal) => sal.locID === emp.locID)
 console.log(`Employee ${emp.name} working in ${location.name} has a salary of ${salary.amount}`)
 })

