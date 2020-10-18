import { exec } from './exec-promise';
import * as ora from 'ora';

export async function setupBackend(domain, port) {
  const spinner = ora().start('Building backend');
  await exec(`npm run nx build api -- --maxWorkers 1 --memoryLimit 1000`);
  spinner.succeed('Backend built');

  spinner.start('Setting up backend as daemon');
  await exec(
    `echo -en "[program:qmailo]\\ncommand=node/home/${process.env.USER}/qmailo/dist/apps/api/main.js 2>&1\\nautostart=yes\\nautorestart=yes" >> /home/${process.env.USER}/etc/service.d/qmailo.ini`,
  );
  await exec(`supervisorctl reread`);
  await exec(`supervisorctl update`);
  await exec(
    `uberspace web backend set qmailo.${domain}/api --remove-prefix --http --port ${port}`,
  );
  spinner.succeed('Backend daemon started');
  spinner.stop();
}
