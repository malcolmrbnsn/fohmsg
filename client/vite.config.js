import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	server:{
		port: 3000,
		host: "127.0.0.1",
		hmr: {
			
		},
		proxy: {
			// '/socket.io': 'http://127.0.0.1:3001'
		}
	}
});
