const https = require('https');
const Agent = require('agentkeepalive').HttpsAgent;
const keepaliveAgent = new Agent({
  maxSockets: 1,
  freeSocketTimeout: 30000, 
});

const makeRequest = (io) => { 
    const options = {
        host: 'localhost',
        port: 5665,
        auth: 'root:88e6a11c45f638a9',
        path: '/v1/events?queue=cr&types=StateChange',
        method: 'POST',
        agent: keepaliveAgent,
        headers: {
            'Accept': 'application/json'
        }
      };    

    const req = https.request(options, res => {
        res.setEncoding('utf8');
        res.on('data', chunk => {
            if(chunk.length != 1){
                let resu = JSON.parse(chunk);	
                switch (resu.state) {
                    case 0:
                        resu.state = "OK";
                        break;
                    case 1:
                        resu.state = "Warning";
                        break;
                    case 2:
                        resu.state = "Critical";
                        break;
                    case 3:
                        resu.state = "Unknown";
                        break;
                }                     
                io.emit('pullNewEvent', resu);
            }
        });
    });
    req.on('error', e => {
        keepaliveAgent.setCurrentStatus();
        makeRequest();
    });
    req.end();

    setInterval(() => {
        if (keepaliveAgent.statusChanged) {
          if(keepaliveAgent.getCurrentStatus().resetStatus != 0){
              keepaliveAgent.setCurrentStatus();
              makeRequest(io);
          }	
        }
    }, 180000);    
}

module.exports = {
    makeRequest
}