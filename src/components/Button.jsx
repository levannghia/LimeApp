import { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


export const Button = forwardRef(
  ({ onPress, title, ...otherProps }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        style={[styles.button, { backgroundColor: otherProps.disabled ? 'gray' : '#38C400' }]}
        onPress={onPress}
        {...otherProps}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#38C400',
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 14,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});