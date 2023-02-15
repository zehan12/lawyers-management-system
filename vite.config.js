import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
// import vitePluginImp from 'vite-plugin-imp';
// import { getThemeVariables } from 'antd/dist/theme';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: 'antd',
    //       style: (name) => `antd/es/${name}/style`,
    //     },
    //   ],
    // }),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      // "@": path.resolve(__dirname, "./src"),
      { find: /^~/, replacement: "" },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: { 'primary-color': '#13c2c2' },
        // modifyVars: getThemeVariables({
        //   dark: true,
        //   // compact: true,
        // }),
        modifyVars: {
          "primary-color": "#7e1232",
          "heading-color": "#7e1232",
        },

        javascriptEnabled: true,
      },
    },
  },
})
