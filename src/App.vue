<script setup lang="ts">
import BeamsAuthUser from './components/BeamsAuthUser.vue'
//import BeamsSubscribeInterest from './components/BeamsSubscribeInterest.vue'

const instanceId = import.meta.env.VITE_API_BEAMS_INSTANCE_ID;
const authEndpoint = import.meta.env.VITE_API_URL;

</script>

<template>
  <header>
    <!-- img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" / -->
     <h1>Vue widgets for Pusher Beams</h1>
  </header>

  <main>

    <p>Let users enable personalized notifications</p>
    <BeamsAuthUser
      app-user-id="12" 
      :beams-instance-id="instanceId"
      :auth-endpoint="authEndpoint"
      :debug="true" />
    
    



  </main>

</template>

<style scoped>

</style>
