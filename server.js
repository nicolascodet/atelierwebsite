// Custom Next.js server with SSL certificate fixes for development
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const net = require('net')

// Set NODE_TLS_REJECT_UNAUTHORIZED for development
if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  console.log('⚠️ SSL certificate validation disabled for development')
}

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
let port = parseInt(process.env.PORT || '3000', 10)

// Function to check if a port is in use
const isPortInUse = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer()
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true)
      } else {
        resolve(false)
      }
    })
    
    server.once('listening', () => {
      server.close()
      resolve(false)
    })
    
    server.listen(port)
  })
}

// Find an available port
const findAvailablePort = async (startPort) => {
  let currentPort = startPort
  
  while (await isPortInUse(currentPort)) {
    console.log(`Port ${currentPort} is in use, trying ${currentPort + 1}`)
    currentPort++
    
    if (currentPort - startPort > 10) {
      throw new Error('Could not find an available port after 10 attempts')
    }
  }
  
  return currentPort
}

// Initialize Next.js and start server
const startServer = async () => {
  try {
    // Find an available port
    port = await findAvailablePort(port)
    
    // Initialize Next.js
    const app = next({ dev, hostname, port })
    const handle = app.getRequestHandler()
    
    await app.prepare()
    
    createServer(async (req, res) => {
      try {
        // Parse the request URL
        const parsedUrl = parse(req.url, true)
        
        // Let Next.js handle the request
        await handle(req, res, parsedUrl)
      } catch (err) {
        console.error('Error occurred handling', req.url, err)
        res.statusCode = 500
        res.end('Internal Server Error')
      }
    }).listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://${hostname}:${port}`)
    })
  } catch (err) {
    console.error('An error occurred starting the server:', err)
    process.exit(1)
  }
}

startServer()
