import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 3000,
    //get rid of the CORS err 
    proxy: {
      '/api': {
        target: 'https://linkup-e9b3bmgwfygzb3dc.centralindia-01.azurewebsites.net',
        changeOrigin: true,
        secure: false,  // allow proxying HTTPS requests to the server
      }
    }
  }

})
