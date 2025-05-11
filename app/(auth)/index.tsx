import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ThemedText} from '@/components/ThemedText';
import {useSignIn} from '@clerk/clerk-expo';
import {Link, useRouter} from 'expo-router';
import {BodyScrollView} from '@/components/ui/BodyScrollView';
import TextInput from '@/components/ui/text-input';
import Button from '@/components/ui/button';

const SignInScreen = () => {
    const {signIn, setActive, isLoaded} = useSignIn();
    const router = useRouter();

    const [emailAdress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);

    const onSignInPress = () => {};

    return (
        <BodyScrollView
            contentContainerStyle={{
                padding: 16,
            }}>
            <TextInput
                value={emailAdress}
                label="Email"
                placeholder="Enter email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmailAddress}
            />
            <TextInput
                value={password}
                label="Password"
                placeholder="Enter password"
                secureTextEntry={true}
                onChangeText={setPassword}
            />
            <Button
                onPress={onSignInPress}
                loading={isSignedIn}
                disabled={!emailAdress || !password || isSignedIn}>
                Sign in
            </Button>

            <View style={{marginTop: 16, alignItems: 'center'}}>
                <ThemedText>Don&apos;t have an account?</ThemedText>
                <Button onPress={() => router.push('/sign-up')} variant="ghost">
                    Sign up
                </Button>
            </View>

            <View style={{marginTop: 16, alignItems: 'center'}}>
                <ThemedText>Forgot password?</ThemedText>
                <Button
                    onPress={() => router.push('/reset-password')}
                    variant="ghost">
                    Reset password
                </Button>
            </View>
        </BodyScrollView>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({});
