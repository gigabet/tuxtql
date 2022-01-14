/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@mui/material', '@mui/icons-material']) // pass the modules you would like to see transpiled

module.exports = withTM({
  reactStrictMode: true,
})
