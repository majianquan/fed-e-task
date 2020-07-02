class OptimizePlugin {
    constructor(options) {
        this.options = options
    }
    apply(compiler) { 
        // compiler.hooks.compilation.tap('OptimizePlugin', (compilation) => {
        //     // console.log(compilation)
        //     compilation.hooks.emit.tap('OptimizePlugin', chunks => {
        //         // console.log(chunks, '---')
        //     })
        // })
    }
}

module.exports = OptimizePlugin