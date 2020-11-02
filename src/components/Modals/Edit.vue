<template>
  <vs-dialog  prevent-close v-model="active">
    <slot v-bind="{ close }" />
  </vs-dialog>
</template>
<script>
export default {
  computed: {
    active: {
      set(val) {
        this.$store.commit("modalEdit_State", val);
      },
      get() {
        return this.$store.state.modalEditState;
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
