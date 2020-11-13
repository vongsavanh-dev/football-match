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
        this.$store.commit("modalSuccess_State", val);
      },
      get() {
        return this.$store.state.modalSuccessState;
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
