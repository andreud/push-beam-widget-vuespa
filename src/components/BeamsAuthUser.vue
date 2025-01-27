<template>
    <div class="beams-widget-auth-user">

        <label class="switch">
            <input type="checkbox" v-model="isLoggedRef" >
            <span class="slider round"></span>
        </label>

        <div v-if="debug">
            <p>Status Ref:{{ isLoggedRef }}</p>
            <p>Status Comp: {{ isLogged ? 'Enabled' : 'Disabled' }}  </p>
            <p>Device Id:: {{ deviceId }} </p>
            <p>App User Id:: {{ appUserId }}</p>
            <button @click="startAuth">Authorize</button>
            <button @click="getBeamsUser">Get User</button>
            <button @click="logOut">Log Out</button>
        </div>

    </div>
</template>

<script lang="ts">
import {ref, computed, onBeforeMount, watch} from 'vue'
import useBeamsClient from '@/composables/useBeamsClient';

export default{
    
    props: {
        appUserId: String,
        beamsInstanceId: String,
        authEndpoint: String, // URL sirve pero no acepta vacio
        debug: Boolean
    },

    setup(props) {
        // defineProps<{appUserId :string }>() // solo sive con <script setup>
        if (!props.authEndpoint || !props.appUserId || !props.beamsInstanceId) {
            throw new Error("authEndpoint, appUserId and beamsInstanceId are required");
        }

        const isLoggedRef = ref(false);

        const beams = useBeamsClient(
            props.beamsInstanceId,
            props.authEndpoint,
            props.appUserId
        );

        onBeforeMount(async ()=>{
            await beams.getBeamsUser();
            if(beams.deviceId.value !== '' && beams.deviceId.value !== null){
                isLoggedRef.value = true;
            }
        });

        watch(isLoggedRef, async (n,o)=>{
            console.log('isLoggedRef', n);
            beams.getBeamsUser();
            if(n){
                await beams.startAuth();
            }else{
                await beams.logOut();
            }
            beams.getBeamsUser();
        });

        //const isLogged = ref(false);
        const isLogged = computed(()=>{
            return beams.deviceId.value !== '' && beams.deviceId.value !== null
        });

        return {
            deviceId: beams.deviceId,
            isLogged,
            isLoggedRef,
            startAuth: beams.startAuth,
            getBeamsUser: beams.getBeamsUser,
            logOut: beams.logOut
        }
    }
}
</script>

<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
