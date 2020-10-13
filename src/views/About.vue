<template>
  <div>
    <vs-button class="btn" :active="active == 0" @click="active = 0">
      Active
    </vs-button>
    <vs-button :active="active == 1" @click="active = 1">
      Default
    </vs-button>
    <vs-button disabled>Disabled</vs-button>

    <div>
      <button class="button is-primary">click</button>
      <i class="fas fa-futbol"></i>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    active: 0,
  }),
};
</script>
<style lang="css"></style>
