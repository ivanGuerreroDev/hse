import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

type Props = {
  Card: any;
};

class MenuCard extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        {this.props.Card.map((item: any, i: any) => (
          <TouchableScale
            key={i}
            friction={90}
            tension={100}
            activeScale={0.95}>
            <Card>
              <View style={styles.cardcontainer}>
                <Text style={styles.Title}>{item.Tipo}</Text>
                <Text style={styles.subTitle}>{item.Titulo}</Text>
                <Text style={styles.cargo}>Cargo: {item.Cargo}</Text>
                <View>
                  <Text style={styles.buttonText}>COMENZAR</Text>
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
    marginHorizontal: 5,
  },
  cardcontainer: {margin: 5},
  contentMenu: {
    borderRadius: 5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomWidth: 1,
    borderColor: '#0000003D',
    alignItems: 'center',
  },
  Title: {
    color: '#116CB5',
    letterSpacing: 0.08,
    fontSize: 10,
    paddingBottom: 2,
  },
  subTitle: {
    color: '#00000099',
    letterSpacing: 0.29,
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 12,
  },
  cargo: {
    color: '#00000099',
    opacity: 1,
    letterSpacing: 0.22,
    fontSize: 12,
    paddingBottom: 20,
  },
  buttonText: {
    color: '#FDAE01',
    opacity: 1,
    letterSpacing: 1.25,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
});
