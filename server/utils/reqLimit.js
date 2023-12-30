const rateLimit = require('express-rate-limit')

function rateLimiter(time,timeType,maxReq,message)
{
    const limiter = rateLimit({
        windowMs: time || 15*60*1000, // 15 minutes default
        max: maxReq || 50, // Limit each IP to 5 requests per `window` (here, per 5 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message:{
            status:false,
            code:"TOO_MANY_REQUESTS",
            message:message ?message+` ,Too meny request,please try again after ${time ?time+timeType:"15 min"} ` : `Too meny request,please try again after ${time ?time+" "+timeType:"15 min"}  `
        }
    });

     return limiter;
}


// Apply the rate limiting middleware to all requests
module.exports=rateLimiter;