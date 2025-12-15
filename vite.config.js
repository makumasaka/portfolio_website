import react from '@vitejs/plugin-react'

export default {
    plugins: [react()],
    server: {
        host: true,
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env)
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        sourcemap: true
    },
}