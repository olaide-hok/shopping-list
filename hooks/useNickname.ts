import {useUser} from '@clerk/clerk-expo';

// Nickname e.g. habeeb@expo.io -> habeeb
export const useUserIdAndNickname = () => {
    const user = useUser().user;
    return [user.id, user.primaryEmailAddress.emailAddress.split('@')[0]];
};
