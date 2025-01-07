<template>
    <div class="push-widget-authenticated-user">
        <p>Status: </p>
        <p>Device Id: {{ deviceId }} </p>
        <p>App User Id: </p>
        <button @click="startAuth">Authorize</button>
        <button onclick="getBeamsUser()">Get User</button>
        <button onclick="logOut()">Log Out</button>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default{
    setup(){
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
