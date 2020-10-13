<template>
  <div class="hidden">
    <vs-sidebar absolute v-model="active" open>
      <template class="logo-dashboard">
        <img class="dashboard-logo" src="../assets/logo.png" alt="" />
      </template>

      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow class="text-header-dashboard">
            <template #icon>
              <i class="fas fa-folder-open"></i>
            </template>
            <h2>ຈັດການຂໍ້ມູນຫຼັກ</h2>
          </vs-sidebar-item>
        </template>

        <div @click="Team()">
          <vs-sidebar-item id="Instagram" class="text-header-dashboard">
            <template #icon>
              <i class="fas fa-sitemap"></i>
            </template>
            <h2>ຂໍ້ມູນທີມ</h2>
          </vs-sidebar-item>
        </div>
        <div @click="Player()">
          <vs-sidebar-item id="twitter" class="text-header-dashboard">
            <template #icon>
              <i class="fas fa-futbol"></i>
            </template>
            <h2>ຂໍ້ມູນນັກເຕະ</h2>
          </vs-sidebar-item>
        </div>
        <vs-sidebar-item id="Facebook" class="text-header-dashboard">
          <template #icon>
            <i class="fas fa-crosshairs"></i>
          </template>
          <h2>ຂໍ້ມູນຕຳແໜ່ງ</h2>
        </vs-sidebar-item>
      </vs-sidebar-group>

      <vs-sidebar-item id="chat" class="text-header-dashboard">
        <template #icon>
          <i class="fas fa-edit"></i>
        </template>
        <h2>ຕາຕະລາງ</h2>
      </vs-sidebar-item>
    </vs-sidebar>
  </div>
</template>
<script>
export default {
  data: () => ({
    active: "home",
  }),
  methods: {
    Team() {
      this.$router.push({ name: "listteam" });
      console.log("name");
    },
    Player() {
      this.$router.push({ name: "Listplayer" });
      console.log("name");
    },
  },
};
</script>

<style lang="css" scoped>
.dashboard-logo {
  height: 100px;
  width: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
}
.text-header-dashboard {
  font-family: BoonBaan;
}
.text-header-dashboard h2 {
  font-size: 18px;
  padding-left: 10px;
}
</style>
