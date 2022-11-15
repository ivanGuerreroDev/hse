module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
          'types': './src/utils/types'
        }
      }
    ],
    'react-native-reanimated/plugin'
  ]
};
