import { useStore } from '@nanostores/vue'
import ChannelListStore from '@/vue/stores/ChannelListStore'
import type { ChannelListInitOptions } from '@/vue/types/channel'

export function useChannels(options: ChannelListInitOptions) {
    const store = ChannelListStore.getInstance()

    store.init(options)

    return {
        store,
        channels: useStore(store.channels),
        loading: useStore(store.loading),
        isLastPage: useStore(store.isLastPage),
        error: useStore(store.error),
    }
}
