import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: './src/Swagger/eventosswagger.json', // Ruta local correcta al archivo swagger.json
    output: {
      target: './src/app/api/api-client.ts', // Ubicación de salida para el cliente generado
      client: 'angular', // Generar cliente para Angular
    },
  },
});
