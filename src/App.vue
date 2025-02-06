<script setup lang="ts">
import { ref } from 'vue'
import "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Choose your preferred theme
import CodeBlock from './components/CodeBlock.vue';

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
     <h1 class="text-3xl">Vue widgets for Pusher Beams</h1>
  </header>

  <main class="p-6 flex">

    <article class="mx-7 p-7 shadow-lg rounded-lg w-1/2">
      <h2 class="text-xl font-semibold mb-2">👤For specific user</h2>
      <p class="text-lg mb-6 ">Let users enable personalized notifications</p>
      
      <div class="widget-demo border-1 border-gray-600 my-4 p-4 rounded-lg shadow-sm">
        <BeamsAuthUser
          app-user-id="12" 
          :beams-instance-id="instanceId"
          :auth-endpoint="authEndpoint"
          :debug="debugBeamsAuthUser" />
      </div>

      <label for="debugBeamsAuthUser" class="">
        <input type="checkbox" v-model="debugBeamsAuthUser" id="debugBeamsAuthUser" />
        Show Debug Info
      </label>

      <p class="text-lg pt-2">Code</p>

      <CodeBlock>
  &lt;BeamsAuthUser
    beams-instance-id="Beams instance ID"
    app-user-id="The user ID in your app" 
    auth-endpoint="URL that must return a Beams token"
    /&gt;
      </CodeBlock>
      
    </article>

    <article class="mx-7 p-7 shadow-lg rounded-lg w-1/2">
      <h2 class="text-xl font-semibold mb-2 ">👥 For interest groups</h2>
      <p class="mb-6 text-lg">Let users subscribe to interests batch notifications</p>
      
      <div class="widget-demo border-1 border-gray-600 p-4 rounded-lg">
        <BeamsSubscribeInterest
          :beams-instance-id="instanceId"
          beams-interest-id="debug-tacos"
          :debug="debugBeamsSubscribeInterest"
          class="m-2" />
        <BeamsSubscribeInterest
          :beams-instance-id="instanceId"
          beams-interest-id="debug-hamburgers"
          :debug="debugBeamsSubscribeInterest"
          class="m-2" />
        <BeamsSubscribeInterest
          :beams-instance-id="instanceId"
          beams-interest-id="debug-salads"
          :debug="debugBeamsSubscribeInterest"
          class="m-2" />
        </div>

        <label for="debugBeamsSubscribeInterest" class="mt-4">
          <input type="checkbox" v-model="debugBeamsSubscribeInterest" id="debugBeamsSubscribeInterest" />
          Show Debug Info
        </label>

        <CodeBlock>
    &lt;BeamsSubscribeInterest
      beams-instance-id="Beams instance ID"
      beams-interest-id="The ID of the interest to subscribe"
    /&gt;

    &lt;BeamsSubscribeInterest
      beams-instance-id="Beams instance ID"
      beams-interest-id="The ID of the interest to subscribe"
    /&gt;
        </CodeBlock>
      
    </article>
    
  </main>

</template>

<style scoped>

</style>
