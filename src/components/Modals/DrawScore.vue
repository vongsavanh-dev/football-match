<template>
  <vs-dialog   prevent-close v-model="active" @close="close">
    <slot v-bind="{ close }" />
  </vs-dialog>
</template>

<script>
export default {
  computed: {
    active: {
      set(val) {
        this.$store.commit("modalDrawScore_State", val);
      },
      get() {
        return this.$store.state.modalDrawScoreState;
      },
    },
  },
  methods: {
    close() {
      this.active = false;
      this.$emit('close');
    },
  },
};
</script>
