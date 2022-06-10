
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react'



export default function googleLogin() {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "826522083669-q67ceh0fs4go50k2p5cud091s6gv3vke.apps.googleusercontent.com",
            offlineAccess: true
        });
    }, [])
    
    return(
    
    
    async function GoogleSingUp() {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signIn().then(result => { console.log(result) });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                alert('User cancelled the login flow !');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert('Signin in progress');
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('Google play services not available or outdated !');
                // play services not available or outdated
            } else {
                console.log(error)
            }
        }
    }
    )
}