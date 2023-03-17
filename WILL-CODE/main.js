import * as crypto from "crypto";

import fetch from 'node-fetch'
import { promises as fs } from 'fs';

// utility fn to load a json file (oh how it was easy when we could just `require`)
const load = async (file) => JSON.parse( await fs.readFile(file, "utf8") );

const data = await load('./config/data.json');
const options = { headers: await load('./config/headers.json') };

const host = 'https://t-esbprep-apigw.port.ac.uk';
const basePath = '/gateway/BiDataWarehouseSitsCourseModuleAssessmentAPI';


async function getCourses() {

  const route = `courses/${data.depts.comp}/${data.years.sep22}`;
  const url = `${host}${basePath}/${route}`;

  const result = await fetch(url, options);
  return await result.json();
}

async function moduleAssesment() {

  const route = `courses/${data.depts.comp}/${data.years.sep22}`;
  const url = `${host}${basePath}/${route}`;

  const result = await fetch(url, options);
  return await result.json();
}

const courses = await getCourses();
const moduleAsses = await moduleAssesment();
console.log(moduleAsses);
console.log(courses);