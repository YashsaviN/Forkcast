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
import { colors } from './theme/colors';
import { useSQLiteContext } from 'expo-sqlite';
export default function Index() {
  const db = useSQLiteContext();
  const handleLogin = async () => {
    if (!form.email.trim() || !form.password.trim()) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const user = await db.getFirstAsync(
        `SELECT * FROM users WHERE email = ? AND password = ?`,
        [form.email.trim(), form.password]
      );
      if (user) {
        console.log("Logged in user:", user);

        router.replace("/chat/chatLand");
      } else {
        alert("Incorrect email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong while logging in.");
    }
  };
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
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>
              PASSWORD
            </Text>

            <TextInput
              secureTextEntry
              style={styles.inputControl}
              placeholder="Enter your password"
              placeholderTextColor="#A69A8E"
              value={form.password}
              onChangeText={(password) =>
                setForm({ ...form, password })
              }
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotText}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>
              LET FORKCAST DECIDE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupContainer}
            onPress={() => router.push('/signup')}
          >
            <Text style={styles.signupText}>
              New to Forkcast?{' '}
              <Text style={styles.signupLink}>
                Create an account
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
    marginTop: 55,
    marginBottom: 50,
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
    fontSize: 30,
    fontWeight: '700',
    color: colors.charcoal,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.mutedText,
    letterSpacing: 0.2,
  },

  form: {
    flex: 1,
  },

  inputContainer: {
    marginBottom: 24,
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

  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
    marginBottom: 28,
  },

  forgotText: {
    fontSize: 13,
    color: colors.mutedText,
    textDecorationLine: 'underline',
  },

  button: {
    height: 54,
    backgroundColor: colors.brown,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },

  buttonText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 1.5,
  },

  signupContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },

  signupText: {
    fontSize: 14,
    color: colors.mutedText,
  },

  signupLink: {
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
