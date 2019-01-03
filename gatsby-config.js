module.exports = {
  siteMetadata: {
    title: 'freks blog',
    author: 'shojik',
    description: 'freks tips, memo, etc..',
    siteUrl: 'https://blog.freks.jp',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography.js',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/posts`,
        name: 'posts',
      },
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-56127730-4',
      },
    },
  ],
}
