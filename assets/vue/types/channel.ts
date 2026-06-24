export type Program = {
    id: string
    title: string
    subTitle: string | null
    desc: string | null
    startAt: string
    stopAt: string
    icon: string | null
    rating: string | null
    categories: readonly string[]
    details: {
        popularity?: number
        voteCount?: number
        poster?: string
        secondaryPoster?: string
    } | null
}

export type Channel = {
    id: string
    displayName: string
    xmlId: string
    icon: string | null
    current: Program | null
}

export type ChannelDetail = {
    id: string
    displayName: string
    xmlId: string
    icon: string | null
    programs: Program[]
}

export type ChannelsPagination = {
    total: number
    totalPages: number
    limit: number
}

export type ChannelListInitOptions = ChannelsPagination & {
    channels: Channel[]
    loadError: boolean
}

export type ChannelsMoreResponse = ChannelsPagination & {
    channels: Channel[]
}

export enum ChannelsLoadErrorCode {
    RateLimited = 'rate_limited',
    ChannelLoadError = 'channel_load_error',
}
