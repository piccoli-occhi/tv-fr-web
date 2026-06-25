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
                :href="channelHref"
                class="channel-name"
            >{{ props.channel.displayName }}</a>
        </nord-stack>

        <nord-stack
            direction="vertical"
            gap="s"
        >
            <a :href="channelHref">
                <img
                    :src="imageLoadFailed ? '/images/no-poster.svg' : poster ?? '/images/no-poster.svg'"
                    :alt="props.channel.current?.title ?? props.channel.displayName"
                    class="program-image"
                    @error="handleImageError()"
                />
            </a>
            <nord-stack
                direction="horizontal"
                align-items="center"
                justify-content="space-between"
                gap="s"
            >
                <a
                    :href="channelHref"
                    class="program-title"
                >{{ props.channel.current?.title ?? 'Aucun programme en cours' }}</a>
                <span
                    v-if="popularity !== null"
                    class="program-popularity"
                >
                    <nord-icon name="interface-star-filled"></nord-icon>
                    {{ popularity }}
                </span>
            </nord-stack>
            <span
                v-if="props.channel.current"
                class="program-time"
            >{{ formatTime(props.channel.current.startAt) }} – {{ formatTime(props.channel.current.stopAt) }}</span>
        </nord-stack>

        <nord-stack
            v-if="tmdbUrl"
            slot="footer"
            direction="horizontal"
            justify-content="end"
        >
            <nord-button
                variant="plain"
                size="s"
                class="tmdb-button"
                :href="tmdbUrl"
                target="_blank"
                rel="noopener"
            >
                fiche tmdb
            </nord-button>
        </nord-stack>
    </nord-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useProgram } from '@/vue/composables/useProgram'
import type { Channel } from '@/vue/types/channel'

const props = defineProps<{
    channel: Channel
}>()

const { poster, popularity, tmdbUrl, formatTime } = useProgram(props.channel.current)

const channelHref = computed(() => `/channel/${encodeURIComponent(props.channel.xmlId)}`)

const imageLoadFailed = ref(false)

function handleImageError(): void {
    imageLoadFailed.value = true
}
</script>

<style scoped>
.channel-card {
    flex: 1 1 260px;
    max-width: 340px;
}

.channel-name {
    color: inherit;
    text-decoration: none;
}

.channel-name:hover {
    text-decoration: underline;
}

.program-title {
    color: inherit;
    text-decoration: none;
    font-weight: var(--n-font-weight-strong);
}

.program-title:hover {
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

.tmdb-button {
    --n-button-border-radius: var(--n-border-radius-pill);
    --n-button-background-color: var(--n-color-status-info-weak);
    --n-button-border-color: var(--n-color-border-info);
    --n-button-color: var(--n-color-text-info);
}
</style>
