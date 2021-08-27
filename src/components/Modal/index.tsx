import { Component } from 'react';
import { LogBox } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootMainStackParamList } from 'types/navigations';

LogBox.ignoreLogs([
 'Non-serializable values were found in the navigation state',
]);

type Props = {
  route: RouteProp<RootMainStackParamList, 'Modal'>
}

export default class Modal extends Component<Props> {
  render() {
    return this.props.route.params;
  }
}
