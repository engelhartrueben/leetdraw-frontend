import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

declare const __VITE_BACKEND_URL__: string
declare const __VITE_BACKEND_PORT__: string

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	return {
		  plugins: [react()],
		  server: {
			  headers: {
				  "X-Content-Type-Options": "nosniff",
			  },
			  proxy: {
			      '/api': 'http://100.92.75.123:8000',
			  }
			  
		  },
		  define: {
			  __VITE_BACKEND_URL__: JSON.stringify(env.VITE_BACKEND_URL),
			  __VITE_BACKEND_PORT__: JSON.stringify(env.VITE_BACKEND_PORT),
		  },
	}
})
