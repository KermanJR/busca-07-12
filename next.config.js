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



  
}


module.exports = nextConfig

