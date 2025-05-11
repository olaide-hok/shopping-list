import {StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {ThemedText} from '@/components/ThemedText';
import {isClerkAPIResponseError, useSignIn} from '@clerk/clerk-expo';
import {useRouter} from 'expo-router';
import {BodyScrollView} from '@/components/ui/BodyScrollView';
import TextInput from '@/components/ui/text-input';
import Button from '@/components/ui/button';
import {ClerkAPIError} from '@clerk/types';

const SignInScreen = () => {
    const {signIn, setActive, isLoaded} = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errors, setErrors] = useState<ClerkAPIError[]>([]);

    // Handle the submission of the sign-in form
    const onSignInPress = useCallback(async () => {
        if (!isLoaded) return;
        setIsSigningIn(true);

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            });

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({session: signInAttempt.createdSessionId});
                router.replace('/(index)');
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                setErrors(err.errors);
            }
        } finally {
            setIsSigningIn(false);
        }
    }, [isLoaded, emailAddress, password]);

    return (
        <BodyScrollView
            contentContainerStyle={{
                padding: 16,
            }}>
            <TextInput
                value={emailAddress}
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
                loading={isSigningIn}
                disabled={!emailAddress || !password || isSigningIn}>
                Sign in
            </Button>

            {errors.map((error) => (
                <ThemedText key={error.longMessage} style={{color: 'red'}}>
                    {error.longMessage}
                </ThemedText>
            ))}

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
