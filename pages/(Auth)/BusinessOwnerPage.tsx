import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BusinessOwnerPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, Business Owner!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default BusinessOwnerPage;
