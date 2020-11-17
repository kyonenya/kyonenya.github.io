module.exports = {
  plugins: [
    require('postcss-import')({
      plugins: [
        require('stylelint'),
        // どのcssファイルでのエラーなのかを表示させるプラグイン
        require('postcss-reporter'),
      ]
    }),
    require('postcss-csso')({}),
  ],
}
