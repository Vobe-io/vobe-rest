const pipeline = () => {
    let pipeline = this;
    this.pipes = [];

    this.useAll = (pipes) => {
        pipeline.pipes.push(pipes.filter(p => p instanceof Function));
    };

    this.use = (pipe) => {
        if (pipe instanceof Function)
            pipeline.pipes.push(pipe);
    };

    this.error = (err) => console.log(err);

    this.process = (baseObj = {}) => {
        let res = baseObj;
        pipeline.pipes.forEach(pipe => res = pipe(res));
        return res;
    };

    return this;
};

module.exports = pipeline;