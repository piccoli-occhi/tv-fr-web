<template>
    <nord-stack
        direction="vertical"
        gap="l"
    >
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
            <ProgramCard
                v-for="program in visiblePrograms"
                :key="program.id"
                :program="program"
                :current="program.id === props.currentProgram.id"
            />
        </nord-stack>
    </nord-stack>
</template>

<script setup lang="ts">
import ProgramCard from '@/vue/components/ProgramCard.vue'
import { useChannelDetail } from '@/vue/composables/useChannelDetail'
import type { Program } from '@/vue/types/channel'

const props = defineProps<{
    currentProgram: Program
    dayPrograms: Program[]
}>()

const { store, visiblePrograms, pastProgramsCount, showPastPrograms } = useChannelDetail(props.dayPrograms)
</script>
