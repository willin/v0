const { parseFundingFile } = require('./utils');
const print = require('./print');

module.exports = async (path = process.cwd()) => {
  try {
    const fundingConfig = await parseFundingFile(path);
    print(fundingConfig, path);
  } catch (e) {
    console.error(e);
  }
};
