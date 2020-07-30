/* eslint-disable no-control-regex */
const { execSync } = require('child_process');
const chalk = require('chalk');
const path = require('path');

const retrieveCols = (() => {
  let result = false;

  return () => {
    if (result) {
      return result;
    }
    const defaultCols = 80;
    try {
      const terminalCols = execSync('tput cols', {
        stdio: ['pipe', 'pipe', 'ignore']
      });
      result = parseInt(terminalCols.toString(), 10) || defaultCols;
    } catch (e) {
      result = defaultCols;
    }
    return result;
  };
})();

const print = (color = null) => (str = '') => {
  const terminalCols = retrieveCols();
  const strLength = str.replace(/\u001b\[[0-9]{2}m/g, '').length;
  const leftPaddingLength = Math.floor((terminalCols - strLength) / 2);
  const leftPadding = ' '.repeat(Math.max(leftPaddingLength, 0));

  console.log(leftPadding, color ? chalk[color](str) : str);
};

const printGithub = (githubUsers) => {
  const users = [];
  print()(chalk.bold('GitHub'));
  if (typeof githubUsers === 'string') {
    users.push(githubUsers);
  } else {
    users.push(...githubUsers);
  }
  users.forEach((user) => {
    const link = `https://github.com/users/${user}/sponsorship`;
    print()(`${user}: ${chalk.underline(link)}`);
  });
};

module.exports = (fundingConfig, pkgPath) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const packageJson = require(`${path.resolve(pkgPath)}/package.json`);
  const dim = print('dim');
  const yellow = print('yellow');
  const emptyLine = print();

  yellow(`Thanks for installing ${packageJson.name}`);
  dim(
    `Please consider donating to help ${typeof packageJson.author === 'string' ? packageJson.author : packageJson.author.name} maintain this package.`
  );
  emptyLine();
  emptyLine();

  const keys = Object.keys(fundingConfig);
  for (let i = 0; i < keys.length; i += 1) {
    const platform = keys[i];
    const value = fundingConfig[platform];
    switch (platform) {
      case 'github':
        printGithub(value);
        break;
      case 'patreon':
        print()(chalk.bold('Patreon'));
        print()(`${chalk.underline(`https://patreon.com/${value}`)}`);
        break;
      case 'open_collective':
        print()(chalk.bold('Open Collective'));
        print()(`${chalk.underline(`https://opencollective.com/${value}`)}`);
        break;
      case 'ko_fi':
        print()(chalk.bold('Ko Fi'));
        print()(`${chalk.underline(`https://ko-fi.com/${value}`)}`);
        break;
      case 'tidelift':
        print()(chalk.bold('Tidelift'));
        print()(`${chalk.underline(`https://tidelift.com/funding/github/${value}`)}`);
        break;
      case 'custom':
        print()(chalk.bold('Sponsorship'));
        print()(`${chalk.underline(value)}`);
        break;
      default:
        break;
    }
  }

  emptyLine();
};
