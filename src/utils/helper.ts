
import { Dimensions } from 'react-native';
import Snackbar from 'react-native-snackbar';

export const showSnackbar = (msg: any, textColor = '#fff', actionBtnColor = '#00B5EF'): void => {
    Snackbar.show({
        text: msg,
        duration: Snackbar.LENGTH_SHORT,
        textColor,
        action: {
            text: 'Close',
            textColor: actionBtnColor,
            onPress: () => { /* Do something. */ },
        },
    });
};

export const getScreenHeightWidht = () =>{
    const SCREEN_HEIGHT = Dimensions.get('window').height
    const SCREEN_WIDTH = Dimensions.get('window').width
    return{
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH
    }
}