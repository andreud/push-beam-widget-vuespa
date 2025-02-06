<template>
    <div class="beams-auth-user">
        <label>
          <span class="switch">
              <input type="checkbox" v-model="isLoggedRef" >
              <span class="slider round"></span>
          </span>
          <span>
              {{ isLoggedRef ? labels.enabled : labels.disabled }}
          </span>
        </label>

        <div class="debug" v-if="debug">
          <code>
            <p>Status Ref:{{ isLoggedRef }}</p>
            <p>Device Id:: {{ deviceId }} </p>
            <p>App User Id:: {{ appUserId }}</p>
          </code>
        </div>

    </div>
</template>

<script lang="ts">
import {ref, onBeforeMount, watch} from 'vue';
import useBeamsClient from '@/composables/useBeamsClient';

export default{
    
    props: {
      appUserId: {
        type: String,
        required: true,
      },
      beamsInstanceId: {
        type: String,
        required: true
      },
      authEndpoint: {
        type: String,
        required: true
      },
      debug: {
        type: Boolean,
        default: false
      },
      labels: {
        type: Object,
        default: ()=>({
          enabled: 'Enabled',
          disabled: 'Disabled'
        })
      }
    },

    setup(props) {
        
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

        watch(isLoggedRef, async (n)=>{
            console.log('watch() isLoggedRef', n);
            beams.getBeamsUser();
            if(n){
              try{
                await beams.startAuth();
              }
              catch(e){
                isLoggedRef.value = false; 
                console.error(e);
              }
            }else{
                await beams.logOut();
            }
            beams.getBeamsUser();
        });

        return {
            deviceId: beams.deviceId,
            isLoggedRef,
            startAuth: beams.startAuth,
            getBeamsUser: beams.getBeamsUser,
            logOut: beams.logOut
        }
    }
}
</script>

<style>
.beams-auth-user label {
  display: flex;
  align-items: center;
}

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
