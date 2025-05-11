import {StyleSheet} from 'react-native';
import React from 'react';
import {ThemedText} from '@/components/ThemedText';
import {BodyScrollView} from '@/components/ui/BodyScrollView';
import Button from '@/components/ui/button';
import {useClerk} from '@clerk/clerk-expo';

const HomeScreen = () => {
    const {signOut} = useClerk();
    return (
        <BodyScrollView contentContainerStyle={{padding: 16}}>
            <ThemedText type="title">Home In</ThemedText>
            <Button onPress={signOut}>Sign out</Button>
        </BodyScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
