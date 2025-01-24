<template>
    <div class="push-widget-authenticated-user">
        
        <p>Status: {{ isLogged ? 'Enabled' : 'Disabled' }}  </p>
        <p>Device Id:: {{ deviceId }} </p>
        <p>App User Id:: {{ appUserId }}</p>

        <button @click="startAuth">Authorize</button>
        <button @click="getBeamsUser">Get User</button>
        <button @click="logOut">Log Out</button>

    </div>
</template>

<script lang="ts">
import {computed, onMounted} from 'vue'
import useBeamsClient from '@/composables/useBeamsClient';

export default{
    
    props: {
        appUserId: String,
        beamsInstanceId: String,
        authEndpoint: String // URL sirve pero no acepta vacio
    },

    setup(props) {
        // defineProps<{appUserId :string }>() // solo sive con <script setup>
        if (!props.authEndpoint || !props.appUserId || !props.beamsInstanceId) {
            throw new Error("authEndpoint, appUserId and beamsInstanceId are required");
        }

        const beams = useBeamsClient(
            props.beamsInstanceId,
            props.authEndpoint,
            props.appUserId
        );

        onMounted(()=>{
            beams.getBeamsUser()
        });

        //const isLogged = ref(false);
        const isLogged = computed(()=>{
            return beams.deviceId.value !== '' && beams.deviceId.value !== null
        });

        return {
            deviceId: beams.deviceId,
            isLogged,
            startAuth: beams.startAuth,
            getBeamsUser: beams.getBeamsUser,
            logOut: beams.logOut
        }
    }
}
</script>
