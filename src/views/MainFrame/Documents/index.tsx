import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button, Icon, Tab} from 'react-native-elements';
import CardDocumento from './CardDocumento';
import {TabItem} from './TabItemComponent';
import Layout from 'views/MainFrame/layaut';

import {
  CompositeNavigationProp,
  NavigationProp,
} from '@react-navigation/native';
import {
  MainFrameStackParamList,
  RootMainStackParamList,
} from 'types/navigations';

import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from 'state/store/store';
import {
  changeStatusDocumento,
  deleteDocumento,
} from 'state/formulariodinamico/actions';
import {
  ChangeStatusDocumento,
  DeleteDocumento,
} from 'state/formulariodinamico/types';
import {DocumentoStatus, IDocumento} from 'types/formulariodinamico';
import { IUser } from 'state/user/types';

type StateProps = {
  documentos: IDocumento[];
  currentUser: IUser | undefined;
};

type DispatchProps = {
  changeStatusDocumento: ChangeStatusDocumento;
  deleteDocumento: DeleteDocumento;
};

type Props = StateProps &
  DispatchProps & {
    navigation: CompositeNavigationProp<
      NavigationProp<MainFrameStackParamList, 'Documents'>,
      NavigationProp<RootMainStackParamList>
    >;
  };

class Documents extends Component<Props> {
  state = {
    tabIndex: 0,
  };

  renderList() {
    const {currentUser, documentos, navigation, deleteDocumento} = this.props;
    const filteredDocumentos = (filter: DocumentoStatus) =>
      documentos
        .filter(documento => documento.user?.Username === currentUser?.Username)
        .filter(documento => documento.status === filter)
        .sort(
          (a, b) =>
            new Date(b.modifiedDate.$date).valueOf() -
            new Date(a.modifiedDate.$date).valueOf(),
        );

    switch (this.state.tabIndex) {
      case 0:
        return (
          <FlatList
            data={filteredDocumentos(DocumentoStatus.draft)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <CardDocumento
                documento={item}
                onCardPress={() =>
                  navigation.navigate('FormularioDinamico', {documento: item})
                }
                // leftOption={
                //   <Button
                //     buttonStyle={{
                //       backgroundColor: 'green',
                //       height: '100%',
                //     }}
                //     icon={<Icon type="material" name="send" color="#ffffff" />}
                //     onPress={() =>
                //       console.warn('No implementado')
                //       // changeStatusDocumento(item._id, DocumentoStatus.sending)
                //     }
                //   />
                // }
                rightOption={
                  <Button
                    buttonStyle={{backgroundColor: 'red', height: '100%'}}
                    icon={<Icon type="material" name="delete" color="white" />}
                    onPress={() => deleteDocumento(item._id)}
                  />
                }
              />
            )}
          />
        );

      case 1:
        return (
          <FlatList
            data={filteredDocumentos(DocumentoStatus.sending)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <CardDocumento
                documento={item}
                onCardPress={() =>
                  navigation.navigate('FormularioDinamico', {documento: item, readOnly: true})
                }
                rightOption={
                  <Button
                    buttonStyle={{backgroundColor: 'red', height: '100%'}}
                    icon={<Icon type="material" name="cancel" color="white" />}
                    onPress={() =>
                      console.warn('No implementado')
                      // changeStatusDocumento(item._id, DocumentoStatus.draft)
                    }
                  />
                }
              />
            )}
          />
        );

      case 2:
        return (
          <FlatList
            data={filteredDocumentos(DocumentoStatus.sent)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <CardDocumento
                documento={item}
                onCardPress={() =>
                  navigation.navigate('FormularioDinamico', {documento: item, readOnly: true})
                }
                rightOption={
                  <Button
                    buttonStyle={{backgroundColor: 'red', height: '100%'}}
                    icon={<Icon type="material" name="delete" color="white" />}
                    onPress={() => deleteDocumento(item._id)}
                  />
                }
              />
            )}
          />
        );
    }
  }

  render() {
    return (
      <Layout>
        <View style={{overflow: 'hidden', paddingBottom: 3}}>
          <View style={styles.tabContainer}>
            <Tab
              value={this.state.tabIndex}
              onChange={tabIndex => this.setState({tabIndex})}
              indicatorStyle={{
                borderBottomColor: 'white',
                borderBottomWidth: 2,
              }}>
              <TabItem title="Borrador" />
              <TabItem title="Salida" />
              <TabItem title="Enviados" />
            </Tab>
          </View>
        </View>
        {this.renderList()}
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    elevation: 6,
  },
});

const mapStateToProps = (state: RootState): StateProps => {
  return {
    documentos: state.documentos.documentos,
    currentUser: state.currentUser.user
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>,
): DispatchProps => {
  return {
    changeStatusDocumento: (id: string, status: DocumentoStatus) =>
      dispatch(changeStatusDocumento(id, status)),
    deleteDocumento: (id: string) => dispatch(deleteDocumento(id)),
  };
};

export default connect<StateProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(Documents);
