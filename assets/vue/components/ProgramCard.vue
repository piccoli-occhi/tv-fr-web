<template>
    <nord-card
        padding="m"
        class="program-card"
        :class="{ 'program-card--current': props.current }"
    >
        <nord-stack
            direction="horizontal"
            gap="m"
            align-items="start"
        >
            <img
                :src="poster ?? '/images/no-poster.svg'"
                :alt="props.program.title"
                class="program-thumbnail"
            />
            <nord-stack
                direction="vertical"
                gap="xs"
            >
                <nord-stack
                    direction="horizontal"
                    align-items="center"
                    justify-content="space-between"
                    gap="s"
                >
                    <nord-stack
                        direction="horizontal"
                        align-items="center"
                        gap="s"
                    >
                        <strong>{{ props.program.title }}</strong>
                        -
                        <span
                            v-if="popularity !== null"
                            class="program-popularity"
                        >
                            <nord-icon name="interface-star-filled"></nord-icon>
                            {{ popularity }}
                        </span>
                    </nord-stack>
                    <nord-badge
                        v-if="props.current"
                        variant="success"
                    >
                        En cours
                    </nord-badge>
                </nord-stack>
                <span
                    v-if="props.program.subTitle"
                    class="program-subtitle"
                >{{ props.program.subTitle }}</span>
                <span class="program-time">{{ formatTime(props.program.startAt) }} – {{ formatTime(props.program.stopAt) }}</span>
                <span
                    v-if="props.program.desc"
                    class="program-desc"
                >{{ props.program.desc }}</span>
            </nord-stack>
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
import { useProgram } from '@/vue/composables/useProgram'
import type { Program } from '@/vue/types/channel'

const props = defineProps<{
    program: Program
    current: boolean
}>()

const { poster, popularity, tmdbUrl, formatTime } = useProgram(props.program)
</script>

<style scoped>
.program-card {
    width: 100%;
}

.program-card--current {
    outline: 2px solid var(--n-color-accent);
}

.program-thumbnail {
    width: 100px;
    min-width: 100px;
    border-radius: var(--n-border-radius-s);
    object-fit: cover;
    aspect-ratio: 2 / 3;
}

.program-time {
    font-size: var(--n-font-size-s);
    color: var(--n-color-text-weaker);
}

.program-subtitle {
    font-size: var(--n-font-size-s);
    color: var(--n-color-text-weak);
    font-style: italic;
}

.program-popularity {
    display: inline-flex;
    align-items: center;
    gap: var(--n-space-xs);
    font-size: var(--n-font-size-s);
}

.program-desc {
    font-size: var(--n-font-size-s);
    color: var(--n-color-text-weak);
}

.tmdb-button {
    --n-button-border-radius: var(--n-border-radius-pill);
    --n-button-background-color: var(--n-color-status-info-weak);
    --n-button-border-color: var(--n-color-border-info);
    --n-button-color: var(--n-color-text-info);
}
</style>
