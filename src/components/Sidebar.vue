<template>
  <div class="hidden">
    <vs-sidebar absolute v-model="active" open>
      <template class="logo-dashboard">
        <img class="dashboard-logo" src="../assets/logo.png" alt=""/>
      </template>

      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item id="home" arrow class="text-header-dashboard">
            <template #icon>
              <i class="fas fa-folder-open"></i>
            </template>
            <h2>ຈັດການຂໍ້ມູນຫຼັກ</h2>
          </vs-sidebar-item>
        </template>
        <div @click="Tournament()">
          <vs-sidebar-item id="tournament" class="text-header-dashboard">
            <template #icon>
              <i class="fas fa-futbol"></i>
            </template>
            <h2>ຂໍ້ມູນທົວນາເມັ້ນ</h2>
          </vs-sidebar-item>
        </div>
        <div @click="Team()">
          <vs-sidebar-item id="teams" class="text-header-dashboard">
            <template #icon>
              <i class="fas fa-sitemap"></i>
            </template>
            <h2>ຂໍ້ມູນທີມ</h2>
          </vs-sidebar-item>
        </div>
      </vs-sidebar-group>

      <div @click="GroupStanding()">
        <vs-sidebar-item id="group" class="text-header-dashboard">
          <template #icon>
            <i class="fas fa-meteor"></i>
          </template>
          <h2>ຮອບຕັດເຊືອກ</h2>
        </vs-sidebar-item>
      </div>


      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item id="home2" arrow class="text-header-dashboard">
            <template #icon>
              <i class="fas fa-calendar"></i>
            </template>
            <h2>ຕາຕະລາງການແຂ່ງຂັນ</h2>
          </vs-sidebar-item>
        </template>
        <div @click="MatchTable()">
          <vs-sidebar-item id="match" class="text-header-dashboard">
            <template #icon>
              <i class="far fa-calendar-alt"></i>
            </template>
            <h2>ຕາຕະລາງຮອບເກັບຄະແນນ</h2>
          </vs-sidebar-item>
        </div>

        <div @click="MatchStandingTable()">
          <vs-sidebar-item id="match1" class="text-header-dashboard">
            <template #icon>
              <i class="fas fa-calendar-check"></i>
            </template>
            <h2>ຕາຕະລາງທີມຜ່ານເຂົ້າຮອບ</h2>
          </vs-sidebar-item>
        </div>
      </vs-sidebar-group>

      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item id="info" arrow class="text-header-dashboard">
            <template #icon>
              <i class="fas fa-edit"></i>
            </template>
            <h2>ສະຖິຕິການແຂ່ງຂັນ</h2>
          </vs-sidebar-item>
        </template>

        <div @click="PlayerStaticInfo()">
          <vs-sidebar-item id="demo" class="text-header-dashboard">
            <template #icon>
              <i class="fas fa-calendar-check"></i>
            </template>
            <h2>ຂໍ້ມູນສະຖິຕິການແຂ່ງຂັນ</h2>
          </vs-sidebar-item>
        </div>
      </vs-sidebar-group>
    </vs-sidebar>

  </div>
</template>

<script>
export default {
  data: () => ({
    active: '',
  }),
  methods: {
    Tournament() {
      this.$router.push({
        name: "Tournament"
      }).catch(() => {
      })
    },
    Team() {
      this.$router.push({
        name: "listteam"
      }).catch(() => {
      })
    },

    MatchTable() {
      this.$router.push({
        name: "Match"
      }).catch(() => {
      })
    },
    GroupStanding() {
      this.$router.push({
        name: "GroupStanding"
      }).catch(() => {
      })
    },
    MatchStandingTable(){
      this.$router.push({
        name:"MatchStanding"
      }).catch(() =>{

      })
    },
    PlayerStaticInfo(){
      this.$router.push({
        name:"PlayerStaticInfo"
      }).catch(() =>{

      })
    }

  },
};
</script>

<style lang="css" scoped>
.dashboard-logo {
  height: 120px;
  width: 120px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}

.text-header-dashboard {
  font-family: BoonBaan;
}

.text-header-dashboard h2 {
  font-size: 18px;
  padding-left: 10px;
}
</style>






