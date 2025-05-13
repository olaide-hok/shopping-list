import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Slot} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import 'react-native-reanimated';
import {ClerkProvider, ClerkLoaded} from '@clerk/clerk-expo';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {useColorScheme} from '@/hooks/useColorScheme';
import {tokenCache} from '@/cache';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
    console.error('Please add a clerk key!');
}

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    return (
        <GestureHandlerRootView>
            <ClerkProvider
                publishableKey={publishableKey}
                tokenCache={tokenCache}>
                <ClerkLoaded>
                    <ThemeProvider
                        value={
                            colorScheme === 'dark' ? DarkTheme : DefaultTheme
                        }>
                        <Slot />
                        <StatusBar style="auto" />
                    </ThemeProvider>
                </ClerkLoaded>
            </ClerkProvider>
        </GestureHandlerRootView>
    );
}
