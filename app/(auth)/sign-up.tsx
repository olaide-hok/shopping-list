import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {ThemedText} from '@/components/ThemedText';
import {BodyScrollView} from '@/components/ui/BodyScrollView';
import TextInput from '@/components/ui/text-input';
import Button from '@/components/ui/button';
import {useRouter} from 'expo-router';
import {ClerkAPIError} from '@clerk/types';
import {useSignUp} from '@clerk/clerk-expo';

const SignUpScreen = () => {
    const {signUp, setActive, isLoaded} = useSignUp();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<ClerkAPIError[]>([]);
    const [code, setCode] = useState('');

    const [pendingVerification, setPendingVerification] = useState(false);

    const onSignUpPress = async () => {
        if (!isLoaded) return;
        setIsLoading(true);
        setErrors([]);

        try {
            // Start with creating a user
            await signUp.create({
                emailAddress,
                password,
            });
            // confirmation
            await signUp.prepareEmailAddressVerification({
                strategy: 'email_code',
            });
            setPendingVerification(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    const onVerifyPress = async () => {
        if (!isLoaded) return;
        setIsLoading(true);
        setErrors([]);

        try {
            // Start with creating a user
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (signUpAttempt.status === 'complete') {
                await setActive({session: signUpAttempt.createdUserId});
                router.replace('/');
            } else {
                console.log(signUpAttempt);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (pendingVerification) {
        return (
            <BodyScrollView>
                <TextInput
                    value={code}
                    label={`Enter the verification cose we sent to ${emailAddress}`}
                    placeholder="Enter your verification code"
                    onChangeText={(code) => setCode(code)}
                />
                <Button
                    onPress={onVerifyPress}
                    disabled={!code || isLoading}
                    loading={isLoading}>
                    {' '}
                    Verify
                </Button>

                {errors.map((error) => (
                    <ThemedText key={error.longMessage} style={{color: 'red'}}>
                        {error.longMessage}
                    </ThemedText>
                ))}
            </BodyScrollView>
        );
    }

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
                onPress={onSignUpPress}
                loading={isLoading}
                disabled={!emailAddress || !password || isLoading}>
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
