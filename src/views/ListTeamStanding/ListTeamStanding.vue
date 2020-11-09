<template>
  <div class="container">
    <div class="box-title">
      <h4>
        ລາຍຊື່ທີມຜ່ານເຂົ້າຮອບ
      </h4>
      <div class="create-match" style="margin-left:auto;margin-right: auto;width: 50%;">
        <vs-button style="margin-left:auto;margin-right: auto;width: 20%;font-size: 20px;"  @click="CreateStandingMatch()">
          <i class="fas fa-play-circle"></i> ສ້າງເເມັດ
        </vs-button>
      </div>
      <span class="btn-add">
            <vs-button class="btn-icon" circle icon flat @click="OpenModalAdd()">
                <i class="fas fa-plus"></i>
            </vs-button>
        </span>
    </div>

    <div class="center">
      <vs-table>
        <template #thead>
          <vs-tr class="table-header">
            <vs-th id="table-index">
              ລຳດັບ
            </vs-th>
            <vs-th>
              ຮູບພາບ
            </vs-th>
            <vs-th>
              ຊື່ທີມ
            </vs-th>
            <vs-th>
              ສະຖານະ
            </vs-th>
            <vs-th id="table-header-button"> </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr v-for="(teamstanding ,index) in ListteamStanding" :key="index" >
            <vs-td>
            {{index + 1}}
            </vs-td>
            <vs-td>
              <img :src="teamstanding.logo_url" alt="" style="width:100px;height: 100px;">
            </vs-td>
            <vs-td>
              {{teamstanding.team_name}}
            </vs-td>
            <vs-td>
              {{teamstanding.status}}
            </vs-td>
            <vs-td style="text-align: right; width: 100px">
              <div class="buttons">
<!--                <vs-button circle icon flat @click="OpenModalEdit()">-->
<!--                  <i class="fas fa-pencil-alt"></i>-->
<!--                </vs-button>-->
<!--                <vs-button circle danger icon flat @click="OpenModalDelete()">-->
<!--                  <i class="fas fa-trash-alt"></i>-->
<!--                </vs-button>-->
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <ModalAdd>
      <template v-slot="{ close }">
        <AddTeam v-if="showTeamStanding" @close="close" :list_teams="teams" @success="FetchData()" />
        <CreateMatch v-if="showCreateMatch"  @close="close" :CreateMatch_Standing="ListteamStanding"  @success="FetchData()" />
      </template>
    </ModalAdd>
  </div>
</template>

<script>
import AddTeam from './CRUD/AddTeaminStanding'
import CreateMatch from './CRUD/CreateMatchStanding'
export default {
  components: {
    AddTeam,
    CreateMatch
  },
  data: () => ({
    page: 1,
    max: 5,
    teams:[],
    ListteamStanding:[],
    showCreateMatch:false,
    showTeamStanding:false,
  }),
  methods: {
    OpenModalAdd() {
      this.showTeamStanding = true
      this.showCreateMatch=false
      this.$store.commit("modalAdd_State", true);
    },

    CreateStandingMatch(){
      this.showTeamStanding = false
      this.showCreateMatch=true
      this.$store.commit('modalAdd_State',true)
    },

    FetchData() {
      this.$axios.get('team').then(res => {
        setTimeout(() => {
          this.$emit('close');
        }, 200);
        setTimeout(() => {
          this.teams = res.data.data;
        }, 100);
      }).catch(() => {

      });
    },

    getTeamStanding(){
      const tournament_id = this.$route.params.tournament_id;
      const id = this.$route.params.standing_id;
      this.$axios.get(`tournament/${tournament_id}/standing/${id}/all`).then(res =>{
        setTimeout(() => {
          this.$emit('close');
        }, 200);
        setTimeout(() => {
          this.ListteamStanding = res.data;
          // console.log(this.ListteamStanding)
        }, 100);
      }).catch(() => {

      });
    }
  },

  created() {
    this.FetchData();
    this.getTeamStanding();
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: auto;
}

.container .box-title {
  margin-top: 30px;
}

.box-title {
  font-family: BoonBaan;
  font-size: 18px;
}

.center {
  font-family: BoonBaan;
  text-align: left;

}

.btn-add .btn-icon {
  margin-bottom: 20px;
  font-size: 18px;
  float: right;
}

#table-index {
  width: 300px;
  text-align: center;
  margin-top: 50%;
}

#table-header-button {
  width: 150px;
}

</style>
