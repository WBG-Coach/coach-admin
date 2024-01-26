import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dsv from '@rollup/plugin-dsv';
import path from 'path';

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: `/${process.env.VITE_COUNTRY}/admin/`,
    plugins: [react(), dsv()],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    mode: 'development',
    build: {
      minify: false,
    },
    define: {
      'process.env': {},
    },
  });
};
