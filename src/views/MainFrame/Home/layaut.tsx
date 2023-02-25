import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Header, Text, Icon } from 'react-native-elements';

type Props = {
    Titulo: String;
    navigation: any;
    children: any;
    app: String;
};

class Layaut extends Component<Props> {
    state = {};

    render() {
        return (
            <View style={styles.container}>
                <Header
                    containerStyle={{
                        ...styles.header,
                        backgroundColor: this.props.app === 'HSE' ? '#FDAE01' : this.props.app === 'Producción' ? '#55b25f' : '#cbcbcb',
                    }}
                    leftComponent={
                        <View style={styles.containerHeader}>
                            <TouchableOpacity
                                style={styles.headergoBack}
                                onPress={this.props.navigation.goBack}
                            >
                                <Icon
                                    name="arrow-left"
                                    type="fontisto"
                                    color="#FFFFFF"
                                    size={16}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                    centerComponent={{
                        text: this.props.Titulo,
                        style: styles.titulo
                    }}  
                    rightComponent={{}}
                    statusBarProps={{ barStyle: 'light-content' }}
                />

                <View style={styles.content}>{this.props.children}</View>
            </View>
        );
    }
}

export default Layaut;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: '#FDAE01',
        opacity: 1
    },
    containerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '400%'
    },
    headergoBack: {
        marginTop: 5,
        marginLeft: '5%',
        marginRight: '10%'
    },
    titulo: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Roboto-Medium',
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    content: {
        flex: 1,
        backgroundColor: '#F2F2F266'
    }
});
