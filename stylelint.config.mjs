// @ts-check
export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'comment-empty-line-before': null,
    'selector-class-pattern': null, // allow PRECSS style
    // disabled for config-standard@39
    'color-function-notation': null,
    'hue-degree-notation': null,
    'color-function-alias-notation': null,
    'alpha-value-notation': null,
    'media-feature-range-notation': null,
  },
};
