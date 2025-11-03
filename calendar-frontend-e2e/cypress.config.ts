import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'npx nx run calendar-frontend:serve',
        production: 'npx nx run calendar-frontend:preview',
      },
      ciWebServerCommand: 'npx nx run calendar-frontend:preview',
      ciBaseUrl: 'http://192.168.1.202:4004',
    }),
    viewportWidth: 1200,
    viewportHeight: 1200,
    baseUrl: 'http://192.168.1.202:4004',
  },
});
