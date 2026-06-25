<template>
    <nord-notification-group class="error-notifications">
        <nord-notification
            v-if="errorMessage"
            variant="danger"
            @dismiss="store.clearError()"
        >
            {{ errorMessage }}
        </nord-notification>
    </nord-notification-group>

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
                v-for="channel in allChannels"
                :key="channel.id"
                :channel="channel"
            />
        </nord-stack>

        <nord-stack
            direction="horizontal"
            justify-content="center"
            gap="m"
        >
            <nord-button
                v-if="!isLastPage"
                :loading="loading || undefined"
                @click="store.loadNextPage()"
            >
                Charger plus
            </nord-button>
            <nord-button
                square
                aria-label="Retour en haut de la liste"
                @click="scrollToTop()"
            >
                <nord-icon name="arrow-up"></nord-icon>
            </nord-button>
        </nord-stack>
    </nord-stack>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Channel from '@/vue/components/Channel.vue'
import { useChannels } from '@/vue/composables/useChannels'
import type { Channel as ChannelType } from '@/vue/types/channel'
import { ChannelsLoadErrorCode } from '@/vue/types/channel'

const ERROR_MESSAGES: Record<ChannelsLoadErrorCode, string> = {
    [ChannelsLoadErrorCode.RateLimited]: 'Trop de requêtes, merci de patienter avant de charger plus de chaînes.',
    [ChannelsLoadErrorCode.ChannelLoadError]: 'Impossible de charger les chaînes pour le moment.',
}

const props = defineProps<{
    channels: ChannelType[]
    total: number
    totalPages: number
    limit: number
    loadError: boolean
}>()

const {
    store,
    channels: allChannels,
    loading,
    isLastPage,
    error,
} = useChannels({
    channels: props.channels,
    total: props.total,
    totalPages: props.totalPages,
    limit: props.limit,
    loadError: props.loadError,
})

const errorMessage = computed(() => (error.value ? ERROR_MESSAGES[error.value] : null))

function scrollToTop(): void {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}
</script>

<style scoped>
.error-notifications {
    position: fixed;
    top: var(--n-space-l);
    right: var(--n-space-l);
    z-index: 1000;
}
</style>
