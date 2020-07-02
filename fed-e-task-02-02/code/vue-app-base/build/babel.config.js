module.exports = {
    cacheDirectory: true,
    presets: [
        [
            '@babel/preset-env',
            {
                'useBuiltIns': 'usage',
                'modules': false,
                'corejs': 3,
                'targets': {
                    'browsers': [
                        'last 2 versions',
                        'ie >= 10'
                    ]
                }
            }
        ]
    ],
    sourceType: 'unambiguous',
    plugins: [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-runtime',
        '@vue/babel-plugin-transform-vue-jsx',
        '@babel/plugin-proposal-class-properties'
    ]
}