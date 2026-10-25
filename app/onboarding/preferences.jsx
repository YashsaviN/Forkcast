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
import { useSQLiteContext } from 'expo-sqlite';
import { updateUserPreferences } from '../../db/database';
import { useLocalSearchParams } from 'expo-router';

export default function FoodPreferences() {
    const [usualOrder, setUsualOrder] = useState('');
    const [favouriteFoods, setFavouriteFoods] = useState('');
    const [comfortFood, setComfortFood] = useState('');
    const [dislikedFoods, setDislikedFoods] = useState('');
    const [moods, setMoods] = useState([]);
    const db = useSQLiteContext();
    const { userId } = useLocalSearchParams();

    const moodOptions = [
        'Comforting',
        'Fresh & light',
        'Spicy',
        'Indulgent',
        'Something new',
        'Quick & easy',
    ];

    const toggleMood = (mood) => {
        if (moods.includes(mood)) {
            setMoods(moods.filter((item) => item !== mood));
        } else {
            setMoods([...moods, mood]);
        }
    };

    const handleContinue = async () => {
    try {
        await updateUserPreferences(
            db,
            userId,
            usualOrder,
            favouriteFoods,
            comfortFood,
            dislikedFoods,
            moods
        );

       router.replace('/chat/chatLand');
    } catch (error) {
        console.error('Error saving preferences:', error);
    }
};

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >

                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                             router.push('/chat/chatLand');
                        }}
                    >
                        <Text style={styles.logo}>FORKCAST</Text>
                    </TouchableOpacity>

                    <Text style={styles.progress}>5 OF 5</Text>
                </View>

                <View style={styles.question}>
                     <Text style={styles.title}>Your Food Preferences</Text>
                    <Text style={styles.questionTitle}>
                        What do you usually order?
                    </Text>

                    <Text style={styles.questionSubtitle}>
                        What do you tend to get when you're deciding what to eat?
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="e.g. butter chicken, pasta, burgers..."
                        placeholderTextColor={colors.mutedText}
                        value={usualOrder}
                        onChangeText={setUsualOrder}
                        multiline
                    />
                </View>

                <View style={styles.question}>
                    <Text style={styles.questionTitle}>
                        What do you love eating?
                    </Text>

                    <Text style={styles.questionSubtitle}>
                        Tell us some foods or dishes you never get tired of.
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="e.g. biryani, noodles, tacos..."
                        placeholderTextColor={colors.mutedText}
                        value={favouriteFoods}
                        onChangeText={setFavouriteFoods}
                        multiline
                    />
                </View>

                <View style={styles.question}>
                    <Text style={styles.questionTitle}>
                        What's your comfort food?
                    </Text>

                    <Text style={styles.questionSubtitle}>
                        What do you reach for when you want something familiar?
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="e.g. dal & rice, mac and cheese..."
                        placeholderTextColor={colors.mutedText}
                        value={comfortFood}
                        onChangeText={setComfortFood}
                        multiline
                    />
                </View>

                <View style={styles.question}>
                    <Text style={styles.questionTitle}>
                        What don't you like eating?
                    </Text>

                    <Text style={styles.questionSubtitle}>
                        Anything you want ForkCast to avoid recommending?
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="e.g. mushrooms, olives, seafood..."
                        placeholderTextColor={colors.mutedText}
                        value={dislikedFoods}
                        onChangeText={setDislikedFoods}
                        multiline
                    />
                </View>

                <View style={styles.question}>
                    <Text style={styles.questionTitle}>
                        What are you usually in the mood for?
                    </Text>

                    <Text style={styles.questionSubtitle}>
                        Pick all that sound like you.
                    </Text>

                    <View style={styles.optionsContainer}>
                        {moodOptions.map((mood) => {
                            const selected = moods.includes(mood);

                            return (
                                <TouchableOpacity
                                    key={mood}
                                    style={[
                                        styles.option,
                                        selected && styles.selectedOption,
                                    ]}
                                    onPress={() => toggleMood(mood)}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            selected && styles.selectedOptionText,
                                        ]}
                                    >
                                        {mood}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={handleContinue}
                >
                    <Text style={styles.continueText}>Continue →</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 28,
        paddingTop: 20,
        paddingBottom: 25,
    },

    content: {
        paddingHorizontal: 28,
        paddingTop: 25,
        paddingBottom: 45,
    },

    header: {
         flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 40,
    },

     logo: {
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 3,
        color: colors.brown,
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        color: colors.charcoal,
        marginBottom: 10,
        lineHeight: 37,
    },

    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: colors.mutedText,
    },

    question: {
        marginBottom: 30,
    },

    questionTitle: {
        fontSize: 19,
        fontWeight: '700',
        color: colors.charcoal,
        marginBottom: 7,
    },

    questionSubtitle: {
        fontSize: 14,
        color: colors.mutedText,
        marginBottom: 13,
        lineHeight: 20,
    },

    input: {
        minHeight: 58,

        backgroundColor: colors.white,

        borderWidth: 1,
        borderColor: colors.softPink,

        borderRadius: 12,

        paddingHorizontal: 15,
        paddingVertical: 14,

        fontSize: 15,
        color: colors.charcoal,

        textAlignVertical: 'top',
    },

    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 4,
    },

    option: {
        paddingHorizontal: 17,
        paddingVertical: 12,

        borderRadius: 25,

        borderWidth: 1,
        borderColor: colors.softPink,

        backgroundColor: colors.white,
    },

    selectedOption: {
        backgroundColor: colors.sage,
        borderColor: colors.sage,
    },

    optionText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.charcoal,
    },

    selectedOptionText: {
        color: colors.white,
    },
    continueButton: {
        height: 55,

        borderRadius: 8,

        backgroundColor: colors.brown,

        alignItems: 'center',
        justifyContent: 'center',

        marginTop: 5,
    },

    continueText: {
        color: colors.white,
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 1.3,
    },

});