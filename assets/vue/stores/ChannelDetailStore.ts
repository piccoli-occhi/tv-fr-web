import { atom, computed } from 'nanostores'
import type { Program } from '@/vue/types/channel'

function isProgramPast(program: Program): boolean {
    return new Date(program.stopAt).getTime() < Date.now()
}

class ChannelDetailStore {
    private static instance: ChannelDetailStore | null = null

    public readonly dayPrograms = atom<Program[]>([])
    public readonly showPastPrograms = atom(false)

    public readonly pastProgramsCount = computed(this.dayPrograms, (dayPrograms) => dayPrograms.filter(isProgramPast).length)

    public readonly visiblePrograms = computed(
        [
            this.dayPrograms,
            this.showPastPrograms,
        ],
        (dayPrograms, showPastPrograms) => (showPastPrograms ? dayPrograms : dayPrograms.filter((program) => !isProgramPast(program))),
    )

    private constructor() {}

    public static getInstance(): ChannelDetailStore {
        if (!ChannelDetailStore.instance) {
            ChannelDetailStore.instance = new ChannelDetailStore()
        }

        return ChannelDetailStore.instance
    }

    public init(dayPrograms: Program[]): void {
        this.dayPrograms.set(dayPrograms)
        this.showPastPrograms.set(false)
    }

    public showAllPastPrograms(): void {
        this.showPastPrograms.set(true)
    }
}

export default ChannelDetailStore
