<template>
  <div class="center examplex">
    <vs-navbar center-collapsed v-model="active" class="navbar">
      <template #right>
        <vs-button @click="LogoutUsers()" class="logout-text"
          >ອອກຈາກລະບົບ</vs-button
        >
      </template>
    </vs-navbar>
  </div>
</template>
<script>
export default {
  data: () => ({
    active: "guide",
  }),
};
</script>
<style scoped>
.logout-text {
  font-family: BoonBaan;
  font-size: 14px;
}
</style>
