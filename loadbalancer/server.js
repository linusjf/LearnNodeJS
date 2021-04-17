// server.js
const http = require('http');
const pid = process.pid;

http.createServer((req, res) => {
  // simulate CPU work
  for (let i=0; i<1e7; i++);
  res.write(`Handled by process ${pid}\n`);
  res.write(`Users: ${usersCount}`);
  res.end(`Handled by process ${pid}`);
}).listen(8080, () => {
  console.log(`Started process ${pid}`);
});
process.on('message', msg => {
  console.log(`Message from master: ${JSON.stringify(msg)}`);
  if (typeof msg.usersCount !== 'undefined') {
  console.log(`User count from master: ${msg.usersCount}`);
    usersCount = msg.usersCount;
  }
});
