// const dns = require("dns");

// const suspiciousPatterns = [
//     /bit\.ly/, /tinyurl\.com/,
//     /login.*\.php/, /secure.*\.html/,
//     /bank/, /paypal/, /verify/
// ];

// exports.checkUrlSafety = (url) => {
//     return new Promise((resolve) => {
//         const domain = new URL(url).hostname;

//         if (suspiciousPatterns.some((pattern) => pattern.test(url))) {
//             return resolve(false);
//         }

//         dns.resolve(domain, (err) => {
//             resolve(!err);
//         });
//     });
// };

const dns = require("dns");

const suspiciousPatterns = [
    /bit\.ly/i,                                      // High-risk URL shortener
    /login|secure|verify|account|update|password/i,   // Suspicious words
    /\.php$|\.html$/,                                // Suspicious file extensions
    /bank|apple|microsoft|google/i,                   // Common phishing targets
    /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,          // IP addresses
    /[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/    // Suspicious subdomains
];

const highRiskKeywords = {
    subject: [/paypal/i],
    urls: [/bit\.ly/i]
};

const checkUrlSafety = (url) => {
    return new Promise((resolve) => {
        try {
            const urlObj = new URL(url);
            const domain = urlObj.hostname;

            // Immediate block for high-risk URLs
            if (highRiskKeywords.urls.some(pattern => pattern.test(url))) {
                console.log(`⚠️ High-risk URL detected: ${url}`);
                return resolve(false);
            }

            // Check for other suspicious patterns
            if (suspiciousPatterns.some(pattern => pattern.test(url))) {
                return resolve(false);
            }

            // Verify domain exists
            dns.resolve(domain, (err) => {
                if (err) {
                    console.log(`❌ DNS resolution failed for ${domain}`);
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        } catch (error) {
            console.error(`❌ Invalid URL: ${url}`);
            resolve(false);
        }
    });
};

const checkSubject = (subject) => {
    return highRiskKeywords.subject.some(pattern => pattern.test(subject));
};

module.exports = { checkUrlSafety, checkSubject };