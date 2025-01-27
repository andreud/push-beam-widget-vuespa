import { ref } from 'vue'
import * as PusherPushNotifications from "@pusher/push-notifications-web";

const useBeamsClient = (
    instanceId: string,
    url: string,
    userLocalId: string
) => {
    
    const beamsClient = new PusherPushNotifications.Client({instanceId});
    const deviceId = ref('');

    async function startAuth() {
        console.log('startAuth()');
        const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
            url,// en la respuesta de este endpoint debe venir el token que se debe pasar en auth bearer04
            queryParams: {
                someQueryParam: "parameter-content", // URL query params your auth endpoint needs
            },
            headers: {
                someHeader: "header-content", // Headers your auth endpoint needs
            },
        });
        console.log({beamsTokenProvider});
        
        const clientsrtres = await beamsClient.start();
        console.log("clientsrtre");
        console.log({clientsrtres});
        const setUserResult = await beamsClient.setUserId(
            userLocalId, //'12', 
            beamsTokenProvider
        ); // An object that contains a method called fetchToken. This method must return a promise that resolves to a correctly signed Beams Token for the desired user ID (
        console.log('Beams client setUserId', setUserResult);
        
    }

    async function getBeamsUser() {
        console.log('getBeamsUser()');
        // Get User ID
        //const userIdResp = await beamsClient.getUserId();
        //console.log('Beams client userId', userIdResp);
        // Get Device ID
        const deviceIdResp = await beamsClient.getDeviceId();
        console.log('Beams client deviceId', deviceIdResp);
        deviceId.value = deviceIdResp;
    }

    async function logOut() {
        console.log('logOut()');
        await beamsClient.stop();
        console.log('Beams client stopped');
    }

    return {
        deviceId,
        startAuth,
        getBeamsUser,
        logOut
    }  

}

export default useBeamsClient;

