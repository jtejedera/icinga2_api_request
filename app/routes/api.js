process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const axios = require('axios');
const btoa = require('btoa')

module.exports = function(express) {

	const apiRouter = express.Router();

	const username = 'icingaadmin',
		password = 'icinga2',
		basicAuth = 'Basic ' + btoa(username + ':' + password);

	apiRouter.get('/activeEvents', function(req, res){
		axios.get('http://localhost/icingaweb2/monitoring/list/services?service_problem=1|host_problem=1&sort=service_last_state_change&modifyFilter=1', {
			headers : {
				'Content-Type' : 'application/json',
				'Accept' : 'application/json',
				'Authorization' : basicAuth
				}
			})
			.then(response => res.json({ success: true, data: response.data }))
			.catch(error => res.json({ success: false, data: error.message}));	
	})

	return apiRouter;
}

