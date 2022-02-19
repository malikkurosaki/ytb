
const { generateProxy } = require("@wonoly/proxy-geneerator");

;(async () => {
    var proxy = await generateProxy();
    console.log(proxy)
    
})();