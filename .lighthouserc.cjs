// .lighthouserc.js
module.exports = {
  ci: {
    assert: {
      preset: 'lighthouse:recommended',
    },
    collect: {
      staticDistDir: './.output/public',
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
