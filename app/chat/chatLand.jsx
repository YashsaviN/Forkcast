import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';

import { colors } from '../theme/colors';

export default function chatLand() {
  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.container}>

        <View style={styles.header}>

          <Text style={styles.logo}>FORKCAST</Text>

          <View style={styles.goldLine} />

          <Text style={styles.title}>
            Meet Forkie
          </Text>

          <Text style={styles.subtitle}>
            Your food decision assistant
          </Text>

        </View>

        <View style={styles.card}>

          <View style={styles.iconCircle}>
            <Text style={styles.icon}>🍴</Text>
          </View>

          <Text style={styles.cardTitle}>
            Not sure what to eat?
          </Text>

          <Text style={styles.cardText}>
            Tell Forkie what you're craving, how you're feeling,
            or what kind of meal you want. I'll help you decide.
          </Text>

        </View>

        <View style={styles.bottom}>

          <TouchableOpacity
            style={styles.startButton}
            activeOpacity={0.8}
            onPress={() => router.push('/chat/conversation')}
          >
            <Text style={styles.startButtonText}>
              START CHAT
            </Text>
          </TouchableOpacity>

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
    paddingVertical: 25,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 25,
  },

  backText: {
    fontSize: 14,
    color: colors.mutedText,
  },

  header: {
    alignItems: 'center',
    marginBottom: 30,
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
    marginVertical: 18,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.charcoal,
    marginBottom: 7,
  },

  subtitle: {
    fontSize: 14,
    color: colors.mutedText,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    marginBottom: 30,
  },

  iconCircle: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: colors.cream,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  icon: {
    fontSize: 28,
  },

  cardTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: colors.charcoal,
    marginBottom: 10,
    textAlign: 'center',
  },

  cardText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.mutedText,
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: colors.brown,
    marginBottom: 12,
  },

  bottom: {
    marginTop: 10,
  },

  startButton: {
    height: 54,
    backgroundColor: colors.brown,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  startButtonText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 1.5,
  },

});
