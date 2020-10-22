module.exports = {
  plugins: [
    require('stylelint'),
    require('postcss-import')({}),
//    require('postcss-import')({
//      plugins: [
//        require('stylelint')
//      ]
//    }),
  ],
}