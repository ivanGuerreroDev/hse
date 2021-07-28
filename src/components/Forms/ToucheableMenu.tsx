import React, {Component} from 'react';
import {Image, TouchableOpacity, View, StyleSheet, Text} from 'react-native';

type Props = {
  img: string;
};

class ToucheableMenu extends Component<Props> {
  render() {
    console.log(this.props.img ? 'true' : 'false');

    return (
      <TouchableOpacity
        style={{
          ...styles.card,
          // backgroundColor,
        }}>
        <View style={styles.cardHeader}></View>
        {
          <Image
            style={styles.cardImage}
            source={require(this.props.img)}
            resizeMode={'contain'}
          />
        }
        <View style={styles.cardFooter}>
          <View style={styles.aling}>
            <Text style={{...styles.text}}>{'hola'}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ToucheableMenu;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 1,
    marginBottom: 96,
  },
  list: {
    alignSelf: 'center',
  },
  card: {
    flexBasis: '42%',
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    width: 260,
    height: 160,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  cardFooter: {
    paddingTop: 20,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },
  text: {
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontFamily: 'PTSans-Bold',
  },
  aling: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
