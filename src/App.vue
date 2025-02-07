<script setup lang="ts">
import { ref } from 'vue'
//import Prism from "prismjs";
//import "prismjs/themes/prism-tomorrow.css"; // Dark mode theme

import CodeBlock from './components/CodeBlock.vue';
import BeamsAuthUser from './components/BeamsAuthUser.vue'
import BeamsSubscribeInterest from './components/BeamsSubscribeInterest.vue'

const instanceId = import.meta.env.VITE_API_BEAMS_INSTANCE_ID;
const authEndpoint = import.meta.env.VITE_API_URL;

const debugBeamsAuthUser = ref(false);
const debugBeamsSubscribeInterest = ref(false);

</script>

<template>
  <header class="p-6 text-center shadow-lg">
    <!-- img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" / -->
     <h1 class="text-3xl">Vue widgets for Pusher Beams</h1>
     <p class="text-lg">🛎️ Switch components to enable Pusher Beams notifications in your Vue app</p> 
  </header>

  <main class="p-6 flex bg-green-100">

    <article class="mx-5 p-7 shadow-lg rounded-lg w-1/2 bg-white">
      <h2 class="text-xl font-semibold mb-2">👤For specific user</h2>
      <p class="text-lg mb-3 ">
        Let users enable personalized notifications with the 
        <code class="bg-green-200 text-green-900 p-1">&lt;BeamsAuthUser&gt;</code> component
      </p>
      
      <p class="text-lg">Demo</p>

      <div class="widget-demo border-1 border-gray-600 my-3 p-4 rounded-sm shadow-sm">
        <p class="italic">Send me notifications about my account or activity</p>
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

      <p class="text-lg pt-2">Options</p>
      <table class="table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">Prop</th>
            <th class="px-4 py-2">Type</th>
            <th class="px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border px-4 py-2">beams-instance-id</td>
            <td class="border px-4 py-2">String</td>
            <td class="border px-4 py-2">The Pusher Beams instance ID</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">app-user-id</td>
            <td class="border px-4 py-2">String</td>
            <td class="border px-4 py-2">The user ID in your app</td>
          </tr>
          <tr>
            <td class="border px-4 py-2">auth-endpoint</td>
            <td class="border px-4 py-2">String</td>
            <td class="border px-4 py-2">
              URL in your backend that must return a Beams token.
              <a 
                href="https://pusher.com/docs/beams/guides/publish-to-specific-user/web/#creating-a-beams-auth-endpoint"
                class="text-purple-500">
                See how to implement this endpoint
              </a>
              <br>

            </td>
          </tr>
          <tr>
            <td class="border px-4 py-2">debug</td>
            <td class="border px-4 py-2">Boolean</td>
            <td class="border px-4 py-2">Show debug info</td>
          </tr>
        </tbody>
      </table>
      
    </article>

    <article class="mx-5 p-7 shadow-lg rounded-lg w-1/2 bg-white">
      <h2 class="text-xl font-semibold mb-2 ">👥 For interest groups</h2>
      <p class="text-lg mb-3 ">
        Let users subscribe to interests batch notifications with the 
        <code class="bg-green-200 text-green-900 p-1">&lt;BeamsSubscribeInterest&gt;</code> component
      </p>
      
      <p class="text-lg">Demo</p>

      <div class="widget-demo border-1 border-gray-600 my-3 p-4 rounded-sm shadow-sm">
        <p class="italic">Send me notifications about:</p>
        <p class="my-3">
          <BeamsSubscribeInterest
              :beams-instance-id="instanceId"
              beams-interest-id="debug-tacos"
              :debug="debugBeamsSubscribeInterest"
            />
        </p>
        <p class="my-3">
            <BeamsSubscribeInterest
              :beams-instance-id="instanceId"
              beams-interest-id="debug-hamburgers"
              :debug="debugBeamsSubscribeInterest"
            />
        </p>
        <p class="my-3">
            <BeamsSubscribeInterest
              :beams-instance-id="instanceId"
              beams-interest-id="debug-salads"
              :debug="debugBeamsSubscribeInterest"
            />
        </p>
      </div>

      <label for="debugBeamsSubscribeInterest" class="mt-4">
        <input type="checkbox" v-model="debugBeamsSubscribeInterest" id="debugBeamsSubscribeInterest" />
        Show Debug Info
      </label>

      <p class="text-lg pt-2">Code</p>

      <CodeBlock>
    &lt;BeamsSubscribeInterest
      beams-instance-id="Beams instance ID"
      beams-interest-id="debug-tacos"
    /&gt;

    &lt;BeamsSubscribeInterest
      beams-instance-id="Beams instance ID"
      beams-interest-id="debug-hamburgers"
    /&gt;

    &lt;BeamsSubscribeInterest
      beams-instance-id="Beams instance ID"
      beams-interest-id="debug-salads"
    /&gt;</CodeBlock>

        <p class="text-lg pt-2">Options</p>
        <table class="table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2">Prop</th>
              <th class="px-4 py-2">Type</th>
              <th class="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border px-4 py-2">beams-instance-id</td>
              <td class="border px-4 py-2">String</td>
              <td class="border px-4 py-2">The Pusher Beams instance ID</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">beams-interest-id</td>
              <td class="border px-4 py-2">String</td>
              <td class="border px-4 py-2">The ID of the interest to subscribe</td>
            </tr>
            <tr>
              <td class="border px-4 py-2">debug</td>
              <td class="border px-4 py-2">Boolean</td>
              <td class="border px-4 py-2">Show debug info</td>
            </tr>
          </tbody>
        </table>
      
    </article>
    
  </main>

</template>

<style scoped>

</style>
