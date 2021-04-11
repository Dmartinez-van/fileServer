const net = require('net');
const stdin = process.stdin;

const conn = net.createConnection({
  host: 'localhost',
  port: 3000
});
conn.setEncoding('utf8');

// --- This is messing up the server.on('data') on server side
// conn.on('connect', () => {
//   conn.write('Hello! From Client.');
// });

conn.on('data', (data) => {
  console.log(`Server says: ${data}`);
});

stdin.on('data', (key) => {
  conn.write(key);
});
