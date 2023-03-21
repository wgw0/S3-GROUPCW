import * as crypto from "crypto";
import fetch from 'node-fetch';
import { promises as fs, read, readFile } from 'fs';

// utility fn to load a json file (oh how it was easy when we could just `require`)
const load = async (file) => JSON.parse( await fs.readFile(file, "utf8") );

const data = await load('./config/data.json');
const options = { headers: await load('./config/headers.json') };

const host = 'https://t-esbprep-apigw.port.ac.uk';
const basePath = '/gateway/BiDataWarehouseSitsCourseModuleAssessmentAPI';

// API request for information about API
function getInfo() {

  return getRequest("/info");
}

// API request for courses data
function getCourses() {

  const route = `courses/${data.depts.comp}/${data.years.sep22}`;
  return getRequest(route);
}

// API request for specific course data
function getCourseInfo(cs) {

  // choose random course code
  const rancose = Math.floor(Math.random() * cs.courseList.length);
  console.log(`Randomly chosen course code: ${cs.courseList[rancose].code}, year: ${cs.courseList[rancose].academicYear}`);

  const cCode = cs.courseList[rancose].code;
  const cYear = encodeURIComponent(cs.courseList[rancose].academicYear);
  const route = `course/${cCode}/${cYear}`;

  return getRequest(route);
}

// API request for specific module data
function getModule() {

  const mCode = "M30236";
  const mYear = data.years.sep23;
  const route = `module/${mCode}/${mYear}`;

  return getRequest(route);
}


// API request for module assesments
function getModMents() {

  const mCode = "M30236";
  const mYear = data.years.sep22;
  const route = `module/assessments/${mCode}/${mYear}`;
  
  return getRequest(route);
}

// API request for retrieving student info
function getStudentInfo(id) {

  const route = `student/SOC/tutorial/${id}/${data.years.sep22}`;
  return getRequest(route);
}

// This is a shorthand code, instead of writing the same thing on each function
// i.e. `return getRequest(route)`
async function getRequest(route) {
  
  const url = `${host}${basePath}/${route}`;
  const result = await fetch(url, options);
  return await result.json();
}

/**
 * const info = await getInfo();
 * const courses = await getCourses();
 * const courseInfo = await getCourseInfo();
 * const moduleInfo = await getModule();
 * const moduleAssesments = await getModMents(moduleInfo);
*/

const STUDENTS = [];

/* 
* loop over each student and send a request
* If the response is null, ignore it and 
* only store the existing student data into STUDENTS array
*/
for (const student in data.students) {
  const studentInfo = await getStudentInfo(data.students[student]);
  if (studentInfo.studentModules === null) {
    console.log(`${student} - The student id cannot be reached.`);
    continue;
  }
  STUDENTS.push(studentInfo);
}

// loop over each student and each of their modules
for (const student in STUDENTS) {
  const studentModules = STUDENTS[student].studentModules.modules;
  for (const module in studentModules) {
    console.log(studentModules[module]);
  }
}

const jsonData = {
  student: 1,
  module: "",
  type: '',
  points: 100
};

// get response about student's marks from both the courseworks and exams

// push the response as object into .json file

/*
const studentInfoArray = [];

for (const student in data.students) {
  setTimeout(async () => {
    const studentInfo = await getStudentInfo(data.students[student]);
    studentInfoArray.push(studentInfo);
    console.log(studentInfo); 
    if (studentInfoArray.length === Object.keys(data.students).length) {
      const studentInfoJSON = JSON.stringify(studentInfoArray);
      const fs = require('fs');
      fs.writeFile('studentInfo.json', studentInfoJSON, (err) => {
        if (err) throw err;
        console.log('Student information saved to studentInfo.json');
      });
    }
  }, 3000);
}
 */