import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import { Header, Text, Icon } from 'react-native-elements';

type Props = {
    Titulo: string;
    Name: string;
    Color: string;
    Footer: boolean;
    navigation: () => void;
};

class Layaut extends Component<Props> {
    state = {};

    render() {
        return (
            <View style={styles.container}>
                <Header
                    containerStyle={{
                        ...styles.header,
                        backgroundColor: this.props.Color
                    }}
                    leftComponent={
                        <View style={styles.containerHeader}>
                            <TouchableOpacity
                                style={styles.headergoBack}
                                onPress={this.props.navigation}
                            >
                                <Icon
                                    name="arrow-left"
                                    type="fontisto"
                                    color="#FFFFFF"
                                />
                            </TouchableOpacity>

                            <Text style={styles.titulo}>
                                {this.props.Titulo}
                            </Text>
                        </View>
                    }
                    statusBarProps={{ barStyle: 'light-content' }}
                />

                <ScrollView style={styles.content}>
                    {this.props.children}
                </ScrollView>

                {this.props.Footer && (
                    <View
                        style={{
                            ...styles.footer,
                            backgroundColor: this.props.Color
                        }}
                    >
                        <View style={styles.Icon}>
                            {this.props.Name === 'Capacitacion' ? (
                                <>
                                    <View>
                                        <Icon
                                            name="content-save"
                                            type="material-community"
                                            size={25}
                                            color="#ffffff"
                                            onPress={() => console.log('hello')}
                                        />
                                        <Text style={styles.TextIcon}>
                                            {' '}
                                            Guardar
                                        </Text>
                                    </View>
                                    <View>
                                        <Icon
                                            name="pencil"
                                            type="material-community"
                                            size={25}
                                            color="#ffffff"
                                            onPress={() => console.log('hello')}
                                        />
                                        <Text style={styles.TextIcon}>
                                            {' '}
                                            Firmar
                                        </Text>
                                    </View>
                                </>
                            ) : (
                                <View>
                                    <Icon
                                        name="check"
                                        type="material-community"
                                        size={25}
                                        color="#ffffff"
                                        onPress={() => console.log('hello')}
                                    />
                                    <Text style={styles.TextIcon}>
                                        {' '}
                                        Aceptar
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                )}
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
        opacity: 1
    },
    containerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '400%'
    },
    headergoBack: {
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
    },
    footer: {
        height: '8%'
    },
    Icon: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: '1.5%',
        justifyContent: 'space-around'
    },
    TextIcon: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Medium',
        letterSpacing: 0.5
    }
});
