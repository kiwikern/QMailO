import { exec } from './exec-promise';
import * as ora from 'ora';

export async function setupBackend(domain, port) {
  const spinner = ora().start('Setting up backend');
  await exec(
    `echo "[program:qmailo]\ncommand=npm run nx serve api --prefix /home/${process.env.USER}/qmailo 2>&1\nautostart=yes\nautorestart=yes" >> /home/${process.env.USER}/etc/service.d/qmailo.ini`,
  );
  await exec(`supervisorctl reread`);
  await exec(`supervisorctl update`);
  await exec(
    `uberspace web backend set qmailo.${domain}/api --remove-prefix --http --port ${port}`,
  );
  spinner.succeed('Backend started');
  spinner.stop();
}
