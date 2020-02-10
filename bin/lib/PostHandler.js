module.exports = class PostHandler {
    /**
     * @description Returns parsed post as string
     * @param post
     * @returns {string}
     */
    static parse(post) {
        return post.replace(/\n{3,}/g, '<br><br><br>').replace(/(?:\r\n|\r|\n)/g, '<br>');
    }

    /**
     * @description Check length of the post
     * @param post
     * @return {boolean}
     */
    static checkLength(post) {
        return (post.length <= 130);
    }
};