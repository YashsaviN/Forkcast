import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/colors';

export default function Start() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>

          <Text style={styles.logo}>
            FORKCAST
          </Text>

          <View style={styles.goldLine} />

          <Text style={styles.title}>
            Let's make ForkCast
            <Text style={styles.titleAccent}> personal to you.</Text>
          </Text>

          <Text style={styles.subtitle}>
            Before we start making decisions,
            let's get to know your taste.
          </Text>

        </View>

        {/* Explanation */}
        <View style={styles.content}>

          <Text style={styles.sectionLabel}>
            WHAT WE'LL LEARN
          </Text>

          <View style={styles.infoContainer}>

            <View style={styles.infoRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.infoText}>
                Your favourite cuisines
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.infoText}>
                Foods you enjoy and avoid
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.infoText}>
                Your usual orders
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.infoText}>
                Your comfort foods
              </Text>
            </View>

          </View>

          <Text style={styles.description}>
            Your answers help ForkCast understand
            what you like, so its recommendations
            can feel more personal to you.
          </Text>

        </View>

        {/* Button */}
        <View style={styles.bottom}>

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => {
              router.replace('/onboarding/cusines');
            }}
          >
            <Text style={styles.buttonText}>
              START PERSONALIZING
            </Text>
          </TouchableOpacity>

          <Text style={styles.timeText}>
            A few quick questions · That's it
          </Text>

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
    fontSize: 29,
    fontWeight: '700',
    color: colors.charcoal,
    textAlign: 'center',
    lineHeight: 37,
    marginBottom: 12,
  },

  titleAccent: {
    color: colors.deepCoral,
  },

  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.mutedText,
    letterSpacing: 0.2,
    textAlign: 'center',
    lineHeight: 23,
    maxWidth: 300,
  },

  content: {
    flex: 1,
  },

  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.brown,
    letterSpacing: 1.5,
    marginBottom: 20,
  },

  infoContainer: {
    marginBottom: 28,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },

  bullet: {
    fontSize: 22,
    color: colors.coral,
    width: 25,
  },

  infoText: {
    fontSize: 16,
    color: colors.charcoal,
  },

  description: {
    fontSize: 14,
    color: colors.mutedText,
    lineHeight: 22,
    maxWidth: 330,
  },

  bottom: {
    marginBottom: 15,
  },

  button: {
    height: 54,
    backgroundColor: colors.brown,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  buttonText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: 1.5,
  },

  timeText: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.mutedText,
  },

});