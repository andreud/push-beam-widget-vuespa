<template>
    <div class="beams-widget-subscribe-interest">
        
        <label>
          <span class="switch">
              <input type="checkbox" v-model="isEnabled" >
              <span class="slider round"></span>
          </span>
          <span>
            <span>{{ beamsInterestId }}: </span>
            {{ isEnabled ? labels.enabled : labels.disabled }}
          </span>
        </label>


        <div v-if="debug">
            <code>
                Is subscribed: {{ isEnabled }} <br>
                Interest Id: {{ beamsInterestId }}
            </code>
        </div>
        
    </div>
</template>

<script lang="ts">
import {ref, watch} from 'vue';
import * as PusherPushNotifications from "@pusher/push-notifications-web";
//import {useBeamsClient} from '@/composables/useBeams';


export default {
    props: {
        beamsInstanceId: {
            type: String,
            required: true
        },
        beamsInterestId: {
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
                disabled: 'Disabled',
                interest: ''
            })
        }
    },

    setup(props) {
        const beamsClient = new PusherPushNotifications.Client({
            instanceId: props.beamsInstanceId
        });
        const isEnabled = ref(false);

        /*onBeforeMount(()=>{
           
        });*/

        watch(isEnabled, (newValue)=>{
            if(newValue){
                beamsClient
                    .start()
                    .then(()=>{
                        console.log('Beams client started');
                        beamsClient.addDeviceInterest(props.beamsInterestId);
                    })
                    .then(()=>{
                        console.log('Subscribed to interest');
                    })
                    .catch((error)=>{
                        isEnabled.value = false;
                        console.error('Error subscribing to interest', error);
                    });
            }else{
                beamsClient.removeDeviceInterest(props.beamsInterestId)
                    .then(()=>{
                        console.log('Unsubscribed from interest');
                    })
                    .catch((error)=>{
                        console.error('Error unsubscribing from interest', error);
                        isEnabled.value = true;
                    });
            }
        });

        

        return {
            isEnabled
        }
    }
}
</script>