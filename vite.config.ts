import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      throwOnError: false, // Isso impede que o build seja interrompido devido a erros de lint
      throwOnWarning: false, // Opcional: se você também não quiser interromper o build por warnings
      // ... outras opções se necessário
    }),
  ],
});

