const https = require('https');

const keepAlive = (urls) => {
    if (!urls) return;

    const urlList = Array.isArray(urls) ? urls : urls.split(',').map(u => u.trim());

    urlList.forEach(url => {
        console.log(`Starting keep-alive for: ${url}`);

        // Ping every 14 minutes
        setInterval(() => {
            https.get(url, (res) => {
                console.log(`Keep-alive ping sent to ${url}. Status: ${res.statusCode}`);
            }).on('error', (err) => {
                console.error(`Keep-alive ping failed for ${url}: ${err.message}`);
            });
        }, 14 * 60 * 1000);
    });
};

module.exports = keepAlive;

