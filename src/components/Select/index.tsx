import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { Picker, PickerProps } from '@react-native-picker/picker';
import {
  ActionSheetIOS,
  Platform,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import styles from './styles';
import { colors } from '~/global';

interface SelectItem<T = string> {
  key: string;
  label: string;
  value: T;
}

interface SelectProps extends PickerProps<string> {
  label?: string;
  items: SelectItem[];
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  isRequired?: boolean;
  placeholder: string;
}

export interface SelectRef {
  open: () => void;
}

const Select = forwardRef<SelectRef, SelectProps>(
  (
    {
      label,
      items = [],
      error,
      containerStyle,
      isRequired,
      placeholder,
      ...rest
    },
    ref,
  ) => {
    const { selectedValue, onValueChange } = rest;
    const isItemsEmpty = items.length === 0;
    const isIOS = Platform.OS === 'ios';
    const pickerRef = useRef<Picker<string>>(null);

    const selectedLabel = useMemo(() => {
      return items.find((i) => i.value === selectedValue)?.label || placeholder;
    }, [items, selectedValue, placeholder]);

    const optionsIos = useMemo(
      () => [...items.map((i) => i.label), 'Cancelar'],
      [items],
    );

    const showActionSheet = useCallback(() => {
      const cancelButtonIndex = optionsIos.length - 1;

      const selectedValueIndex = items.findIndex(
        (i) => i.value === selectedValue,
      );

      const disabledButtonIndices =
        selectedValueIndex === -1 ? [] : [selectedValueIndex];

      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: placeholder,
          options: optionsIos,
          message: 'Escolha uma opção',
          cancelButtonIndex,
          cancelButtonTintColor: colors.danger,
          disabledButtonIndices,
        },
        (buttonIndex) => {
          if (buttonIndex === cancelButtonIndex) return;

          const selectedItem = items[buttonIndex];
          onValueChange?.(selectedItem.value, buttonIndex);
        },
      );
    }, [optionsIos, items, onValueChange, placeholder, selectedValue]);

    useImperativeHandle(ref, () => ({
      open: () => {
        if (isIOS) {
          showActionSheet();
        } else {
          pickerRef.current?.focus();
        }
      },
    }));

    return (
      <>
        {!!label && (
          <Text style={[styles.label, !!error && styles.labelError]}>
            {label}
            {isRequired && <Text style={styles.asterisk}> *</Text>}
          </Text>
        )}

        <View
          style={[
            styles.container,
            !!error && styles.containerError,
            containerStyle,
          ]}
        >
          {isIOS ? (
            <TouchableOpacity
              disabled={isItemsEmpty}
              activeOpacity={0.9}
              onPress={showActionSheet}
            >
              <Text
                style={[
                  styles.pickerItem,
                  {
                    color: error
                      ? colors.danger
                      : isItemsEmpty || !selectedValue
                        ? colors.text10
                        : colors.black,
                  },
                ]}
              >
                {selectedLabel}
              </Text>
            </TouchableOpacity>
          ) : (
            <Picker<string>
              ref={pickerRef}
              {...rest}
              dropdownIconColor={
                error
                  ? colors.danger
                  : isItemsEmpty || !selectedValue
                    ? colors.text10
                    : colors.black
              }
            >
              <Picker.Item
                label={placeholder}
                value=""
                enabled={false}
                color={error ? colors.danger : colors.text10}
              />

              {items.map((item) => (
                <Picker.Item
                  key={item.key}
                  label={item.label}
                  value={item.value}
                  color={colors.black}
                />
              ))}
            </Picker>
          )}
        </View>

        {!!error && <Text style={styles.errorMessage}>{error}</Text>}
      </>
    );
  },
);

export default Select;
