<template>
    <h1>Hello {{ props.name }}!</h1>
</template>

<script
    setup
    lang="ts"
>
const props = defineProps<{
    name: string
}>()
</script>
