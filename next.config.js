/** @type {import('next').NextConfig} */

const { default: axios } = require('axios');

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  compiler: {
    styledComponents: true,
  },
  rules:[
    {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },
  ],

  async rewrites() {
    return [
      {
        source: '/uploads/:path*', // O que o usuário vê na URL
        destination: 'https://buscabuffet.com.br/:path*', // O caminho real da imagem
      },
    ];
  },

  exportPathMap: async function () {
    let buffetSlugs = await axios.get('https://buscabuffet.com.br/api/buffets')
    .then(res=>{
      return res
    })
    .catch(err=>{
      return err
    })

    const paths = buffetSlugs?.data.reduce((acc, slug) => {
      acc[`/${slug?.slug}`] = { page: '/[buffetSlug]' };
      return acc;
    }, {});

    return paths;

  },

  
}


module.exports = nextConfig

