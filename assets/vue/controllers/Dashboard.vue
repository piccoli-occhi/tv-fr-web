<template>
    <nord-stack
        direction="vertical"
        gap="l"
    >
        <nord-stack
            direction="horizontal"
            gap="l"
            wrap
        >
            <Channel
                v-for="channel in props.channels"
                :key="channel.id"
                :channel="channel"
            />
        </nord-stack>
    </nord-stack>
</template>

<script setup lang="ts">
import Channel from '@/vue/components/Channel.vue'
import type { Channel as ChannelType } from '@/vue/types/channel'

const props = defineProps<{
    channels: ChannelType[]
}>()
</script>
