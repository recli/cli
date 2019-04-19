require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx']
})
require('./lib/local-generators/update-handbook/index.ts')
