import {
  Platform
} from 'react-native';
export const lightTheme = {
    Header: {
        barStyle: 'dark-content',
        statusBarProps: {
            backgroundColor: 'transparent'
        },
        containerStyle: {
          //paddingVertical: Platform.OS === 'ios' ? 70 : 'auto'
        }
    },
    Text: {
        style: {
            fontSize: 15
        }
    },
    Input: {
        /* labelStyle: {
      paddingLeft: 5,
      fontSize: 10,
      color: '#00000099',
      opacity: 1,
      fontFamily: 'Roboto-Regular',
    },
    inputContainerStyle: {
      borderWidth: 1,
      borderColor: '#0000001F',
      borderRadius: 4,
      opacity: 1,
    },
    errorStyle: {
      paddingTop: 0,
      marginTop: 0,
    },
    inputStyle: {
      paddingLeft: 15,
      fontSize: 15,
      fontFamily: 'Roboto-Medium',
    }, */
    }
};
