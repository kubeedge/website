exports.handler = function(event, context, callback) {
    // Set the latest version here.
    const keadm = "docker run --rm kubeedge/installation-package:v1.10.0 cat /usr/local/bin/keadm > /usr/local/bin/keadm && chmod +x /usr/local/bin/keadm";
    callback(null, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        },
        statusCode: 200,
        body: keadm,
    });
};
