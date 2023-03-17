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
function getModMents(module) {

  const mCode = module.module.code;
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
 * const courses = await getCourses();
 * const courseInfo = await getCourseInfo(courses);
 * const moduleInfo = await getModule();
 * const moduleAssesments = await getModMents(moduleInfo);
*/

for (const student in data.students) {
  const studentInfo = await getStudentInfo(data.students[student]);
  console.log(studentInfo); 
}