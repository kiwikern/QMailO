import { DistinctQuestion, prompt } from 'inquirer';
import { generateRandomToken, hashPassword } from './secrets';
import { writeEnv } from './env-writer';
import { homedir } from 'os';

const portQuery: DistinctQuestion = {
  name: 'port',
  type: 'input',
  message: 'What port do you want to use?',
  default: 30000,
  filter: (input) => parseInt(input, 10),
  validate: (input) => Number.isInteger(input),
};

const passwordQuery: DistinctQuestion = {
  name: 'password',
  type: 'password',
  message: 'Choose a strong password for QmailO.',
  validate: (input) =>
    input.length >= 8 || 'Password must have at least 8 characters.',
};

const passwordRepeatQuery: DistinctQuestion = {
  name: 'passwordRepeat',
  type: 'password',
  message: 'Repeat the password',
  validate: (input, answers) =>
    input === answers['password'] || 'Password does not match',
};

const languageQuery: DistinctQuestion = {
  name: 'language',
  type: 'list',
  message: 'Select a language for the QmailO website',
  choices: ['English', 'German'],
  default: 'English',
};

export async function configure(): Promise<{ port: number; domain: string }> {
  const answers = await prompt([
    passwordQuery,
    passwordRepeatQuery,
    portQuery,
    languageQuery,
  ]);
  await writeEnv({
    JWT_SECRET: await generateRandomToken(),
    PASSWORD_HASH: await hashPassword(answers.password),
    PORT: answers.port,
    QMAILO_PATH: homedir(),
  });
  return {
    port: answers.port,
    domain: `qmailo.${process.env.USER}.uber.space`,
  };
}
