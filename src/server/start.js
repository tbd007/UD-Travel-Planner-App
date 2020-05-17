const app = require('./server.js')
port=5000;
const server = app.listen(port,()=>{
    console.log('server running');
     console.log(`running on localhost:${port}`)
 });
