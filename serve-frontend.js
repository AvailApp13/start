// Simple HTTP server for DriveAtHome frontend
// Serves static files to avoid file:// protocol issues

var http = require('http');
var fs = require('fs');
var path = require('path');

var port = 3000;
var rootDir = __dirname;

var mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

var server = http.createServer(function(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Parse URL - remove query string and hash
  var urlPath = req.url.split('?')[0].split('#')[0];
  var url = urlPath === '/' ? '/index.html' : urlPath;
  
  // Remove leading slash for path.join on Windows
  var relativePath = url.startsWith('/') ? url.substring(1) : url;
  var filePath = path.join(rootDir, relativePath);
  
  // Normalize path separators for Windows
  filePath = path.normalize(filePath);
  
  // Security: prevent directory traversal
  if (!filePath.startsWith(rootDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Check if file exists
  fs.stat(filePath, function(err, stats) {
    if (err || !stats.isFile()) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }

    // Read and serve file
    fs.readFile(filePath, function(err, data) {
      if (err) {
        res.writeHead(500);
        res.end('Server error');
        return;
      }

      var ext = path.extname(filePath).toLowerCase();
      var contentType = mimeTypes[ext] || 'application/octet-stream';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
});

server.listen(port, function() {
  console.log('========================================');
  console.log('DriveAtHome Frontend Server');
  console.log('========================================');
  console.log('Server running on: http://localhost:' + port);
  console.log('Open in browser: http://localhost:' + port);
  console.log('========================================');
  console.log('Press Ctrl+C to stop the server');
  console.log('');
});

// Handle errors
server.on('error', function(err) {
  if (err.code === 'EADDRINUSE') {
    console.error('ERROR: Port ' + port + ' is already in use!');
    console.error('Please close the application using port ' + port + ' and try again.');
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});


