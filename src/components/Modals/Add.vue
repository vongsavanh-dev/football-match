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
        this.$store.commit("modalAdd_State", val);
      },
      get() {
        return this.$store.state.modalAddState;
      },
    },
  },
  methods: {
    close() {
      this.active = false;
    },
  },
};
</script>
