// @ts-check
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'comment-empty-line-before': null,
    'selector-class-pattern': null, // allow PRECSS style
    'hue-degree-notation': 'number',
    'media-feature-range-notation': 'prefix', // compat for postcss-csso
  },
};
