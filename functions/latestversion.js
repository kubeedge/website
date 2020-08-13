exports.handler = function(event, context, callback) {
    // your server-side functionality
	const latestVersion = "v1.4";
	callback(null, {
    		headers: {
      			"Access-Control-Allow-Origin": "*",
      			"Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
	      		"Access-Control-Allow-Headers": "*",
    		},
    		statusCode: 200,
    		body: latestVersion,
  	});
};
