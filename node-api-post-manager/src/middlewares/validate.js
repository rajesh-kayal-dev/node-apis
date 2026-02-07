const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            message: "Validation faild",
            errors: error.issues.map((err) => ({
                field: err.path[0],
                message: err.message
            })),
        });
    }
}

export default validate;