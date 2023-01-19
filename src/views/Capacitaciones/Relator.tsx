import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Input, Text } from 'react-native-elements';
import {
    CompositeNavigationProp,
    NavigationProp,
    RouteProp
} from '@react-navigation/native';
import {
    MainFrameStackParamList,
    RootMainStackParamList
} from 'utils/types/navigations';

import Layaut from './layaut';

type StateProps = {
    capacitacion: any;
};

type Navigation = {
    navigation: CompositeNavigationProp<
        NavigationProp<MainFrameStackParamList, 'SubMenu'>,
        NavigationProp<RootMainStackParamList>
    >;
    route: RouteProp<RootMainStackParamList, 'Capacitaciones'>;
};

type Props = StateProps & Navigation;

class Relator extends Component<Props> {
    state = {
        Nombre: '',
        Rut: '',
        Cargo: '',
        Institucion: ''
    };

    render() {
        let inputUserRef: TextInput | null;
        return (
            <Layaut
                Titulo={'Relator Externo'}
                Name="Relator"
                Color={'#67B56A'}
                Footer={true}
                navigation={() => this.props.navigation.goBack()}
            >
                <View>
                    <View style={styles.inputArea}>
                        <Input
                            ref={(ref) => (inputUserRef = ref)}
                            autoCapitalize="none"
                            placeholder="Nombre Completo"
                            value={this.state.Nombre}
                            onChangeText={(value) =>
                                this.setState({ Nombre: value })
                            }
                            labelStyle={styles.inputLabel}
                            inputStyle={styles.inputStyle}
                            errorStyle={styles.inputError}
                        />
                        <Input
                            ref={(ref) => (inputUserRef = ref)}
                            autoCapitalize="none"
                            placeholder="Rut"
                            value={this.state.Rut}
                            onChangeText={(value) =>
                                this.setState({ Rut: value })
                            }
                            labelStyle={styles.inputLabel}
                            inputStyle={styles.inputStyle}
                            errorStyle={styles.inputError}
                        />
                        <Input
                            ref={(ref) => (inputUserRef = ref)}
                            autoCapitalize="none"
                            placeholder="Cargo"
                            value={this.state.Cargo}
                            onChangeText={(value) =>
                                this.setState({ Cargo: value })
                            }
                            labelStyle={styles.inputLabel}
                            inputStyle={styles.inputStyle}
                            errorStyle={styles.inputError}
                        />
                        <Input
                            ref={(ref) => (inputUserRef = ref)}
                            autoCapitalize="none"
                            placeholder="Institución"
                            value={this.state.Institucion}
                            onChangeText={(value) =>
                                this.setState({ Institucion: value })
                            }
                            labelStyle={styles.inputLabel}
                            inputStyle={styles.inputStyle}
                            errorStyle={styles.inputError}
                        />
                    </View>
                </View>
            </Layaut>
        );
    }
}

export default Relator;

const styles = StyleSheet.create({
    inputArea: {
        paddingTop: 25,
        paddingHorizontal: 20
    },
    inputLabel: {
        fontSize: 13,
        color: '#00000099',
        opacity: 1,
        fontFamily: 'Roboto-Regular'
    },
    inputStyle: {
        fontSize: 15,
        fontFamily: 'Roboto-Medium'
    },
    inputError: {
        height: 0
    }
});
