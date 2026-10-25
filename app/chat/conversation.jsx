import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';

import { colors } from '../theme/colors';
import { getUserPrefs, updateUserCity } from '../../db/database';

const API_URL = 'https://forkie.negiyashsavi.workers.dev/';

function getFallbackReply(text) {
  const lowerMessage = text.toLowerCase();

  let forkieResponse = "Hmm, let me think about that!";

  if (
    lowerMessage.includes('spicy') ||
    lowerMessage.includes('hot')
  ) {
    forkieResponse =
      "Something spicy sounds good! How about a spicy chicken bowl, curry, or some spicy noodles?";
  } else if (
    lowerMessage.includes('comfort') ||
    lowerMessage.includes('cozy')
  ) {
    forkieResponse =
      "Sounds like you need some comfort food! I'd suggest mac and cheese, ramen, or a warm bowl of curry.";
  } else if (
    lowerMessage.includes('light') ||
    lowerMessage.includes('fresh')
  ) {
    forkieResponse =
      "Let's keep it fresh and light! A salad bowl, sushi, or a rice bowl with veggies could be a good choice.";
  } else if (
    lowerMessage.includes('filling') ||
    lowerMessage.includes('hungry')
  ) {
    forkieResponse =
      "You're looking for something filling! I'd go for a burrito bowl, burger, pasta, or a hearty rice dish.";
  } else if (
    lowerMessage.includes('surprise')
  ) {
    forkieResponse =
      "Okay, I'll choose for you! How about trying a Korean rice bowl today?";
  } else if (
    lowerMessage.includes('pizza')
  ) {
    forkieResponse =
      "Pizza is always a solid choice! Do you want something cheesy, spicy, or loaded with toppings?";
  } else if (
    lowerMessage.includes('what should i eat')
  ) {
    forkieResponse =
      "Let's figure it out! Are you feeling like something comforting, spicy, fresh, or filling?";
  }

  return forkieResponse;
}

export default function Conversation() {
  const db = useSQLiteContext();
  const scrollRef = useRef(null);
  const introDone = useRef(false);

  const { userId } = useLocalSearchParams();

  const [message, setMessage] = useState('');
  const [prefs, setPrefs] = useState({});
  const [loading, setLoading] = useState(false);
  const [prefsReady, setPrefsReady] = useState(false);
  const [awaitingCity, setAwaitingCity] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'forkcast',
      text: "Hey! I'm Forkie. Let's figure out what you should eat.",
    },
  ]);

  const quickReplies = [
    'Comforting',
    'Spicy',
    'Fresh & light',
    'Something filling',
    'Surprise me',
  ];

  const addForkieMessage = (text, setup = false) => {
    setMessages((previous) => [
      ...previous,
      { id: Date.now() + Math.random(), sender: 'forkcast', text, setup },
    ]);
  };

  useEffect(() => {
    if (introDone.current) return;
    introDone.current = true;

    (async () => {
      let loaded = {};
      try {
        if (userId != null) loaded = await getUserPrefs(db, userId);
      } catch (error) {
        console.log('Could not load prefs:', error);
      }

      console.log('userId:', userId, 'prefs loaded:', loaded);
      setPrefs(loaded);

      if (loaded.city) {
        addForkieMessage('What are you in the mood for?');
      } else {
        addForkieMessage('Which city are you in?', true);
        setAwaitingCity(true);
      }
      setPrefsReady(true);
    })();
  }, []);

  const sendMessage = async (text = message) => {
    const trimmedMessage = text.trim();

    if (!trimmedMessage || loading) return;

    if (awaitingCity) {
      setMessages((previous) => [
        ...previous,
        { id: Date.now(), sender: 'user', text: trimmedMessage, setup: true },
      ]);
      setMessage('');

      if (
        trimmedMessage.length < 2 ||
        trimmedMessage.length > 60 ||
        /\d/.test(trimmedMessage)
      ) {
        addForkieMessage('Just the city name is fine, like Toronto or Paris.', true);
        return;
      }

      setPrefs((previous) => ({ ...previous, city: trimmedMessage }));
      setAwaitingCity(false);

      try {
        if (userId != null) await updateUserCity(db, userId, trimmedMessage);
      } catch (error) {
        console.log('Could not save city:', error);
      }

      addForkieMessage(`Got it, ${trimmedMessage}! What are you in the mood for?`, true);
      return;
    }

    const history = messages
      .filter((m) => !m.setup)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }))
      .slice(-10);
    while (history.length && history[0].role === 'assistant') history.shift();

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmedMessage,
    };

    setMessages((previous) => [...previous, userMessage]);
    setMessage('');
    setLoading(true);

    let forkieResponse;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmedMessage,
          history,
          prefs,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`Server error ${res.status}: ${await res.text()}`);
      }

      const data = await res.json();
      forkieResponse = data.reply || getFallbackReply(trimmedMessage);
    } catch (error) {
      console.log('Forkie API error:', error);
      if (__DEV__) Alert.alert('Forkie API error', String(error));
      forkieResponse = getFallbackReply(trimmedMessage);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }

    const forkieMessage = {
      id: Date.now() + 1,
      sender: 'forkcast',
      text: forkieResponse,
    };

    setMessages((previous) => [...previous, forkieMessage]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>

        <View style={styles.headerText}>

          <Text style={styles.logo}>
            FORKIE
          </Text>

          <Text style={styles.subtitle}>
            Your food decision assistant
          </Text>

        </View>

      </View>

      <ScrollView
        ref={scrollRef}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({ animated: true })
        }
        style={styles.chat}
        contentContainerStyle={styles.chatContent}
      >

        {messages.map((item) => (
          <View
            key={item.id}
            style={[
              styles.messageBubble,
              item.sender === 'user'
                ? styles.userBubble
                : styles.forkcastBubble,
            ]}
          >

            <Text
              style={[
                styles.messageText,
                item.sender === 'user'
                  ? styles.userText
                  : styles.forkcastText,
              ]}
            >
              {item.text}
            </Text>

          </View>
        ))}

        {loading && (
          <View style={[styles.messageBubble, styles.forkcastBubble]}>
            <Text style={[styles.messageText, styles.forkcastText]}>
              Forkie is thinking...
            </Text>
          </View>
        )}

        {prefsReady && !awaitingCity && (
        <View style={styles.quickReplies}>

          {quickReplies.map((reply) => (
            <TouchableOpacity
              key={reply}
              style={styles.quickReply}
              onPress={() => sendMessage(reply)}
            >
              <Text style={styles.quickReplyText}>
                {reply}
              </Text>
            </TouchableOpacity>
          ))}

        </View>
        )}

      </ScrollView>

      <View style={styles.inputArea}>

        <TextInput
          style={styles.input}
          placeholder={awaitingCity ? 'Type your city...' : "Tell Forkie what you're craving..."}
          placeholderTextColor={colors.mutedText}
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={() => sendMessage()}
          returnKeyType="send"
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => sendMessage()}
        >
          <Text style={styles.sendText}>
            ➤
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: colors.lightPink,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.cream,
  },

  backButton: {
    width: 40,
  },

  backText: {
    fontSize: 25,
    color: colors.brown,
  },

  headerText: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40,
  },

  logo: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 3,
    color: colors.brown,
  },

  subtitle: {
    fontSize: 11,
    color: colors.mutedText,
    marginTop: 4,
  },

  chat: {
    flex: 1,
  },

  chatContent: {
    padding: 20,
    paddingBottom: 30,
  },

  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 12,
  },

  forkcastBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
  },

  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.brown,
    borderBottomRightRadius: 4,
  },

  messageText: {
    fontSize: 15,
    lineHeight: 21,
  },

  forkcastText: {
    color: colors.charcoal,
  },

  userText: {
    color: colors.white,
  },

  quickReplies: {
    marginTop: 8,
    gap: 10,
  },

  quickReply: {
    alignSelf: 'flex-start',
    backgroundColor: colors.cream,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 20,
  },

  quickReplyText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.brown,
  },

  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.cream,
  },

  input: {
    flex: 1,
    height: 46,
    backgroundColor: colors.lightPink,
    borderRadius: 23,
    paddingHorizontal: 18,
    fontSize: 14,
    color: colors.charcoal,
  },

  sendButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.brown,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  sendText: {
    color: colors.white,
    fontSize: 20,
  },

});