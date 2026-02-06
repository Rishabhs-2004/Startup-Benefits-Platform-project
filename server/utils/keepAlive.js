const https = require('https');
const http = require('http');

const keepAlive = (urls) => {
    if (!urls) return;

    const urlList = Array.isArray(urls) ? urls : urls.split(',').map(u => u.trim());

    urlList.forEach(url => {
        // Add protocol if missing
        let fullUrl = url;
        if (!url.startsWith('http')) {
            fullUrl = `https://${url}`;
        }

        console.log(`Starting keep-alive for: ${fullUrl}`);

        const client = fullUrl.startsWith('https') ? https : http;

        // Ping every 14 minutes
        setInterval(() => {
            client.get(fullUrl, (res) => {
                console.log(`Keep-alive ping sent to ${fullUrl}. Status: ${res.statusCode}`);
            }).on('error', (err) => {
                console.error(`Keep-alive ping failed for ${fullUrl}: ${err.message}`);
            });
        }, 14 * 60 * 1000);
    });
};

module.exports = keepAlive;
