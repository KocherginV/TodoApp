import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const List: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>List</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
