module.exports = response = (data = '', message = '') => {
    return {
        version: __vobe.version,
        message: message,
        data: data,
    }
}
