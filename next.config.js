/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    relay: {
      src: './',
      artifactDirectory: './__generated__',
      language: 'typescript',
    },
  },
}
