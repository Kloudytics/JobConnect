import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';

export default function ProfileScreen() {
  const colorScheme = useColorScheme() || 'light'; // fallback to 'light' if undefined

  return (
    <SafeAreaView style={styles(colorScheme).container}>
      <View style={styles(colorScheme).content}>
        <Text style={styles(colorScheme).text}>Profile Content</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = (colorScheme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === 'dark' ? '#000' : '#F2F2F7',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: colorScheme === 'dark' ? '#fff' : '#000',
      fontSize: 18,
    },
  });