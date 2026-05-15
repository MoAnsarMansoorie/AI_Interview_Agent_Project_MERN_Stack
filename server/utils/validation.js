// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {
    if (!email || typeof email !== 'string') {
        return false;
    }
    return emailRegex.test(email.trim());
};

export const validateName = (name) => {
    if (!name || typeof name !== 'string') {
        return false;
    }
    const trimmedName = name.trim();
    return trimmedName.length >= 2 && trimmedName.length <= 100;
};

export const sanitizeInput = (input) => {
    if (typeof input !== 'string') {
        return input;
    }
    return input.trim().replace(/[<>]/g, '');
};
