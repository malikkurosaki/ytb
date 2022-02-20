
// const { generateProxy } = require("@wonoly/proxy-geneerator");

// ;(async () => {
//     var proxy = await generateProxy();
//     console.log(proxy)
    
// })();

const shelljs = require('shelljs');

let s = shelljs.exec('pm2 -v').stdout;

console.log(s)