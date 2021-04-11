const net = require('net');
const fs = require('fs');

// Create server and set encoding
const server = net.createServer();

// Set what server does when new client connects
server.on('connection', (client) => {
  // Setup files list for everything avaliable
  fs.readdir('./fakeFiles', (err, files) => {
    if (err) {
      client.write(`Error: , ${err}`);
    } else {
      client.write('Current directory files: ');
      files.forEach(file => {
        client.write(file);
      });
    }
  });
  
  console.log('--- New Client Connected --- ');
  // Write to client when they connect
  client.write('Welcome to the Server!\n');
  client.write('Please enter a file name (with file extension) to search for: ');
  client.write('Type "list" for a list of all avaliable files');
  
  // Collect from client what they type. Set encoding to utf-8
  client.setEncoding('utf8');
  client.on('data', (data) => {
    if (data === 'list') {
      client.write('The below files are avaliable: ');

    }
    
    
    console.log(`Message from Client, look for this file: ${data}`);
    
  });
});

// Set up listening port
server.listen(3000, () => {
  console.log('Server is listening on Port 3000');
});

// Set up a way to search for .txt files locally
const listAllFiles = function(keyWord) {
  // Use data variable to look for the same file name in a specific folder locally
  if (keyWord === 'list') {
    fs.readdir('./fakeFiles', (err, files) => {
      if (err) {
        client.write(`Error: , ${err}`);
      } else {
        client.write('Current directory files: ');
        files.forEach(file => {
          client.write(file);
        });
      }
    });
  }
  return files;
};





