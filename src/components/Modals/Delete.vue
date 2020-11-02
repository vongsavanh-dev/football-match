<template>
  <vs-dialog  prevent-close  v-model="active">
    <slot v-bind="{ close }" />
  </vs-dialog>
</template>
<script>
export default {
  computed: {
    active: {
      set(val) {
        this.$store.commit("modalDelete_State", val);
      },
      get() {
        return this.$store.state.modalDeleteState;
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
