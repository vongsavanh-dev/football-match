<template>
<vs-dialog v-model="active">
    <slot v-bind="{ close }" />
</vs-dialog>
</template>

<script>
export default {
    computed: {
        active: {
            set(val) {
                this.$store.commit('modalNotification_State', val);
            },
            get() {
                return this.$store.state.modalNotificationState;
            }
        }
    },
    methods: {
        close() {
            this.active = false;
        },
    }
}
</script>
