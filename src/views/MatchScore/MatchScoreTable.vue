<template>
  <div class="container">
    <div class="box-title">
      <h4>
        ບັນທຶກຄະແນນ
      </h4>
    </div>
    <div class="columns">
      <div class="column is-6">
        <span class="btn-add">
            <vs-button class="btn-icon" circle icon flat @click="OpenModalAdd('first_score')">
                <i class="fas fa-plus"></i>
            </vs-button>
              <vs-button class="btn-icon" circle icon flat @click="OpenModalAdd('first_card')">
                <i class="fas fa-id-card-alt"></i>
            </vs-button>
        </span>
        <vs-table>
          <template #thead>
            <vs-tr class="table-header">
              <vs-th id="table-index">
                ລຳດັບ
              </vs-th>
              <vs-th style="white-space: nowrap;text-align:left;">
                ນັກເຕະທີ່ຍິງ
              </vs-th>
              <vs-th style="white-space: nowrap;text-align:left;">
                Assist
              </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="index " v-for="(player, index) in $vs.getPage(player_firstteam, page, max)" :data="player">
              <vs-td>
                {{ index + 1 }}
              </vs-td>
              <vs-td style="  white-space: nowrap;text-align:left;">
                {{ player.player_name }}
              </vs-td>
              <vs-td style="  white-space: nowrap;text-align:left;">
                {{ player.assist_player_name }}
              </vs-td>
            </vs-tr>
          </template>
          <template #footer></template>
        </vs-table>
<!--        <ModalAdd @close="handleModalAddCardClosed">-->
<!--          <template v-slot="{ close }">-->
<!--            <AddCardFirstTeam  v-if="!showModalCardfirstTeam" @close="close"-->
<!--                              @success="FetchData()"/>-->
<!--            <AddCardScondTeam  v-else @close="close"-->
<!--                               @success="FetchData()"/>-->
<!--          </template>-->
<!--        </ModalAdd>-->
      </div>


      <!--Table team 2-->
      <div class="column is-6">
           <span class="btn-add">
                  <vs-button class="btn-right" circle icon flat @click="OpenModalAdd('second_card')">
                  <i class="fas fa-id-card-alt"></i>
            </vs-button>
            <vs-button class="btn-right" circle icon flat @click="OpenModalAdd('second_score')">
                <i class="fas fa-plus"></i>
            </vs-button>

        </span>
        <vs-table>
          <template #thead>
            <vs-tr class="table-header">
              <vs-th id="table-index">
                ລຳດັບ
              </vs-th>
              <vs-th>
                ນັກເຕະທີ່ຍິງ
              </vs-th>
              <vs-th>
                Assist
              </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="index " v-for="(player, index) in $vs.getPage(player_scondteam, page, max)" :data="player">

              <vs-td>
                {{ index + 1 }}
              </vs-td>
              <vs-td style="white-space: nowrap;text-align:left;">
                {{ player.player_name }}
              </vs-td>
              <vs-td style="white-space: nowrap;text-align:left;">
                {{ player.assist_player_name }}
              </vs-td>
            </vs-tr>
          </template>
          <template #footer>
            <vs-pagination v-model="page" :length="$vs.getLength(player_scondteam, max)"/>
          </template>
        </vs-table>
        <ModalAdd>
          <template v-slot="{ close }">
            <AddScorefirstTeam v-if="showModalfirstScores" @close="close"
                               :listplayer_firstTeam="listplayers_team"
                               @success="FetchData()"/>
            <AddCardFirstTeam  v-if="showModalCardfirstTeam" :Card_firstTeam="listplayers_team"  @close="close"  @success="FetchData()"/>
            <AddScoreSecondTeam  @close="close" :listplayer_scondTeam="listplayers_team"
                                @success="FetchData()" v-if="showModalSecondScore"/>

            <AddCardScondTeam  v-if="showModalCardSecondtTeam"  @close="close" @success="FetchData()"/>
          </template>
        </ModalAdd>
      </div>
    </div>


  </div>
</template>

<script>
import AddScorefirstTeam from './CRUD/AddScore'
import AddScoreSecondTeam from './CRUD/AddScoreteamScond'
import AddCardFirstTeam from './CRUD/AddCardFirstTeam'
import AddCardScondTeam from './CRUD/AddCardScondTeam'

export default {
  components: {
    AddScorefirstTeam,
    AddScoreSecondTeam,
    AddCardFirstTeam,
    AddCardScondTeam,
  },
  data() {
    return {

      active: 1,
      page: 1,
      max: 5,
      showModalSecondScore: false,
      showModalCardfirstTeam: false,
      showModalCardSecondtTeam: false,
      showModalfirstScores: false,
      listplayers_team: [],
      player_firstteam: [],
      player_scondteam: [],
      listplayers_match: [],
    }
  },
  methods: {

// get match all
    FetchData() {
      this.$axios
          .get("match/" + this.$route.params.match_id)
          .then((res) => {
            setTimeout(() => {
              this.isLoading = false;
              this.$emit("close");
            }, 200);
            setTimeout(() => {
              this.listplayers_match = res.data.data;
            }, 100);
          })
          .catch(() => {
          });
    },


//FetchData Team 2
    FetchDataSecondTeam() {
      this.$axios.get("match/" + this.$route.params.match_id).then((res) => {
        setTimeout(() => {
          this.isLoading = false;
          this.$emit("close");
        }, 200);
        setTimeout(() => {
          this.listplayers_team = res.data.data;
        }, 100);
      })
    },

    // Add Score firstTeam
    OpenModalAdd(value) {
      if(value == 'first_score'){
        this.showModalfirstScores = true;
        this.showModalCardSecondtTeam = false;
        this.showModalCardfirstTeam = false;
        this.showModalSecondScore = false;
      }else if(value == 'second_score'){
        this.showModalSecondScore = true;
        this.showModalfirstScores = false;
        this.showModalCardSecondtTeam = false;
        this.showModalCardfirstTeam = false;
      }else if(value == 'first_card'){
        this.showModalSecondScore = false;
        this.showModalfirstScores = false;
        this.showModalCardSecondtTeam = false;
        this.showModalCardfirstTeam = true;
      }else if(value == 'second_card'){
        this.showModalCardSecondtTeam = true;
        this.showModalSecondScore = false;
        this.showModalfirstScores = false;
        this.showModalCardfirstTeam = false;
      }
      this.$store.commit("modalAdd_State", true);
    },
  },
  created() {
    this.FetchData();
    this.FetchDataSecondTeam();
  }

}
</script>

<style scoped>
.btn-add .btn-icon {
  margin-bottom: 20px;
  font-size: 12px;
  float: left;
}

.btn-add .btn-right {
  margin-bottom: 20px;
  font-size: 12px;
  float: right;
}


</style>
