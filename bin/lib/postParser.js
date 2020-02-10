const parse = (post) => {
    return post.replace(/\n{3,}/g, '<br><br><br>').replace(/(?:\r\n|\r|\n)/g, '<br>');
};

module.exports = parse;