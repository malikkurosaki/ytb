
// const { generateProxy } = require("@wonoly/proxy-geneerator");

// ;(async () => {
//     var proxy = await generateProxy();
//     console.log(proxy)
    
// })();

const shelljs = require('shelljs');

let s = shelljs.exec('./x').stdout;

console.log(s)