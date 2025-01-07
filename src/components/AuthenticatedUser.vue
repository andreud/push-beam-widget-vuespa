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

export default{
    
    props:{
        appUserId: String
    },

    setup(){

        // defineProps<{appUserId :string }>() // solo sive con <script setup>

        const deviceId = ref('x');

        function startAuth() :void {
            deviceId.value = 'y';
            console.log('starAuth');
            //alert('starauth');
        }

        return {
            deviceId,
            startAuth
        }
    }
}
</script>
