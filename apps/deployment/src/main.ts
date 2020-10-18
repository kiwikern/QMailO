import { deploy } from './app/deployment';

(async () => {
  try {
    await deploy();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
