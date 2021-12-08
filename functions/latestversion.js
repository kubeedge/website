exports.handler = function(event, context, callback) {
    // Set the latest version here.
    const latestVersion = "v1.9.0";
    callback(null, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        },
        statusCode: 200,
        body: latestVersion,
    });
};
