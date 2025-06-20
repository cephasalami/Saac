import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import { View, ViewStyle } from 'react-native';

interface Props {
  value: string;
  size?: number;
  containerStyle?: ViewStyle;
}

export default function QRCodeDisplay({ value, size = 200, containerStyle }: Props) {
  return (
    <View style={containerStyle}>
      <QRCode value={value} size={size} />
    </View>
  );
}
