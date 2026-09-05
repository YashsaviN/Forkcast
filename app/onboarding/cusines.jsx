import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { colors } from '../theme/colors';
import { useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { updateUserCuisine } from '../../db/database';

export default function Cuisines() {
    const db = useSQLiteContext();
    const { userId } = useLocalSearchParams();

    const cuisines = [
        'Indian',
        'Italian',
        'Chinese',
        'Japanese',
        'Mexican',
        'Thai',
        'Korean',
        'Mediterranean',
        'Middle Eastern',
        'Vietnamese',
        'Caribbean',
        'American',
    ];

    const [selectedCuisines, setSelectedCuisines] = useState([]);

    const toggleCuisine = (cuisine) => {
        if (selectedCuisines.includes(cuisine)) {
            setSelectedCuisines(
                selectedCuisines.filter((item) => item !== cuisine)
            );
        } else {
            setSelectedCuisines([
                ...selectedCuisines,
                cuisine,
            ]);
        }
    };

    const handleContinue = async () => {
        if (!selectedCuisines) return;

        try {
            await updateUserCuisine(db, userId, selectedCuisines);

            router.push({
                pathname: '/onboarding/budget',
                params: { userId },
            });
        } catch (error) {
            console.error('Error saving cuisine:', error);
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

                    <Text style={styles.progress}>
                        1 OF 5
                    </Text>

                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >

                    <View style={styles.questionContainer}>

                        <Text style={styles.question}>
                            What cuisines do you enjoy?
                        </Text>

                        <Text style={styles.subtitle}>
                            Select all that sound good to you.
                        </Text>

                    </View>

                    <View style={styles.optionsContainer}>

                        {cuisines.map((cuisine) => {

                            const isSelected =
                                selectedCuisines.includes(cuisine);

                            return (
                                <TouchableOpacity
                                    key={cuisine}
                                    style={[
                                        styles.option,
                                        isSelected && styles.selectedOption,
                                    ]}
                                    onPress={() => toggleCuisine(cuisine)}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            isSelected && styles.selectedOptionText,
                                        ]}
                                    >
                                        {isSelected ? '✓ ' : ''}
                                        {cuisine}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}

                    </View>

                </ScrollView>

                <TouchableOpacity
                    style={[
                        styles.button,
                        selectedCuisines.length === 0 && styles.disabledButton,
                    ]}
                    disabled={selectedCuisines.length === 0}
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
        paddingBottom: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 35,
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
        marginBottom: 30,
    },

    question: {
        fontSize: 29,
        fontWeight: '700',
        color: colors.charcoal,
        lineHeight: 36,
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 15,
        color: colors.mutedText,
        lineHeight: 22,
    },

    scrollContent: {
        paddingBottom: 20,
    },

    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },

    option: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.softPink,
        borderRadius: 30,
        paddingVertical: 13,
        paddingHorizontal: 19,
    },

    selectedOption: {
        backgroundColor: colors.sage,
        borderColor: colors.sage,
    },

    optionText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.charcoal,
    },

    selectedOptionText: {
        color: colors.white,
    },

    button: {
        height: 54,
        backgroundColor: colors.brown,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
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