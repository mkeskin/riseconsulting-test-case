module.exports = {
  plugins: {
    'tailwindcss/nesting': 'postcss-nesting',
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
}
