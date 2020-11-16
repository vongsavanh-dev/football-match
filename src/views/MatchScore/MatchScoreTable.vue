<template>
  <div class="container">
    <div class="box-title">
      <h4>
        ບັນທຶກຄະແນນການແຂ່ງຂັນ
      </h4>
      <span class="has-text-danger" style="font-size: 18px;color:red">
                {{ errorMessage }}
      </span>
      <span class="text-danger" style="font-size: 18px;color:red">
                {{ matchTeamouterror }}
      </span>

      <div class="container">
        <div class="columns">
          <div class="column is-5 image-team-circle ">
            <img class="img-right" :src="listplayers_team.team1_logo" alt="">
          </div>

          <div class="column is-2">
            <h3 style="margin-top: 40px;"> {{ listplayers_team.team_1_score }} -
              {{ listplayers_team.team_2_score }}</h3>
            <div class="container" style="margin-left: 50px;">
              <vs-button style="text-align: center;" v-if="listplayers_match.group_id"
                         @click="OpenModalSuccess('FinishMatch')">
                ບັນທີກຜົນ
              </vs-button>

              <vs-button style="text-align: center;" v-else @click="OpenModalSuccess('MatchTeamOut')">
                ບັນທີກຜົນ
              </vs-button>

            </div>

          </div>
          <div class="column is-5 image-team-circle">
            <img class="img-left" :src="listplayers_team.team2_logo" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6">
        <span class="btn-add">
          <vs-tooltip primary border style="float: left">
             <vs-button class="btn-icon" circle icon flat @click="OpenModalAdd('first_score')">
                <i class="fas fa-plus"></i>
            </vs-button>
            <template #tooltip>
              <div class="text-tooltip">
                ຄະແນນທີມ1
              </div>
            </template>
          </vs-tooltip>
 <vs-tooltip primary border style="float: left">
     <vs-button class="btn-icon" circle icon flat
                @click="OpenModalAdd('first_card')">
                <i class="fas fa-id-card-alt"></i>
            </vs-button>
   <template #tooltip>
     <div class="text-tooltip">
       ໃບແດງໃບເຫຼືອງທີມ1
     </div>
   </template>
 </vs-tooltip>

        </span>
        <vs-table>
          <template #thead>
            <vs-tr>
              <vs-th>
                ທີມທີ່ເຮັດປະຕູ
              </vs-th>
              <vs-th style="white-space: nowrap;text-align:left;">
                ນັກເຕະທີ່ຍິງ
              </vs-th>
              <vs-th style="white-space: nowrap;text-align:left;">
                Assist
              </vs-th>
              <vs-th style="white-space: nowrap;text-align:left;">
                ຍິງໃນນາທີ
              </vs-th>
              <vs-th>

              </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="index " v-for="(player, index) in $vs.getPage(player_Score, page, max)" :data="player">
              <vs-td>
                <img :src="player.team_logo" alt="" style="width: 60px;height:60px;">
              </vs-td>
              <vs-td style="  white-space: nowrap;text-align:left;">
                {{ player.player_name }}
              </vs-td>
              <vs-td style="  white-space: nowrap;text-align:left;">
                {{ player.assist_player_name }}
              </vs-td>
              <vs-td style="  white-space: nowrap;text-align:left;">
                {{ player.time }}
              </vs-td>
              <vs-td style="text-align: right; width: 100px">
                <div class="buttons">
                  <vs-button circle danger icon flat @click="OpenModalDelete(player.id, 'score')">
                    <i class="fas fa-trash-alt"></i>
                  </vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
          <template #footer>
            <vs-pagination v-model="page" :length="$vs.getLength(player_Score, max)"/>
          </template>
        </vs-table>
      </div>


      <!--Table team 2-->
      <div class="column is-6">
           <span class="btn-add">
             <vs-tooltip primary border style="float: right;">
               <vs-button class="btn-right" circle icon flat @click="OpenModalAdd('second_card')">
                  <i class="fas fa-id-card-alt"></i>
            </vs-button>
               <template #tooltip>
                 <div class="text-tooltip">
                   ໃບແດງໃບເຫຼືອງທີມ2
                 </div>
               </template>
             </vs-tooltip>
<vs-tooltip primary border style="float: right">
       <vs-button class="btn-right" circle icon flat @click="OpenModalAdd('second_score')">
                <i class="fas fa-plus"></i>
            </vs-button>
  <template #tooltip>
    <div class="text-tooltip">
      ຄະແນນທີມ2
    </div>
  </template>
</vs-tooltip>


        </span>
        <vs-table>
          <template #thead>
            <vs-tr class="table-header">
              <vs-th id="table-index">
                ທີມທີ່ໄດ້ Card
              </vs-th>
              <vs-th>
                ນັກເຕະ
              </vs-th>
              <vs-th style="text-align: center">
                ປະເພດ Card
              </vs-th>
              <vs-th>
                ນາທີ
              </vs-th>
              <vs-th>

              </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="index " v-for="(playercard, index) in $vs.getPage(player_Card, page2, max)" :data="playercard">
              <vs-td>
                <img :src="playercard.team_logo" alt="" style="width: 60px;height:60px;">
              </vs-td>
              <vs-td style="white-space: nowrap;text-align:left;">
                {{ playercard.player }}
              </vs-td>
              <vs-td style="white-space: nowrap;text-align:center;" v-if="playercard.card_type == 'Red'">
                <i class="fas fa-circle" style="color: red;font-size: 30px;"></i>
              </vs-td>
              <vs-td style="white-space: nowrap;text-align:center;" v-else>
                <i class="fas fa-circle" style="color: yellow;font-size: 30px;"></i>
              </vs-td>
              <vs-td style="white-space: nowrap;text-align:left;">
                {{ playercard.time }}
              </vs-td>
              <vs-td style="text-align: right; width: 100px">
                <div class="buttons">
                  <vs-button circle danger icon flat @click="OpenModalDelete(playercard.id, 'card')">
                    <i class="fas fa-trash-alt"></i>
                  </vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
          <template #footer>
            <vs-pagination v-model="page2" :length="$vs.getLength(player_Card, max)"/>
          </template>
        </vs-table>

        <ModalAdd>
          <template v-slot="{ close }">
            <AddScorefirstTeam v-if="showModalfirstScores" @close="close"
                               :listplayer_firstTeam="listplayers_team"
                               @success="GetMatchScore();FetchDataSecondTeam() "/>
            <AddCardFirstTeam v-if="showModalCardfirstTeam" :Card_firstTeam="listplayers_team" @close="close"
                              @success="GetMatchCard()"/>
            <AddScoreSecondTeam @close="close" :listplayer_scondTeam="listplayers_team"
                                @success="GetMatchScore();FetchDataSecondTeam()" v-if="showModalSecondScore"/>

            <AddCardScondTeam v-if="showModalCardSecondtTeam" :Card_secondTeam="listplayers_team" @close="close"
                              @success="GetMatchCard()"/>
          </template>
        </ModalAdd>

        <ModalDelete>
          <template v-slot="{ close }">
            <DeleteScore v-if="playerScoreId" @close="close" :Score_Delete="playerScoreId"
                         @success="GetMatchScore()"/>
            <DeleteCard v-if="playerCardId" @close="close" :Card_Delete="playerCardId" @success="GetMatchCard()"/>
          </template>
        </ModalDelete>

<!--        <ModalSuccess v-if="showModalFinishMatch && showModalMatchTeamOut == false" @close="close">-->
        <ModalSuccess>
          <template v-slot="{ close }">
            <MatchFinished v-if="showModalFinishMatch" @close="close"/>
            <MatchTeamOut v-if="showModalMatchTeamOut" @close="close"/>
          </template>
        </ModalSuccess>
      </div>
    </div>


  </div>
</template>

<script>
import AddScorefirstTeam from './CRUD/AddScore'
import AddScoreSecondTeam from './CRUD/AddScoreteamScond'
import AddCardFirstTeam from './CRUD/AddCardFirstTeam'
import AddCardScondTeam from './CRUD/AddCardScondTeam'
import DeleteCard from "@/views/MatchScore/CRUD/DeleteCard";
import DeleteScore from "@/views/MatchScore/CRUD/DeleteScore";
import MatchFinished from "@/views/MatchScore/CRUD/Confirm"
import MatchTeamOut from "@/views/MatchScore/CRUD/MatchTeamOut"


export default {
  components: {
    AddScorefirstTeam,
    AddScoreSecondTeam,
    AddCardFirstTeam,
    AddCardScondTeam,
    DeleteScore,
    DeleteCard,
    MatchFinished,
    MatchTeamOut
  },
  data() {
    return {

      // active: 1,
      page: 1,
      page2: 1,
      max: 5,
      showModalSecondScore: false,
      showModalCardfirstTeam: false,
      showModalCardSecondtTeam: false,
      showModalfirstScores: false,
      showModalFinishMatch: false,
      showModalMatchTeamOut: false,
      modalPlayerScore: false,
      modalPlayerCard: false,
      listplayers_team: [],
      player_firstteam: [],
      player_scondteam: [],
      listplayers_match: [],
      player_Score: [],
      player_Card: [],
      errorMessage: '',
      playerScoreId: '',
      playerCardId: '',
      matchTeamouterror: '',
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
            }, 100);
            this.listplayers_match = res.data.data;
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
        }, 100);
        this.listplayers_team = res.data.data;
      })
    },

    OpenModalAdd(value) {
      if (value == 'first_score') {
        this.showModalfirstScores = true;
        this.showModalCardSecondtTeam = false;
        this.showModalCardfirstTeam = false;
        this.showModalSecondScore = false;
      } else if (value == 'second_score') {
        this.showModalSecondScore = true;
        this.showModalfirstScores = false;
        this.showModalCardSecondtTeam = false;
        this.showModalCardfirstTeam = false;
      } else if (value == 'first_card') {
        this.showModalCardfirstTeam = true;
        this.showModalSecondScore = false;
        this.showModalfirstScores = false;
        this.showModalCardSecondtTeam = false;
      } else if (value == 'second_card') {
        this.showModalCardSecondtTeam = true;
        this.showModalSecondScore = false;
        this.showModalfirstScores = false;
        this.showModalCardfirstTeam = false;
      }

      if (this.listplayers_team.team_1_id) {
        this.$store.commit("modalAdd_State", true);
      }
    },

    // OpenModalDelete(playerScoreId) {
    //   this.playerCardId = true;
    //   this.playerScoreId = playerScoreId
    //   this.$store.commit("modalDelete_State", true);
    // },
    // OpenModalDelete(playerCardId) {
    //   this.playerCardId = playerCardId
    //   this.$store.commit("modalDelete_State", true);
    // },

    OpenModalDelete(id, type) {
      /// clear
      this.playerCardId = null;
      this.playerScoreId = null;
      if (type === 'card') {
        this.playerCardId = id
      } else if (type === 'score') {
        this.playerScoreId = id;
      }
      this.$store.commit("modalDelete_State", true);
    },


    //get matchScore
    GetMatchScore() {
      this.$axios
          .get(`match/${this.$route.params.match_id}/matchscore`)
          .then((res) => {
            setTimeout(() => {
              this.isLoading = false;
              this.$emit("close");
            }, 100);
            this.player_Score = res.data.data
          })
          .catch(() => {
          });
    },

    GetMatchCard() {
      this.$axios
          .get(`match/${this.$route.params.match_id}/matchCardDetail`)
          .then((res) => {
            setTimeout(() => {
              this.isLoading = false;
              this.$emit("close");
            }, 200);
            setTimeout(() => {
              this.player_Card = res.data.data
            }, 100);
          })
          .catch(() => {
          });
    },

    //FinishMatch

    OpenModalSuccess(value) {
      if (value == 'FinishMatch') {
        this.showModalFinishMatch = true;
        this.showModalMatchTeamOut = false;
        this.$store.commit("modalSuccess_State", true);
      } else if (value == 'MatchTeamOut') {
        this.showModalMatchTeamOut = true;
        this.showModalFinishMatch = false;
        this.$store.commit("modalSuccess_State", true);
      }
    },

    // FinishMatch() {
    // this.$axios
    //     .get(`match/${this.$route.params.match_id}/finished`)
    //     .then(() => {
    //       setTimeout(() => {
    //         this.$emit("close");
    //       }, 200);
    //       setTimeout(() => {
    //         this.$emit('close');
    //         this.$emit('success');
    //         this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 3000);
    //       }, 300);
    //       this.$router.push({
    //         name: 'Match'
    //       })
    //     })
    //     .catch((e) => {
    //       if (e && e.response) {
    //         const message = (e.response.data || {}).error;
    //         this.errorMessage = message
    //       }
    //
    //     });

    //Teamout
    // MatchTeamout() {
    //   this.$axios
    //       .get(`match/${this.$route.params.match_id}/team-out`)
    //       .then(() => {
    //         setTimeout(() => {
    //           this.$emit("close");
    //         }, 200);
    //         setTimeout(() => {
    //           this.$emit('close');
    //           this.$emit('success');
    //           this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 3000);
    //         }, 300);
    //         this.$router.push({
    //           name: 'MatchStanding'
    //         })
    //       })
    //       .catch((e) => {
    //         if(e && e.response){
    //           const message =(e.response.data || {}).error;
    //           this.matchTeamouterror = message;
    //         }
    //       });
    // }
  },
  created() {
    this.FetchData();
    this.FetchDataSecondTeam();
    this.GetMatchScore();
    this.GetMatchCard();
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

.image-team-circle {
  position: relative;
  margin-bottom: 100px;

}

.image-team-circle img {
  border-radius: 50%;
  width: 120px;
  height: 120px;
}

.image-team-circle .img-right {
  position: absolute;
  right: 0px;

}

.image-team-circle .img-left {
  position: absolute;
  left: 0;
}

</style>
