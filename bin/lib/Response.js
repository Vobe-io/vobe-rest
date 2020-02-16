module.exports = response = (data = '', message = '') => {
    return {
        version: __vobe.version,
        message: undefined,
        data: data,
    }
}
