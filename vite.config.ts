
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'vaul@1.1.2': 'vaul',
        'figma:asset/bdbdb9e96e0c5fc635919289bd77ed6257ab9994.png': path.resolve(__dirname, './src/assets/bdbdb9e96e0c5fc635919289bd77ed6257ab9994.png'),
        'figma:asset/983aef9ca835aa855480359e8280e9e504dc61d3.png': path.resolve(__dirname, './src/assets/983aef9ca835aa855480359e8280e9e504dc61d3.png'),
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });