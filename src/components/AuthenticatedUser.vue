<template>
    <div class="push-widget-authenticated-user">
        
        <p>Status:  </p>
        <p>Device Id: {{ deviceId }} </p>
        <p>App User Id: {{ appUserId }}</p>

        <button @click="startAuth">Authorize</button>
        <button @click="getBeamsUser">Get User</button>
        <button @click="logOut">Log Out</button>

    </div>
</template>

<script lang="ts">
import { ref/*, defineProps*/ } from 'vue'
import * as PusherPushNotifications from "@pusher/push-notifications-web";

export default{
    
    props:{
        appUserId: String,
        beamsInstanceId: String,
        authEndpoint: String // URL sirve pero no acepta vacio
    },

    setup(props) {
        // defineProps<{appUserId :string }>() // solo sive con <script setup>

        const deviceId = ref('x');
        
        async function startAuth() : Promise<void> {

            if (!props.authEndpoint || !props.appUserId || !props.beamsInstanceId) {
                throw new Error("authEndpoint, appUserId and beamsInstanceId are required");
            }

            const instanceId = props.beamsInstanceId;
            const url = props.authEndpoint;
            const userLocalId = props.appUserId;

            const beamsClient = new PusherPushNotifications.Client({instanceId});
            console.log({beamsClient});

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
            
            try {
                const clientsrtres = await beamsClient.start();
                console.log({clientsrtres});

                const setUserResult = await beamsClient.setUserId(
                    userLocalId, //'12', 
                    beamsTokenProvider
                ); // An object that contains a method called fetchToken. This method must return a promise that resolves to a correctly signed Beams Token for the desired user ID (
                console.log('Beams client setUserId', setUserResult);
            
            } catch (error) {
                console.error(error);
            }
        }

        function getBeamsUser() {
            return '';
        }

        function logOut() {
            return '';
        }

        return {
            deviceId,
            startAuth,
            getBeamsUser,
            logOut
        }
    }
}
</script>
