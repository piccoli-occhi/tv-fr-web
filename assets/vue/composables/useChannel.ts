import { computed } from 'vue'
import type { Channel } from '@/vue/types/channel'

export function useChannel(channel: Channel) {
    const voteCount = computed(() => channel.current?.details?.voteCount ?? 0)

    const popularity = computed(() => {
        const raw = channel.current?.details?.popularity ?? null

        return voteCount.value === 0 || raw === null ? null : Math.round(raw)
    })

    const poster = computed(() => {
        const { current } = channel

        return current?.icon || current?.details?.poster || current?.details?.secondaryPoster || null
    })

    function formatTime(iso: string): string {
        return new Date(iso).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    return {
        voteCount,
        popularity,
        poster,
        formatTime,
    }
}
