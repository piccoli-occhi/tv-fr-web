import { useStore } from '@nanostores/vue'
import ChannelDetailStore from '@/vue/stores/ChannelDetailStore'
import type { Program } from '@/vue/types/channel'

export function useChannelDetail(dayPrograms: Program[]) {
    const store = ChannelDetailStore.getInstance()

    store.init(dayPrograms)

    return {
        store,
        visiblePrograms: useStore(store.visiblePrograms),
        pastProgramsCount: useStore(store.pastProgramsCount),
        showPastPrograms: useStore(store.showPastPrograms),
    }
}
