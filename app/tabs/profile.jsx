import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Home() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.logo}>FORKCAST</Text>

          <View style={styles.goldLine} />

          <Text style={styles.title}>
            Welcome back
          </Text>

          <Text style={styles.subtitle}>
            Let's decide what you're eating.
          </Text>
        </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: '#F7F1E8',
  },

  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 30,
  },


  header: {
    alignItems: 'center',
    marginTop: 55,
    marginBottom: 50,
  },

  logo: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 4,
    color: '#641C2B',
  },

  goldLine: {
    width: 45,
    height: 1,
    backgroundColor: '#B08D57',
    marginVertical: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#29231F',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#81766C',
    letterSpacing: 0.2,
  },
});
