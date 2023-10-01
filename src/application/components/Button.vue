<template>
    <button class="button" :class="{ primary: type === 'primary', error: type === 'error' }"><slot></slot></button>
</template>
<script lang="ts">
export default {
    props: {
        type: String,
    },
};
</script>
