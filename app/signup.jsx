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
import { router } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { colors } from './theme/colors';

export default function Signup() {
  const db = useSQLiteContext();

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignup = async () => {
    const email = form.email.trim();
    const password = form.password;
    const confirmPassword = form.confirmPassword;

    if (!email || !password || !confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const existingUser = await db.getFirstAsync(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );

      if (existingUser) {
        alert('An account with this email already exists.');
        return;
      }

      const result = await db.runAsync(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, password]
      );

      const userId = result.lastInsertRowId;

      alert('Account created successfully!');

      router.replace({
        pathname: '/onboarding/start',
        params: { userId: userId.toString() },
      });
    } catch (error) {
      console.error('Signup error:', error);
      alert('Something went wrong while creating your account.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.logo}>FORKCAST</Text>

          <View style={styles.goldLine} />

          <Text style={styles.title}>
            Create your account
          </Text>

          <Text style={styles.subtitle}>
            Let's get to know your food preferences.
          </Text>

        </View>

        <View style={styles.form}>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              EMAIL ADDRESS
            </Text>

            <TextInput
              style={styles.inputControl}
              placeholder="you@example.com"
              placeholderTextColor="#A69A8E"
              value={form.email}
              onChangeText={(email) =>
                setForm({ ...form, email })
              }
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              PASSWORD
            </Text>

            <TextInput
              secureTextEntry
              style={styles.inputControl}
              placeholder="Create a password"
              placeholderTextColor="#A69A8E"
              value={form.password}
              onChangeText={(password) =>
                setForm({ ...form, password })
              }
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              CONFIRM PASSWORD
            </Text>

            <TextInput
              secureTextEntry
              style={styles.inputControl}
              placeholder="Enter your password again"
              placeholderTextColor="#A69A8E"
              value={form.confirmPassword}
              onChangeText={(confirmPassword) =>
                setForm({ ...form, confirmPassword })
              }
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleSignup}
          >
            <Text style={styles.buttonText}>
              CREATE ACCOUNT
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.loginLink}>
                Log in
              </Text>
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.footer}>
          <View style={styles.footerLine} />

          <Text style={styles.footerText}>
            DISCOVER · DECIDE · DINE
          </Text>

          <View style={styles.footerLine} />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: colors.lightPink,
  },

  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 30,
  },

  header: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 40,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 25,
  },

  backText: {
    fontSize: 14,
    color: colors.mutedText,
  },

  logo: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 4,
    color: colors.brown,
  },

  goldLine: {
    width: 45,
    height: 1,
    backgroundColor: colors.coral,
    marginVertical: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.charcoal,
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.mutedText,
    letterSpacing: 0.2,
    textAlign: 'center',
  },

  form: {
    flex: 1,
  },

  inputContainer: {
    marginBottom: 22,
  },

  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.brown,
    letterSpacing: 1.5,
    marginBottom: 9,
  },

  inputControl: {
    height: 52,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    borderRadius: 6,
    fontSize: 16,
    color: colors.charcoal,
    borderWidth: 1,
    borderColor: colors.cream,
  },

  button: {
    height: 54,
    backgroundColor: colors.brown,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 25,
  },

  buttonText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 1.5,
  },

  loginContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },

  loginText: {
    fontSize: 14,
    color: colors.mutedText,
  },

  loginLink: {
    color: colors.deepCoral,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  footerLine: {
    width: 30,
    height: 1,
    backgroundColor: colors.cream,
    marginHorizontal: 10,
  },

  footerText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.mutedText,
    letterSpacing: 1.5,
  },

});