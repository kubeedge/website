exports.handler = function(event, context, callback) {
    // Set the latest version here.
    const latestVersion = "v1.12.1";
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
