import {
    CompositeNavigationProp,
    NavigationProp
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import {
    MainFrameStackParamList,
    RootMainStackParamList
} from 'utils/types/navigations';

type StateProps = {
    Card: any;
};

type Navigation = {
    navigation: CompositeNavigationProp<
        NavigationProp<MainFrameStackParamList, 'SubMenu'>,
        NavigationProp<RootMainStackParamList>
    >;
};

type Props = StateProps & Navigation;
class MenuCard extends Component<Props> {
    state = {
        MenuCard: Object.keys(
            this.props.Card.reduce((a: any, e: any) => {
                let groupByKeyName = e['IdCapacitacion'];
                (a[groupByKeyName]
                    ? a[groupByKeyName]
                    : (a[groupByKeyName] = null || [])
                ).push(e);
                return a;
            }, {})
        ).map(
            (abuelo, i) =>
                abuelo && {
                    IdCapacitacion: abuelo,
                    Capacitacion: [
                        {
                            Tipo: this.props.Card.find(
                                (x: any) =>
                                    x.IdCapacitacion.toString() === abuelo
                            ).Tipo,
                            Titulo: this.props.Card.find(
                                (x: any) =>
                                    x.IdCapacitacion.toString() === abuelo
                            ).Titulo,
                            Descripcion: this.props.Card.find(
                                (x: any) =>
                                    x.IdCapacitacion.toString() === abuelo
                            ).Descripcion,
                            Categoria: this.props.Card.find(
                                (x: any) =>
                                    x.IdCapacitacion.toString() === abuelo
                            ).Categoria,
                            Selected: this.props.Card.filter(
                                (x: any) =>
                                    x.IdCapacitacion.toString() === abuelo
                            )
                        }
                    ]
                }
        )
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.MenuCard.map((item: any, i: any) => (
                    <TouchableScale
                        key={i}
                        friction={90}
                        tension={100}
                        activeScale={0.95}
                        onPress={() =>
                            this.props.navigation.navigate('Capacitaciones', {
                                selected: item.Capacitacion
                            })
                        }
                    >
                        <Card>
                            <View style={styles.cardcontainer}>
                                <Text style={styles.Title}>
                                    {item.Capacitacion.map((x: any) => x.Tipo)}
                                </Text>
                                <Text style={styles.subTitle}>
                                    {item.Capacitacion.map(
                                        (x: any) => x.Titulo
                                    )}
                                </Text>
                                <Text style={styles.cargo}>
                                    Cargo:{' '}
                                    {item.Capacitacion.map((x: any) =>
                                        x.Categoria === 'Trabajador'
                                            ? 'Varios'
                                            : x.Categoria
                                    )}
                                </Text>
                                <View>
                                    <Text style={styles.buttonText}>
                                        COMENZAR
                                    </Text>
                                </View>
                            </View>
                        </Card>
                    </TouchableScale>
                ))}
            </View>
        );
    }
}

export default MenuCard;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5
    },
    cardcontainer: { margin: 5 },
    contentMenu: {
        borderRadius: 5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 1,
        borderColor: '#0000003D',
        alignItems: 'center'
    },
    Title: {
        color: '#116CB5',
        letterSpacing: 0.08,
        fontSize: 10,
        paddingBottom: 2
    },
    subTitle: {
        color: '#00000099',
        letterSpacing: 0.29,
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 12
    },
    cargo: {
        color: '#00000099',
        opacity: 1,
        letterSpacing: 0.22,
        fontSize: 12,
        paddingBottom: 20
    },
    buttonText: {
        color: '#FDAE01',
        opacity: 1,
        letterSpacing: 1.25,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Regular'
    }
});
