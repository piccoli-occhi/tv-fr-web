import { computed } from 'vue'
import type { Program } from '@/vue/types/channel'

export function useProgram(program: Program | null) {
    const voteCount = computed(() => program?.details?.voteCount ?? 0)

    const popularity = computed(() => {
        const raw = program?.details?.popularity ?? null

        return voteCount.value === 0 || raw === null ? null : Math.round(raw)
    })

    const poster = computed(() => program?.icon || program?.details?.poster || program?.details?.secondaryPoster || null)

    const tmdbUrl = computed(() => program?.details?.tmdbUrl ?? null)

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
        tmdbUrl,
        formatTime,
    }
}
