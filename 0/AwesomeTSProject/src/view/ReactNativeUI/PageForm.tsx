import React, { useRef, useState } from 'react';
import { Button, Platform, ScrollView, Switch, Text, View } from 'react-native';
import PageItem, { basePageStyle } from './components/PageItem';
import { CheckBox } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';
import { NativeBaseProvider, Radio } from 'native-base';
import DateTimePicker, {
  AndroidNativeProps,
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

const FormSwitch = () => {
  const [switchVal, setSwitchVal] = useState(false);
  return (
    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={switchVal ? '#fff' : '#f4f3f4'}
        onValueChange={() => setSwitchVal((prevState) => !prevState)}
        value={switchVal}
      />
    </View>
  );
};

const FormCheckbox = () => {
  const [checkBoxValue, setCheckBoxValue] = useState(false);
  const [circleCheckBox, setCircleCheckBox] = useState(false);
  const [coloredCheckbox, setColoredCheckbox] = useState(false);
  return (
    <View>
      <CheckBox
        containerStyle={{ marginLeft: 0, width: '100%' }}
        title={'Square checkbox'}
        checked={checkBoxValue}
        onPress={() => setCheckBoxValue(!checkBoxValue)}
      />
      <CheckBox
        containerStyle={{ marginLeft: 0, width: '100%' }}
        title={'Circle checkbox'}
        checked={circleCheckBox}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        onPress={() => setCircleCheckBox(!circleCheckBox)}
      />
      <CheckBox
        containerStyle={{ marginLeft: 0, width: '100%' }}
        title={'Colored checkbox'}
        checked={coloredCheckbox}
        textStyle={{ color: '#10ac84' }}
        checkedColor="#1ddlal"
        onPress={() => setColoredCheckbox(!coloredCheckbox)}
      />
    </View>
  );
};

const FormDropdown = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([
    'italy',
    'spain',
    'barcelona',
    'finland',
  ]);
  const [items, setItems] = useState([
    { label: 'Spain', value: 'spain' },
    { label: 'Madrid', value: 'madrid', parent: 'spain' },
    { label: 'Barcelona', value: 'barcelona', parent: 'spain' },

    { label: 'Italy', value: 'italy' },
    { label: 'Rome', value: 'rome', parent: 'italy' },

    { label: 'Finland', value: 'finland' },
  ]);
  return (
    <View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        theme="DARK"
        multiple={true}
        mode="BADGE"
        badgeDotColors={[
          '#e76f51',
          '#00b4d8',
          '#e9c46a',
          '#e76f51',
          '#8ac926',
          '#00b4d8',
          '#e9c46a',
        ]}
      />
    </View>
  );
};

const FormPicker = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('js');
  const pickerRef = useRef<Picker<string> | null>(null);

  // function open() {
  //   pickerRef.current?.focus();
  // }
  //
  // function close() {
  //   pickerRef.current?.blur();
  // }

  return (
    <Picker
      ref={pickerRef}
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  );
};
const FormPickerDropdown = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('js');
  const pickerRef = useRef<Picker<string> | null>(null);

  // function open() {
  //   pickerRef.current?.focus();
  // }
  //
  // function close() {
  //   pickerRef.current?.blur();
  // }

  // useEffect(() => {
  //   open();
  // });

  return (
    <Picker
      ref={pickerRef}
      mode="dropdown"
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  );
};

const FormRadio = () => {
  const [value, setValue] = React.useState('one');
  return (
    <>
      {/*defaultValue="two"*/}
      <Radio.Group
        name="myRadioGroup"
        accessibilityLabel="favorite number"
        value={value}
        onChange={(nextValue) => {
          setValue(nextValue);
        }}>
        <Radio value="one" my={1}>
          One
        </Radio>
        <Radio value="two" my={1}>
          Two
        </Radio>
        <Radio value="third" my={1} isDisabled>
          third
        </Radio>
      </Radio.Group>
    </>
  );
};

type IOSMode = 'date' | 'time' | 'datetime' | 'countdown';
type AndroidMode = 'date' | 'time';

const FormDatePicker = () => {
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event: Event, selectedDate: Date) => {
    setDate(selectedDate);
  };

  const showMode = (currentMode: AndroidMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    } as AndroidNativeProps);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
    </View>
  );
};

const FormDatePicker2 = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState<AndroidMode>('date');
  const [show, setShow] = useState(false);

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    setShow(false);
    setDate(selectedDate || new Date());
  };

  const showMode = (currentMode: AndroidMode) => {
    if (Platform.OS === 'android') {
      setShow(true);
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button onPress={showTimepicker} title="Show time picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};
export default function PageForm() {
  return (
    <>
      {/*<FormDropdown />*/}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={basePageStyle.page}>
        <Text style={basePageStyle.pageTitle}>Form</Text>
        <PageItem
          header=""
          content={
            <>
              <FormSwitch />
              <FormCheckbox />
              <FormPicker />
              <FormPickerDropdown />
              <NativeBaseProvider>
                <FormRadio />
              </NativeBaseProvider>
              <FormDatePicker />
              <FormDatePicker2 />
            </>
          }
        />
      </ScrollView>
    </>
  );
}
