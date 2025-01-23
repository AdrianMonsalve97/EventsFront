import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: 'https://localhost:666/swagger/v1/swagger.json', // URL accesible correctamente
    output: {
      target: './src/app/api/api-client.ts',
      client: 'angular',
    },
  },
});
