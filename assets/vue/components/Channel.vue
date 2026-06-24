<template>
    <nord-card
        padding="m"
        class="channel-card"
    >
        <nord-stack
            slot="header"
            direction="horizontal"
            align-items="center"
            gap="s"
        >
            <nord-avatar
                :src="props.channel.icon ?? undefined"
                :name="props.channel.displayName"
                variant="square"
            ></nord-avatar>
            <a
                :href="`/channel/${encodeURIComponent(props.channel.xmlId)}`"
                class="channel-name"
            >{{ props.channel.displayName }}</a>
        </nord-stack>

        <nord-stack
            direction="vertical"
            gap="s"
        >
            <img
                :src="imageLoadFailed ? '/images/no-poster.svg' : poster ?? '/images/no-poster.svg'"
                :alt="props.channel.current?.title ?? props.channel.displayName"
                class="program-image"
                @error="handleImageError()"
            />
            <strong>{{ props.channel.current?.title ?? 'Aucun programme en cours' }}</strong>
            <span
                v-if="props.channel.current"
                class="program-time"
            >{{ formatTime(props.channel.current.startAt) }} – {{ formatTime(props.channel.current.stopAt) }}</span>
            <span
                v-if="popularity !== null"
                class="program-popularity"
            >
                <nord-icon name="interface-star-filled"></nord-icon>
                {{ popularity }}
            </span>
        </nord-stack>
    </nord-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useChannel } from '@/vue/composables/useChannel'
import type { Channel } from '@/vue/types/channel'

const props = defineProps<{
    channel: Channel
}>()

const { poster, popularity, formatTime } = useChannel(props.channel)

const imageLoadFailed = ref(false)

function handleImageError(): void {
    imageLoadFailed.value = true
}
</script>

<style scoped>
.channel-card {
    flex: 0 0 calc(25% - var(--n-space-l) * 0.75);
}

.channel-name {
    color: inherit;
    text-decoration: none;
}

.channel-name:hover {
    text-decoration: underline;
}

.program-image {
    width: 100%;
    border-radius: var(--n-border-radius-s);
    object-fit: cover;
    max-height: 120px;
}

.program-time {
    font-size: var(--n-font-size-s);
    color: var(--n-color-text-weaker);
}

.program-popularity {
    display: inline-flex;
    align-items: center;
    gap: var(--n-space-xs);
    font-size: var(--n-font-size-s);
}
</style>
