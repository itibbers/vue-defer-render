<template>
    <div>child-component</div>
</template>

<script>
    /* eslint-disable */
    export default {
        name: 'child',
        created() {
            console.log('child created')
        },
        mounted() {
            console.log('child mounted')
        }
    }
</script>
