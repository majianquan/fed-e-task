// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
    siteName: 'Gridsome',
    plugins: [
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'BlogPost',
                path: './content/blog/**/*.md',
            },
        },
        {
            use: '@gridsome/source-strapi',
            options: {
                apiURL: 'http://localhost:1337',
                queryLimit: 1000, // Defaults to 100
                contentTypes: ['fans', 'blog','project'],
                singleTypes: ['readme','new'],
                // Possibility to login with a Strapi user,
                // when content types are not publicly available (optional).
                loginData: {
                    identifier: 'ma_jianquan@outloo.com',
                    password: '$mjQ978558483',
                },
            },
        },
    ],
};
