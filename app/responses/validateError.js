module.exports = (errors) => {
    let handler = {};
    errors.forEach((error) => {
        if (!(error.field in handler)) {
            handler[error.field] = [];
        }
        handler[error.field].push(error.message);
    });
    return handler;
}