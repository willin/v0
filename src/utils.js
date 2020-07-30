const fs = require('fs');
const YAML = require('yaml');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const access = promisify(fs.access);

exports.parseFundingFile = async (path = process.cwd()) => {
  const pathToFile = `${path}/.github/FUNDING.yml`;
  try {
    await access(pathToFile, fs.constants.R_OK);
  } catch (e) {
    // throw new Error('FUNDING.yml file not found');
    return { github: 'willin', custom: ['https://paypal.me/willinwang'] };
  }

  const fileContent = await readFile(pathToFile, 'utf-8');
  const yamlDoc = YAML.parse(fileContent);
  return yamlDoc;
};
