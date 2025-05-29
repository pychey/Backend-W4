// Validation Middleware
export const validateUserData = (req, res, next) => {
    const { name, email } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ 
            error: 'Validation failed: Name and email are required',
            missing: {
                name: !name,
                email: !email
            }
        });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            error: 'Validation failed: Invalid email format' 
        });
    }
    
    if (typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ 
            error: 'Validation failed: Name must be a non-empty string' 
        });
    }
    
    next();
};

export const validateUserUpdateData = (req, res, next) => {
    const { name, email } = req.body;
    
    if (!name && !email) {
        return res.status(400).json({ 
            error: 'Validation failed: At least one field (name or email) must be provided for update'
        });
    }
    
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Validation failed: Invalid email format' 
            });
        }
    }
    
    if (name && (typeof name !== 'string' || name.trim().length === 0)) {
        return res.status(400).json({ 
            error: 'Validation failed: Name must be a non-empty string' 
        });
    }
    
    next();
};