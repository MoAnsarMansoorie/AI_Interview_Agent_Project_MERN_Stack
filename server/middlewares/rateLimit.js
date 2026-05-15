import rateLimit from 'express-rate-limit';

// General rate limiter
export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Auth endpoint rate limiter (more strict)
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 auth requests per windowMs
    message: 'Too many authentication attempts, please try again after 15 minutes.',
    skipSuccessfulRequests: false,
    standardHeaders: true,
    legacyHeaders: false,
});

// Login endpoint rate limiter
export const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 3, // limit each IP to 3 login attempts per minute
    message: 'Too many login attempts, please try again after a minute.',
    skipSuccessfulRequests: true,
    standardHeaders: true,
    legacyHeaders: false,
});
