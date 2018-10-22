/* @flow */

const numCPUs = require('os').cpus().length;
const cluster = require('cluster');


function forkWorkers(num) {
  
  for (let i = 0; i < num; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork numCPUs - 1 workers
  forkWorkers(numCPUs-1)
  require('./view')
} 
else {
  require('./server')
  console.log(`Worker ${process.pid} started`);
}


