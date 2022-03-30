import React, {useState, useRef } from 'react';
import ControlComponent from '../ControlComponent';
import {
  InteractionManager,
  FlatList,
  Pressable,
  StyleProp,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import {Badge, Icon, Input, Text} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import Camera from 'components/MediaSelector';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {format} from 'date-fns';
import {es} from 'date-fns/locale';
import _ from 'lodash';

export default class RemarksControl extends ControlComponent {

  useCamera() {
    const {controlBridge, navigation} = this.props;
    this.props.navigation.navigate(
      'Modal',
      <Camera
        onCancel={() => navigation.goBack()}
        onSuccess={items => {
          controlBridge.OutputValue = {
            ...controlBridge.RawOutputValue,
            media: items.map(item => controlBridge.createResource(item)),
          };

          navigation.goBack();
        }}
        selectedMediaUris={controlBridge.OutputValue?.media}
        canRecord={controlBridge.property('video')}
        showFloatingGallery={controlBridge.property('showFloatingGallery')}
      />,
    );
  }

  useComment() {



    const {controlBridge, navigation} = this.props;

    type CommentModalProps = {
      value: string | undefined;
      onCancel: () => void;
      onSuccess: (value: string) => void;
    };

    const CommentModal = (props: CommentModalProps) => {

      const [value, setValue] = useState(props.value || '');
      let inputRef: TextInput | null;

      return (
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'transparent',
            paddingHorizontal: 16,
          }}>
          <View style={{backgroundColor: 'white', borderRadius: 2}}>
            <View
              style={{
                backgroundColor: '#FDAE01',
                flexDirection: 'row',
                paddingHorizontal: 16,
                paddingVertical: 8,
                alignItems: 'center',
              }}>
              <Icon
                type="material"
                name="chat"
                color="white"
                size={20}
                style={{padding: 10}}
              />
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
                Comentario
              </Text>
            </View>

            <View style={{padding: 13}}>
              <Input
                ref={ref => (inputRef = ref)}
                onLayout={()=> inputRef?.focus()}
                multiline={true}
                numberOfLines={2}
                inputContainerStyle={{
                  maxHeight: 250,
                }}
                inputStyle={{
                  textAlignVertical: 'top',
                }}
                placeholder="Escribe aquí tu comentario"
                value={value}
                onChangeText={value => setValue(value)}
              />
            </View>

            <View style={{flexDirection: 'row-reverse'}}>
              <Pressable
                style={{padding: 14}}
                onPress={() => props.onSuccess(value)}>
                <Text style={{color: '#FDAE01'}}>GUARDAR</Text>
              </Pressable>
              <Pressable style={{padding: 14}} onPress={() => props.onCancel()}>
                <Text style={{color: '#808080'}}>CANCELAR</Text>
              </Pressable>
            </View>
          </View>
        </View>
      );
    };

    this.props.navigation.navigate(
      'Modal',
      <CommentModal
        value={controlBridge.OutputValue?.comment}
        onCancel={() => navigation.goBack()}
        onSuccess={value => {
          controlBridge.OutputValue = {
            ...controlBridge.RawOutputValue,
            comment: value,
          };
          navigation.goBack();
        }}
      />,
    );
  }

  useCalendar() {
    const {controlBridge, navigation} = this.props;

    type CalendarModalProps = {
      value: string | undefined;
      onCancel: () => void;
      onSuccess: (value: string) => void;
    };
    const CalendarModal = (props: CalendarModalProps) => {
      LocaleConfig.locales['es'] = {
        monthNames: _.range(12).map(number =>
          es.localize?.month(number, {width: 'wide'}),
        ),
        monthNamesShort: _.range(12).map(number =>
          es.localize?.month(number, {width: 'abbreviated'}),
        ),
        dayNames: _.range(7).map(number =>
          es.localize?.day(number, {width: 'wide'}),
        ),
        dayNamesShort: _.range(7).map(number =>
          es.localize?.day(number, {width: 'narrow'}),
        ),
        today: 'Hoy',
      };
      LocaleConfig.defaultLocale = 'es';

      const [value, setValue] = useState(
        props.value ||
          format(
            new Date(
              new Date().getTime() +
                24 * 60 * 60 * 1000 * controlBridge.property('plazo'),
            ),
            'yyyy-MM-dd',
          ),
      );

      let markedDate: any = {};
      markedDate[value] = {selected: true, selectedColor: '#FDAE01'};

      return (
        <View
          style={{
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'transparent',
            paddingHorizontal: 54,
          }}>
          <View style={{backgroundColor: 'white', borderRadius: 2}}>
            <View
              style={{
                backgroundColor: '#FDAE01',
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}>
              <Text style={{color: 'white', fontSize: 14}}>
                {value.split('-')[0]}
              </Text>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24}}>
                {format(
                  new Date(value).getTime() +
                    new Date(value).getTimezoneOffset() * 60000,
                  "iiii, d 'de' MMM",
                  {locale: es},
                )}
              </Text>
            </View>

            <View style={{padding: 13}}>
              <Calendar
                current={value}
                markedDates={markedDate}
                onDayPress={(date: any) => setValue(date.dateString)}
              />
            </View>

            <View style={{paddingTop: 46, flexDirection: 'row-reverse'}}>
              <Pressable
                style={{padding: 14}}
                onPress={() => props.onSuccess(value)}>
                <Text style={{color: '#FDAE01'}}>GUARDAR</Text>
              </Pressable>
              <Pressable style={{padding: 14}} onPress={() => props.onCancel()}>
                <Text style={{color: '#808080'}}>CANCELAR</Text>
              </Pressable>
            </View>
          </View>
        </View>
      );
    };

    this.props.navigation.navigate(
      'Modal',
      <CalendarModal
        value={controlBridge.OutputValue?.date}
        onCancel={() => navigation.goBack()}
        onSuccess={value => {
          controlBridge.OutputValue = {
            ...controlBridge.RawOutputValue,
            date: value,
          };
          navigation.goBack();
        }}
      />,
    );
  }

  useOwner() {

    const {controlBridge, navigation} = this.props;

    type ownerModalProps = {
      data: Array<any>;
      onSuccess: (output: any) => void;
      selectedData: any;
      displayField?: string;
      multiple?: boolean;
    };

    const OwnerModal = (props: ownerModalProps) => {

      let inputRef: TextInput | null;
      const [searchText, setSearchText] = useState('');
      const [selectedData, setSelectedData] = useState(
        props.selectedData
          ? props.multiple
            ? props.selectedData
            : [props.selectedData]
          : [],
      );

      const filteredData = props.data
        .filter(
          item => !selectedData.find((data: any) => _.isEqual(data, item)),
        )
        .filter(item =>
          (props.displayField ? item[props.displayField] : item)
            .toLowerCase()
            .includes(searchText.toLowerCase()),
        );

      return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{flex: 0}}>
            <Text
              style={{
                // paddingTop: 5,
                paddingLeft: 5,
                color: '#00000099',
                paddingVertical: 5,
                fontSize: 16,
                fontFamily: 'Roboto-Medium',
                fontWeight: 'bold',
              }}>
              Seleccionado
            </Text>
            <FlatList
              data={selectedData}
              keyExtractor={(item, index) => index.toString()}
              keyboardShouldPersistTaps="always"
              style={{
                marginBottom: 10,
                borderColor: 'grey',
                borderBottomWidth: 1,
                minHeight: 28,
                maxHeight: 160,
              }}
              renderItem={({item}) => (
                <View style={{padding: 2, width: '100%'}}>
                  <Text
                    onPress={() =>
                      props.multiple
                        ? setSelectedData(
                            selectedData.filter((data: any) => data !== item),
                          )
                        : props.onSuccess(undefined)
                    }
                    style={{
                      paddingVertical: 5,
                      fontSize: 15,
                      fontFamily: 'Roboto-Medium',
                      borderRadius: 6,
                      padding: 5,
                    }}>
                    {props.displayField ? item[props.displayField] : item}
                  </Text>
                </View>
              )}
            />
          </View>
          <Text
            style={{
              paddingLeft: 5,
              paddingHorizontal: 10,
              color: '#00000099',
              paddingVertical: 5,
              fontSize: 16,
              fontFamily: 'Roboto-Medium',
              fontWeight: 'bold',
              flex: 0,
            }}>
            Seleccione
          </Text>
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            keyboardShouldPersistTaps="always"
            style={{flex: 1}}
            renderItem={({item}) => {
              const regexpResult =
                RegExp(
                  `^(.*)(${searchText.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    '\\$&',
                  )})(.*)$`,
                  'i',
                ).exec(props.displayField ? item[props.displayField] : item) ||
                [];

              return (
                <View style={{padding: 2, width: '100%'}}>
                  <Text
                    onPress={() =>
                      props.multiple
                        ? setSelectedData([...selectedData, item])
                        : props.onSuccess(item)
                    }
                    style={{
                      fontSize: 18,
                      borderRadius: 6,
                      padding: 5,
                    }}>
                    <Text>{regexpResult[1]}</Text>
                    <Text style={{fontWeight: 'bold'}}>{regexpResult[2]}</Text>
                    <Text>{regexpResult[3]}</Text>
                  </Text>
                </View>
              );
            }}
          />
          <View style={{flex: 0, flexDirection: 'row', borderWidth: 1}}>
            <TextInput
              ref={ref => (inputRef = ref)}
              onLayout={()=> inputRef?.focus()}
              style={{flex: 1, paddingLeft: 5}}
              placeholder={'Escriba y Seleccione el Nombre'}
              value={searchText}
              onChangeText={value => setSearchText(value)}
            />
            <Icon
              name="check-circle"
              type="material"
              color="green"
              size={props.multiple ? 32 : 0}
              onPress={() =>
                props.onSuccess(
                  selectedData.length > 0 ? selectedData : undefined,
                )
              }
            />
          </View>
        </SafeAreaView>
      );
    };

    this.props.navigation.navigate(
      'Modal',
      <OwnerModal
        data={controlBridge.property('ownersData')}
        selectedData={controlBridge.OutputValue?.owners}
        displayField={controlBridge.property('ownersDisplayField')}
        multiple={controlBridge.property('multipleOwners')}
        onSuccess={value => {
          controlBridge.OutputValue = {
            ...controlBridge.RawOutputValue,
            owners: value,
          };
          navigation.goBack();
        }}
      />,
    );
  }

  render() {
    const {controlBridge} = this.props;
    const buttonOption = (name: string, value: boolean): JSX.Element => {
      let badgeStyle: StyleProp<ViewStyle>;

      if (value === false)
        badgeStyle = {
          display: 'none',
        };
      if (value === true)
        badgeStyle = {
          display: 'flex',
          position: 'absolute',
          bottom: 0,
          left: -6,
        };

      return (
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 5}}>
          <View style={{width: 40, height: 40}}>
            <Icon
              type="material"
              name={name}
              size={name === 'calendar-today' ? 35 : 40}
              color="#808080"
            />
            <Badge
              status="warning"
              value={
                <Icon type="materila" name="done" color="white" size={12} />
              }
              containerStyle={badgeStyle}
            />
          </View>
        </View>
      );
    };

    const visible = controlBridge.property('visible') ? 'flex' : 'none';
    return (
      <View style={{flex: 1, padding: 5, display: visible}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {!controlBridge.property('noCamera') && (
            <Pressable style={{flex: 1}} onPress={() => this.useCamera()}>
              {buttonOption(
                'photo-camera',
                controlBridge.OutputValue?.media?.length > 0,
              )}
            </Pressable>
          )}
          {!controlBridge.property('noComment') && (
            <Pressable style={{flex: 1}} onPress={() => this.useComment()}>
              {buttonOption(
                'chat',
                controlBridge?.OutputValue?.comment?.length > 0,
              )}
            </Pressable>
          )}
          {!controlBridge.property('noCalendar') && (
            <Pressable style={{flex: 1}} onPress={() => this.useCalendar()}>
              {buttonOption(
                'calendar-today',
                controlBridge?.OutputValue?.date?.length > 0,
              )}
            </Pressable>
          )}
          {!controlBridge.property('noOwner') && (
            <Pressable style={{flex: 1}} onPress={() => this.useOwner()}>
              {buttonOption(
                'engineering',
                controlBridge?.OutputValue?.owners !== undefined,
              )}
            </Pressable>
          )}
        </View>
      </View>
    );
  }
}
