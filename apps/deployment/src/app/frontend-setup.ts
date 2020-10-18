import * as ora from 'ora';
import { exec } from './exec-promise';
import { promises as fs } from 'fs';

export async function setupFrontend(domain: string) {
  const spinner = ora().start('Building the frontend bundle');
  await exec('npm run build');
  spinner.succeed('Frontend bundled');

  spinner.start('Publishing frontend');
  await moveFrontendBundle(domain);

  const { stdout, stderr } = await exec(`uberspace web domain add ${domain}`);
  spinner.info(stdout);
  if (stderr) {
    console.error(stderr);
  }
  spinner.succeed(`Frontend published under ${domain}`);
  spinner.stop();
}

async function moveFrontendBundle(domain) {
  const bundlePath = `/home/${process.env.USER}/qmailo/dist/apps/qmailo/`;
  const targetPath = `/var/www/virtual/${process.env.USER}/${domain}`;
  try {
    await fs.access(bundlePath);
  } catch (e) {
    throw new Error(`Frontend was not bundled under ${bundlePath}.`);
  }
  try {
    await fs.access(targetPath);
    // noinspection ExceptionCaughtLocallyJS
    throw { fileExists: true };
  } catch (e) {
    if (e?.fileExists) {
      throw new Error(`Frontend already exists. Please remove ${targetPath}.`);
    }
    // Otherwise the folder does not exist -> fine
  }
  await fs.rename(bundlePath, targetPath);
}
