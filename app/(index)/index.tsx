import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {ThemedText} from '@/components/ThemedText';
import {BodyScrollView} from '@/components/ui/BodyScrollView';
import Button from '@/components/ui/button';
import {useClerk} from '@clerk/clerk-expo';
import {Stack, useRouter} from 'expo-router';
import {IconSymbol} from '@/components/ui/IconSymbol';
import {appleBlue} from '@/constants/Colors';

const HomeScreen = () => {
    const router = useRouter();
    const {signOut} = useClerk();

    const renderHeaderRight = () => {
        return (
            <Pressable
                onPress={() => {
                    router.push('/list/new');
                }}>
                <IconSymbol name="plus" color={appleBlue} />
            </Pressable>
        );
    };

    const renderHeaderLeft = () => {
        return (
            <Pressable
                onPress={() => {
                    router.push('/profile');
                }}>
                <IconSymbol name="gear" color={appleBlue} />
            </Pressable>
        );
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerRight: renderHeaderRight,
                    headerLeft: renderHeaderLeft,
                }}
            />
            <BodyScrollView contentContainerStyle={{padding: 16}}>
                <ThemedText type="title">Home In</ThemedText>
                <Button onPress={signOut}>Sign out</Button>
            </BodyScrollView>
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
