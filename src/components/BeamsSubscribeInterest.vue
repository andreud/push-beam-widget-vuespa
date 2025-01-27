<template>
    <div class="beams-widget-subscribe-interest">
        
        <label class="switch">
            <input type="checkbox" v-model="isSubscribed" >
            <span class="slider round"></span>
        </label>

        <div v-if="debug">
            <code>
                Is subscribed: {{ isSubscribed }} <br>
                Interest Id: {{ beamsInterestId }}
            </code>
        </div>
        
    </div>
</template>

<script lang="ts">
import {ref} from 'vue';

export default {
    props: {
        beamsInterestId: String,
        debug: Boolean
    },

    setup() {
        const isSubscribed = ref(false);

        return {
            isSubscribed
        }
    }
}
</script>