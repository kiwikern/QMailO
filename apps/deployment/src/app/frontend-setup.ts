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
  console.log(stdout);
  console.error(stderr);
  spinner.succeed(`Frontend published under ${domain}`);
  spinner.stop();
}

async function moveFrontendBundle(domain) {
  const bundlePath = `/home/${process.env.USER}/qmailo/dist/apps/qmailo/`;
  const targetPath = `/var/www/virtual/${process.env.USER}/${domain}`;
  if (!fs.access(bundlePath)) {
    throw new Error(`Frontend was not bundled under ${bundlePath}.`);
  }
  if (fs.access(targetPath)) {
    throw new Error(`Frontend already exists. Please remove ${bundlePath}.`);
  }
  await exec(`mv ${bundlePath} ${targetPath}`);
}
