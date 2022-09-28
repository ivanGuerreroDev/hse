import React, {Component} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import {IDocumento} from 'utils/types/formulariodinamico';

type Props = {
  documento: IDocumento;
  onCardPress: () => void;
  leftOption?: React.ReactNode;
  rightOption?: React.ReactNode;
};

class CardDocumento extends Component<Props> {
  render() {
    const {documento, onCardPress, leftOption, rightOption} = this.props;
    const modifiedDate = new Date(documento.modifiedDate.$date);

    return (
      <View style={styles.container}>
        <ListItem.Swipeable
          containerStyle={styles.content}
          leftContent={leftOption}
          rightContent={rightOption}>
          <ListItem.Content style={styles.content}>
            <Pressable style={{width: '100%'}} onPress={onCardPress}>
              <View style={styles.headerRow}>
                <Text style={styles.documentTitle}>{documento.title}</Text>
                <Text style={styles.documentDate}>
                  {format(modifiedDate, 'dd MMM HH:mm', {locale: es})}
                </Text>
              </View>
              <View style={styles.documentoAbrevContainer}>
                <Text style={styles.documentoAbrev}>
                  {documento.pages.map(x =>
                    x.controls.map(
                      (i, z) =>
                        i.properties?.filter(a => a.value === 'Nombre') &&
                        `${(z < 2 && i.outputValue) || ''}\n`,
                    ),
                  )}
                </Text>
              </View>
            </Pressable>
          </ListItem.Content>
        </ListItem.Swipeable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#0000001F',
    borderBottomWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  content: {
    backgroundColor: '#F2F2F2',
    padding: 0,
  },
  headerRow: {
    flexDirection: 'row',
  },
  documentTitle: {
    flex: 1,
    fontSize: 16,
  },
  documentDate: {
    flex: 0,
    fontSize: 12,
  },
  documentoAbrevContainer: {
    height: 36,
  },
  documentoAbrev: {
    color: '#00000061',
    fontSize: 14,
  },
});

export default CardDocumento;
