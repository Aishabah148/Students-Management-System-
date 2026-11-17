
// 1. GET ELEMENTS FROM HTML
const studentForm = document.querySelector("#student-form");
const studentName = document.querySelector("#student-name");
const studentAge = document.querySelector("#student-age");
const studentCourse = document.querySelector("#student-course");
const studentMarks = document.querySelector("#student-marks");
const studentList = document.querySelector("#student-list");
const searchInput = document.querySelector("#search-input");



// 2. STUDENTS ARRAY
// Get saved students from localStorage.
// If there are no saved students, use an empty array.
let students = JSON.parse(localStorage.getItem("students")) || [];
//         localStorage
            //  ↓
    //  "Do I have students?"
            //  ↓
    //    ┌─────┴─────┐
    //    ↓           ↓
    //  YES           NO
    //    ↓           ↓
//  get the data     null
    //    ↓           ↓
//  JSON.parse()     []
    //    ↓           ↓
    //    └─────┬─────┘
            //  ↓
        //   students



// 3. DISPLAY STUDENTS
function displayStudents(studentsToDisplay = students) {
    // This create a function called display students;it jobe is to take the students data and store it in the browser
    studentList.innerHTML = "";
    // This mean clear everything currently inside the student list . 

    studentsToDisplay.forEach(function (student) {
        // This go throung each student in the Array one by one.
        const studentCard = document.createElement("div");

        studentCard.className =
            "bg-white p-5 rounded-lg shadow";   

        studentCard.innerHTML = `
            <h3 class="text-xl font-bold">${student.name}</h3>

            <p>Age: ${student.age}</p>
            <p>Course: ${student.course}</p>
            <p>Marks: ${student.marks}</p>
            <p class="text-gray-500">
                Applied: ${student.applyTime}
            </p>

            <div class="flex gap-3 mt-4">
                <button
                    onclick="editStudent(${student.id})"
                    class="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Edit
                </button>


                <button
                    onclick="deleteStudent(${student.id})"
                    class="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Delete
                </button>
            </div>
        `;

        studentList.appendChild(studentCard);
        // This mean put this students card inside the student-list container.
    });
}



// 4. ADD STUDENT
studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newStudent = {
        id: Date.now(),
        name: studentName.value,
        age: studentAge.value,
        course: studentCourse.value,
        marks: studentMarks.value,
        applyTime: new Date().toLocaleString()
    };

    students.push(newStudent);
    // add a new student

    saveStudents();

    displayStudents();

    studentForm.reset();
});



// 5. SAVE STUDENTS
function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}



// 6. DELETE STUDENT
function deleteStudent(id) {
    students = students.filter(function (student) {
        return student.id !== id;
    });

    saveStudents();

    displayStudents();
}


// 7. EDIT STUDENT
function editStudent(id) {
    const student = students.find(function (student) {
        return student.id === id;
    });

    if (!student) return;

    studentName.value = student.name;
    studentAge.value = student.age;
    studentCourse.value = student.course;
    studentMarks.value = student.marks;

    students = students.filter(function (student) {
        return student.id !== id;
    });

    saveStudents();

    displayStudents();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// 8. SEARCH STUDENTS
searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase();

    const filteredStudents = students.filter(function (student) {
        return (
            student.name.toLowerCase().includes(searchText) ||
            student.course.toLowerCase().includes(searchText)
        );
    });

    displayStudents(filteredStudents);
});


// 9. SHOW SAVED STUDENTS
// When the page opens, display students
// that are already saved.
displayStudents();