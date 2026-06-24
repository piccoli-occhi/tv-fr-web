import { atom, computed } from 'nanostores'
import type { Channel, ChannelListInitOptions, ChannelsMoreResponse } from '@/vue/types/channel'
import { ChannelsLoadErrorCode } from '@/vue/types/channel'

class ChannelListStore {
    private static instance: ChannelListStore | null = null

    public readonly channels = atom<Channel[]>([])
    public readonly page = atom(1)
    public readonly total = atom(0)
    public readonly totalPages = atom(1)
    public readonly limit = atom(0)
    public readonly loading = atom(false)
    public readonly error = atom<ChannelsLoadErrorCode | null>(null)

    public readonly isLastPage = computed(
        [
            this.page,
            this.totalPages,
        ],
        (page, totalPages) => page >= totalPages,
    )

    private constructor() {}

    public static getInstance(): ChannelListStore {
        if (!ChannelListStore.instance) {
            ChannelListStore.instance = new ChannelListStore()
        }

        return ChannelListStore.instance
    }

    public init(options: ChannelListInitOptions): void {
        this.channels.set(options.channels)
        this.total.set(options.total)
        this.totalPages.set(options.totalPages)
        this.limit.set(options.limit)
        this.page.set(1)
        this.error.set(options.loadError ? ChannelsLoadErrorCode.ChannelLoadError : null)
    }

    public clearError(): void {
        this.error.set(null)
    }

    public async loadNextPage(): Promise<void> {
        if (this.loading.get() || this.isLastPage.get()) {
            return
        }

        this.loading.set(true)
        this.error.set(null)

        const nextPage = this.page.get() + 1

        try {
            const response = await fetch(`/channels/more?page=${nextPage}`)

            if (response.status === 429) {
                this.error.set(ChannelsLoadErrorCode.RateLimited)

                return
            }

            if (!response.ok) {
                this.error.set(ChannelsLoadErrorCode.ChannelLoadError)

                return
            }

            const data: ChannelsMoreResponse = await response.json()

            this.channels.set([
                ...this.channels.get(),
                ...data.channels,
            ])
            this.page.set(nextPage)
            this.total.set(data.total)
            this.totalPages.set(data.totalPages)
            this.limit.set(data.limit)
        } catch {
            this.error.set(ChannelsLoadErrorCode.ChannelLoadError)
        } finally {
            this.loading.set(false)
        }
    }
}

export default ChannelListStore
