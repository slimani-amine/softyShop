module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [2, 'always', ['lower-case', 'upper-case']],
    'type-enum': [2, 'always', ['CHORE', 'FEATURE', 'FIX', 'HOTFIX']],
    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', 'upper-case'], // enforce kebab-case for scopes
    'subject-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'subject-max-length': [0],
    'header-max-length': [2, 'always', 100],
  },
};
