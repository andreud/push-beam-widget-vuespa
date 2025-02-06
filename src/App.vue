<script setup lang="ts">
import { ref } from 'vue'
import BeamsAuthUser from './components/BeamsAuthUser.vue'
import BeamsSubscribeInterest from './components/BeamsSubscribeInterest.vue'

const instanceId = import.meta.env.VITE_API_BEAMS_INSTANCE_ID;
const authEndpoint = import.meta.env.VITE_API_URL;

const debugBeamsAuthUser = ref(false);
const debugBeamsSubscribeInterest = ref(false);

</script>

<template>
  <header class="p-6">
    <!-- img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" / -->
     <h1 class="text-4xl">Vue widgets for Pusher Beams</h1>
  </header>

  <main class="p-6 flex">

    <article class="mx-4 p-6 shadow-lg rounded-lg">
      <h2 class="text-xl font-semibold mb-2">For specific user</h2>
      <p class="text-md mb-6">Let users enable personalized notifications</p>
      
      <BeamsAuthUser
        app-user-id="12" 
        :beams-instance-id="instanceId"
        :auth-endpoint="authEndpoint"
        :debug="debugBeamsAuthUser" />
        
        <label for="debugBeamsAuthUser" class="mt-4">
          <input type="checkbox" v-model="debugBeamsAuthUser" id="debugBeamsAuthUser" />
          Show Debug Info
        </label>
      
    </article>

    <article class="mx-4 p-6 shadow-lg rounded-lg">
      <h2 class="text-xl font-semibold mb-2 ">For interest groups</h2>
      <p class="mb-6 text-lg">Let users subscribe to interests batch notifications</p>
      
      <BeamsSubscribeInterest
        :beams-instance-id="instanceId"
        beams-interest-id="debug-tacos"
        :debug="debugBeamsSubscribeInterest" />
      <BeamsSubscribeInterest
        :beams-instance-id="instanceId"
        beams-interest-id="debug-hamburgers"
        :debug="debugBeamsSubscribeInterest" />
      <BeamsSubscribeInterest
        :beams-instance-id="instanceId"
        beams-interest-id="debug-salads"
        :debug="debugBeamsSubscribeInterest" />

        <label for="debugBeamsSubscribeInterest" class="mt-4">
          <input type="checkbox" v-model="debugBeamsSubscribeInterest" id="debugBeamsSubscribeInterest" />
          Show Debug Info
        </label>
    </article>
    
  </main>

</template>

<style scoped>

</style>
