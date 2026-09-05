import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/colors';
import { useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { updateUserBudget } from '../../db/database';

export default function Budget() {
    const db = useSQLiteContext();
        const { userId } = useLocalSearchParams();
    const [selectedBudget, setSelectedBudget] = useState(null);


    const budgetOptions = [
        {
            amount: '$10',
            description: 'Budget friendly',
        },
        {
            amount: '$15',
            description: 'Casual',
        },
        {
            amount: '$20',
            description: 'Regular',
        },
        {
            amount: '$30',
            description: 'Treat myself',
        },
        {
            amount: '$40',
            description: 'Splurge',
        },
        {
            amount: '$50+',
            description: 'No limit',
        },
    ];

    const handleContinue = async () => {
        if (!selectedBudget) return;

        try {
            await updateUserBudget(db, userId, selectedBudget);

            router.push({
                pathname: '/onboarding/dietary',
                params: { userId },
            });
        } catch (error) {
            console.error('Error saving budget:', error);
        }
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            router.push('/onboarding/start');
                        }}
                    >
                        <Text style={styles.logo}>FORKCAST</Text>
                    </TouchableOpacity>

                    <Text style={styles.progress}>2 OF 5</Text>
                </View>

                <View style={styles.questionContainer}>
                    <Text style={styles.question}>
                        What's your usual
                        {'\n'}
                        meal budget?
                    </Text>

                    <Text style={styles.subtitle}>
                        This helps us find options that fit
                        your usual spending.
                    </Text>
                </View>
                <View style={styles.optionsContainer}>

                    {budgetOptions.map((option) => {
                        const isSelected =
                            selectedBudget === option.amount;

                        return (
                            <TouchableOpacity
                                key={option.amount}
                                style={[
                                    styles.option,
                                    isSelected && styles.selectedOption,
                                ]}
                                activeOpacity={0.7}
                                onPress={() =>
                                    setSelectedBudget(option.amount)
                                }
                            >
                                <Text
                                    style={[
                                        styles.amount,
                                        isSelected && styles.selectedText,
                                    ]}
                                >
                                    {option.amount}
                                </Text>

                                <Text
                                    style={[
                                        styles.description,
                                        isSelected &&
                                        styles.selectedDescription,
                                    ]}
                                >
                                    {option.description}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}

                </View>

                <TouchableOpacity
                    style={[
                        styles.button,
                        !selectedBudget && styles.disabledButton,
                    ]}
                    disabled={!selectedBudget}
                    activeOpacity={0.8}
                    onPress={handleContinue}
                >
                    <Text style={styles.buttonText}>
                        CONTINUE
                    </Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },

    container: {
        flex: 1,
        paddingHorizontal: 28,
        paddingTop: 20,
        paddingBottom: 25,
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

    progress: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
        color: colors.mutedText,
    },

    questionContainer: {
        marginBottom: 35,
    },

    question: {
        fontSize: 30,
        fontWeight: '700',
        color: colors.charcoal,
        lineHeight: 37,
        marginBottom: 12,
    },

    subtitle: {
        fontSize: 15,
        color: colors.mutedText,
        lineHeight: 22,
    },

    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 14,
    },

    option: {
        width: '48%',
        minHeight: 95,

        backgroundColor: colors.white,

        borderWidth: 1,
        borderColor: colors.softPink,

        borderRadius: 16,

        padding: 18,

        justifyContent: 'center',
        alignItems: 'center',
    },

    selectedOption: {
        backgroundColor: colors.sage,
        borderColor: colors.sage,
    },

    amount: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.charcoal,
        marginBottom: 5,
    },

    selectedText: {
        color: colors.white,
    },

    description: {
        fontSize: 13,
        color: colors.mutedText,
        textAlign: 'center',
    },

    selectedDescription: {
        color: colors.lightSage,
    },

    button: {
        height: 54,
        backgroundColor: colors.brown,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
    },

    disabledButton: {
        backgroundColor: colors.softPink,
    },

    buttonText: {
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1.5,
        color: colors.white,
    },

});