<template>
    <nord-stack
        direction="vertical"
        gap="l"
    >
        <nord-stack
            direction="horizontal"
            align-items="center"
            gap="m"
        >
            <nord-avatar
                :src="props.channel.icon ?? undefined"
                :name="props.channel.displayName"
                variant="square"
                size="l"
            ></nord-avatar>
            <h2 class="n-typescale-m">{{ props.channel.displayName }}</h2>
        </nord-stack>

        <nord-stack
            v-if="pastProgramsCount > 0 && !showPastPrograms"
            direction="horizontal"
            justify-content="center"
        >
            <nord-button @click="store.showAllPastPrograms()">
                Afficher les {{ pastProgramsCount }} programme(s) terminé(s)
            </nord-button>
        </nord-stack>

        <nord-stack
            direction="vertical"
            gap="m"
        >
            <nord-card
                v-for="program in visiblePrograms"
                :key="program.id"
                padding="m"
                class="program-card"
                :class="{ 'program-card--current': program.id === props.currentProgram.id }"
            >
                <nord-stack
                    direction="horizontal"
                    gap="m"
                    align-items="start"
                >
                    <img
                        :src="programPoster(program) ?? '/images/no-poster.svg'"
                        :alt="program.title"
                        class="program-thumbnail"
                    />
                    <nord-stack
                        direction="vertical"
                        gap="xs"
                    >
                        <nord-stack
                            direction="horizontal"
                            align-items="center"
                            gap="s"
                        >
                            <strong>{{ program.title }}</strong>
                            <nord-badge
                                v-if="program.id === props.currentProgram.id"
                                variant="success"
                            >
                                En cours
                            </nord-badge>
                        </nord-stack>
                        <span
                            v-if="program.subTitle"
                            class="program-subtitle"
                        >{{ program.subTitle }}</span>
                        <span class="program-time">{{ formatTime(program.startAt) }} – {{ formatTime(program.stopAt) }}</span>
                        <span
                            v-if="program.desc"
                            class="program-desc"
                        >{{ program.desc }}</span>
                    </nord-stack>
                </nord-stack>
            </nord-card>
        </nord-stack>
    </nord-stack>
</template>

<script setup lang="ts">
import { useChannelDetail } from '@/vue/composables/useChannelDetail'
import type { ChannelDetail, Program } from '@/vue/types/channel'

const props = defineProps<{
    channel: ChannelDetail
    currentProgram: Program
    dayPrograms: Program[]
}>()

const { store, visiblePrograms, pastProgramsCount, showPastPrograms } = useChannelDetail(props.dayPrograms)

function programPoster(program: Program): string | null {
    return program.icon || program.details?.poster || program.details?.secondaryPoster || null
}

function formatTime(iso: string): string {
    return new Date(iso).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
    })
}
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

.program-desc {
    font-size: var(--n-font-size-s);
    color: var(--n-color-text-weak);
}
</style>
