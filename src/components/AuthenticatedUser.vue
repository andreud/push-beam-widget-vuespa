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
        appUserId: String
    },

    setup(props) {

        const instanceId = '';
        const url = '';
        // defineProps<{appUserId :string }>() // solo sive con <script setup>

        const deviceId = ref('x');

        async function startAuth() : Promise<void> {
            //const instanceId = '';
            //const url = '';
            const userLocalId = props.appUserId;

            const beamsClient = new PusherPushNotifications.Client({
                instanceId
            });

            const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
                url// en la respuesta de este endpoint debe venir el token que se debe pasar en auth bearer
            });
            
            try {
                await beamsClient.start();
                const setUserResult = await beamsClient.setUserId(
                    userLocalId, //'12', 
                    beamsTokenProvider
                ); // An object that contains a method called fetchToken. This method must return a promise that resolves to a correctly signed Beams Token for the desired user ID (
                console.log('Beams client setUserId', setUserResult);
            } catch (error) {
                console.error(error);
            }
        }


        return {
            deviceId,
            startAuth
        }
    }
}
</script>
