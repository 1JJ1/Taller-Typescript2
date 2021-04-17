import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputMinCredits = document.getElementById("min-Cred");
var inputMaxCredits = document.getElementById("max-Cred");
var studentTbody = document.getElementById('students');
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(student) {
    console.log('Desplegando estudiante');
    student.forEach(function (stud) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + stud.information + "</td>\n                             <td>" + stud.value + "</td>";
        studentTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredits() {
    var text1 = inputMinCredits.value;
    var text2 = inputMaxCredits.value;
    text1 = (text1 == null) ? '' : text1;
    text2 = (text2 == null) ? '' : text2;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(text1, text2, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(credMin, credMax, courses) {
    var min = null;
    var max = null;
    if (credMin.length > 0) {
        min = parseInt(credMin);
    }
    if (credMax.length > 0) {
        max = parseInt(credMax);
    }
    return courses.filter(function (c) {
        if (min !== null && c.credits < min) {
            return false;
        }
        if (max !== null && c.credits > max) {
            return false;
        }
        return true;
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
