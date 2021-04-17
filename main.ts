import { Course } from './course.js';
import { Student } from './student.js';

import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;

const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputMinCredits: HTMLInputElement = <HTMLInputElement> document.getElementById("min-Cred")!;
const inputMaxCredits: HTMLInputElement = <HTMLInputElement> document.getElementById("max-Cred")!;

let studentTbody: HTMLElement = document.getElementById('students')!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInTable(student: Student[]): void {
    console.log('Desplegando estudiante');
    student.forEach((stud) => {
      let trElement = document.createElement("tr");
      trElement.innerHTML = `<td>${stud.information}</td>
                             <td>${stud.value}</td>`;
      studentTbody.appendChild(trElement);
    });
  }
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredits() { 
    let text1 = inputMinCredits.value;
    let text2 = inputMaxCredits.value;
    text1 = (text1 == null) ? '' : text1;
    text2 = (text2 == null) ? '' : text2;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredits(text1, text2, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCredits(credMin: string, credMax: string, courses: Course[]): Course[]{
    let min : number|null = null;
    let max : number|null = null;
    if (credMin.length > 0){
        min = parseInt(credMin);
    }
    if (credMax.length > 0){
        max = parseInt(credMax);
    }

    return courses.filter( (c : Course) : boolean =>{
        if(min !== null && c.credits < min){
            return false;
        }
        if(max !== null && c.credits > max){
            return false;
        }
        return true;
    })
  }


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}