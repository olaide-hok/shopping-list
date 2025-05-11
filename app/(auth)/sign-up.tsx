import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {ThemedText} from '@/components/ThemedText';
import {BodyScrollView} from '@/components/ui/BodyScrollView';
import TextInput from '@/components/ui/text-input';
import Button from '@/components/ui/button';
import {useRouter} from 'expo-router';
import {ClerkAPIError} from '@clerk/types';

const SignUpScreen = () => {
    const router = useRouter();

    const [emailAdress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<ClerkAPIError[]>([]);

    const onSignUpPress = () => {};

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
                onPress={onSignUpPress}
                loading={isLoading}
                disabled={!emailAdress || !password || isLoading}>
                Continue
            </Button>

            <View style={{marginTop: 16, alignItems: 'center'}}>
                <ThemedText>Don&apos;t have an account?</ThemedText>
                <Button onPress={() => router.push('/sign-up')} variant="ghost">
                    Sign up
                </Button>
            </View>

            {errors.map((error) => (
                <ThemedText key={error.longMessage} style={{color: 'red'}}>
                    {error.longMessage}
                </ThemedText>
            ))}
        </BodyScrollView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
