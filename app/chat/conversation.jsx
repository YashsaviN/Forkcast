import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';

import { colors } from '../theme/colors';

export default function Conversation() {
  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'forkcast',
      text: "Hey! I'm Forkie. Let's figure out what you should eat.",
    },
    {
      id: 2,
      sender: 'forkcast',
      text: 'What are you in the mood for?',
    },
  ]);

  const quickReplies = [
    'Comforting',
    'Spicy',
    'Fresh & light',
    'Something filling',
    'Surprise me',
  ];

  const sendMessage = (text = message) => {
    const trimmedMessage = text.trim();

    if (!trimmedMessage) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmedMessage,
    };

    setMessages((previous) => [...previous, userMessage]);
    setMessage('');

    let forkieResponse = "Hmm, let me think about that!";

    const lowerMessage = trimmedMessage.toLowerCase();

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

    setTimeout(() => {
      const forkieMessage = {
        id: Date.now() + 1,
        sender: 'forkcast',
        text: forkieResponse,
      };

      setMessages((previous) => [...previous, forkieMessage]);
    }, 500);
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

      </ScrollView>

      <View style={styles.inputArea}>

        <TextInput
          style={styles.input}
          placeholder="Tell Forkie what you're craving..."
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
