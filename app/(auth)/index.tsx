import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ThemedText} from '@/components/ThemedText';
import {useSignIn} from '@clerk/clerk-expo';
import {Link, useRouter} from 'expo-router';

const SignInScreen = () => {
    const {signIn, setActive, isLoaded} = useSignIn();
    const router = useRouter();

    const [emailAdress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <View>
            <ThemedText type="title">Sign In</ThemedText>
            <Link href={'/sign-up'}> Go to Sign Up</Link>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({});
