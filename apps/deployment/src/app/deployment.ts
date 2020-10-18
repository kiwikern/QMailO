import { configure } from './configure';
import { setupFrontend } from './frontend-setup';
import { setupBackend } from './backend-setup';

export async function deploy() {
  const { domain, port } = await configure();
  await setupFrontend(domain);
  await setupBackend(domain, port);
}
