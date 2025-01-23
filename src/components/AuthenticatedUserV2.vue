<template>
    <div class="push-widget-authenticated-user">
        
        <p>Status::  </p>
        <p>Device Id:: {{ deviceId }} </p>
        <p>App User Id:: {{ appUserId }}</p>

        <button @click="startAuth">Authorize</button>
        <button @click="getBeamsUser">Get User</button>
        <button @click="logOut">Log Out</button>

    </div>
</template>

<script lang="ts">
import useBeamsClient from '@/composables/useBeamsClient';

export default{
    
    props:{
        appUserId: String,
        beamsInstanceId: String ,
        authEndpoint: String // URL sirve pero no acepta vacio
    },

    setup(props) {

        // defineProps<{appUserId :string }>() // solo sive con <script setup>
        
        const beamsClient = useBeamsClient(
            props.beamsInstanceId,
            props.authEndpoint,
            props.appUserId
        );

        return {
            deviceId: beamsClient.deviceId,
            startAuth: beamsClient.startAuth,
            getBeamsUser: beamsClient.getBeamsUser,
            logOut: beamsClient.logOut
        }
    }
}
</script>
