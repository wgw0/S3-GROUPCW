import * as crypto from "crypto";
import fetch from 'node-fetch'
import { promises as fs } from 'fs';
import { time } from "console";

// utility fn to load a json file (oh how it was easy when we could just `require`)
const load = async (file) => JSON.parse(await fs.readFile(file, "utf8"));

const data = await load('./config/data.json');
const options = { headers: await load('./config/headers.json') };

const host = 'https://t-esbprep-apigw.port.ac.uk';
const basePath = '/gateway/BiDataWarehouseSitsCourseModuleAssessmentAPI';

async function getTutorial(studentID) {
  const route = `student/SOC/tutorial/${studentID}/${data.years.sep22}`;
  const url = `${host}${basePath}/${route}`;

  console.log(url);
  
  const result = await fetch(url, options);
  return await result.json();
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

for (const student in data.studentID){
  await timeout(500);
  const tutorial = await getTutorial(data.studentID[student]);
  console.log(tutorial);
}

