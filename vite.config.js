import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function projectsPlugin() {
  const projectsDir = path.resolve(__dirname, 'public/projects')

  function buildManifest() {
    if (!fs.existsSync(projectsDir)) return []

    const folders = fs.readdirSync(projectsDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)

    const projects = []
    for (const folder of folders) {
      const configPath = path.join(projectsDir, folder, 'project.json')
      if (!fs.existsSync(configPath)) continue

      try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
        projects.push({ id: folder, ...config })
      } catch (e) {
        console.warn(`[projects] Failed to parse ${configPath}:`, e.message)
      }
    }

    return projects
  }

  return {
    name: 'vite-plugin-projects',
    resolveId(id) {
      if (id === 'virtual:projects') return '\0virtual:projects'
    },
    load(id) {
      if (id === '\0virtual:projects') {
        const projects = buildManifest()
        return `export default ${JSON.stringify(projects)};`
      }
    },
    configureServer(server) {
      if (fs.existsSync(projectsDir)) {
        server.watcher.add(projectsDir)
      }
      server.watcher.on('change', (filePath) => {
        const normalized = filePath.replace(/\\/g, '/')
        if (normalized.includes('/projects/') && normalized.endsWith('project.json')) {
          const mod = server.moduleGraph.getModuleById('\0virtual:projects')
          if (mod) {
            server.moduleGraph.invalidateModule(mod)
          }
          server.ws.send({ type: 'full-reload' })
        }
      })
    }
  }
}

export default {
  plugins: [react(), projectsPlugin()],
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
