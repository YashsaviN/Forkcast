import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  return (
    <SafeAreaView style= {{ flex: 1, backgroundColor: '#e8ecf4'}}>
    <View style={styles.container}>
      <View style = {styles.header}>
        <text style = {styles.title}> Sign in to Forkcast</text>
        <text style = {styles.subtitle}> Get access to your profile </text>
      </View>
      <View style = {styles.form}>
        <View style = {styles.input}>
          <Text style = {styles.inputLabel}> Email address </Text>
          <TextInput style = {styles.inputControl} value = {form.email} onChangeText={email => setForm({...form, email})}/>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginVertical: 36,
  },
  title: {
    fontSize: 27, 
    fontWeight: '700',
    color: '#1e1e1e',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15, 
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },

  input:{},
  inputLabel: {
    fontSize: 17, 
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44, 
    backgroundColor: '#fff',
    paddingHorizontal: 16, 
    borderRadius: 12,
    fontSize: 15, 
    fontWeight: '500',
    color: '#222',
  },
});
