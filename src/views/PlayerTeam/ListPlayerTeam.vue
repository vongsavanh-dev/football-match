<template>
  <div class="container">
    <div class="box-title">
      <h4>
        ລາຍຊື່ ນັກເຕະໃນທີມ
      </h4>
      <span class="btn-add">
          <vs-tooltip primary border style="float: right">
             <vs-button class="btn-icon" circle icon flat @click="OpenModalAdd()">
                <i class="fas fa-plus"></i>
            </vs-button>
            <template #tooltip>
            <div class="text-tooltip">
               ເພີ່ມນັກເຕະ
            </div>
            </template>
          </vs-tooltip>
        </span>
      <vs-tooltip primary border style="float: right">
        <vs-button style="float: right"
                   v-if="selected.length > 0"
                   @click="PrintExcel(selected)">
          <i class="far fa-file-pdf"></i>
        </vs-button>
        <template #tooltip>
          <div class="text-tooltip">
            ລາຍງານຂໍ້ມູນນັກເຕະ
          </div>
        </template>
      </vs-tooltip>
    </div>

    <div class="center">
      <vs-table class="overflow-header" v-model="selected">
        <template #thead>
          <vs-tr class="table-header">
            <vs-th id="table-index">
              <vs-checkbox
                  :indeterminate="selected.length == playerteams.length"
                  v-model="allCheck"
                  @change="selected = $vs.checkAll(selected, playerteams)"
              />
            </vs-th>
            <vs-th id="table-index">
              ລຳດັບ
            </vs-th>
            <vs-th>
              ຮູບພາບ
            </vs-th>
            <vs-th id="teamname">
              ຊື່
            </vs-th>
            <vs-th>
              ນາມສະກຸນ
            </vs-th>

            <vs-th>
              ເບີເສື້ອ
            </vs-th>
            <vs-th>
              ຕຳແໜ່ງ
            </vs-th>
            <vs-th>
              ປະຕູ
            </vs-th>
            <vs-th>
              ຊ່ວຍຍິງ
            </vs-th>
            <vs-th>
              ໃບແດງ
            </vs-th>
            <vs-th>
              ໃບເຫຼືອງ
            </vs-th>

            <vs-th id="table-header-button"></vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="index" v-for="(playerteam, index) in $vs.getPage(playerteams, page, max)" :data="playerteam"
                 :is-selected="!!selected.includes(playerteam)">
            <vs-td checkbox>
              <vs-checkbox :val="playerteam" v-model="selected"/>
            </vs-td>
            <vs-td>
              {{ index + 1 }}
            </vs-td>
            <vs-td>
              <img :src="playerteam.image_url" alt="" style="width: 80px;height: 80px;">
            </vs-td>
            <vs-td>
              {{ playerteam.name }}
            </vs-td>
            <vs-td>
              {{ playerteam.sur_name }}
            </vs-td>

            <vs-td>
              {{ playerteam.player_number }}
            </vs-td>
            <vs-td>
              {{ playerteam.player_position }}
            </vs-td>
            <vs-td>
              {{ playerteam.goal_score }}
            </vs-td>
            <vs-td>
              {{ playerteam.assist_score }}
            </vs-td>
            <vs-td>
              {{ playerteam.red_card }}
            </vs-td>

            <vs-td>
              {{ playerteam.yellow_card }}
            </vs-td>
            <vs-td>
              <div class="buttons">
                <vs-tooltip primary border>
                  <vs-button circle icon flat @click="ViewPlayer(playerteam.id)">
                    <i class="fas fa-eye"></i>
                  </vs-button>
                  <template #tooltip>
                    <div class="text-tooltip">
                      ເບຶ່ງຂໍ້ມູນນັກເຕະ
                    </div>
                  </template>
                </vs-tooltip>
                <vs-tooltip warn border>
                  <vs-button circle icon flat @click="OpenModalEdit(playerteam.id)">
                    <i class="fas fa-pencil-alt"></i>
                  </vs-button>
                  <template #tooltip>
                    <div class="text-tooltip">
                      ແກ້ໄຂຂໍ້ມູນນັກເຕະ
                    </div>
                  </template>
                </vs-tooltip>

                <vs-tooltip danger border>
                  <vs-button circle danger icon flat @click="OpenModalDelete(playerteam.id)">
                    <i class="fas fa-trash-alt"></i>
                  </vs-button>
                  <template #tooltip>
                    <div class="text-tooltip">
                      ລຶບຂໍ້ມູນນັກເຕະ
                    </div>
                  </template>
                </vs-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination v-model="page" :length="$vs.getLength(playerteams, max)"/>
        </template>
      </vs-table>

      <PlayerTeamExport v-show="false" ref="PlayerPdfPrint"></PlayerTeamExport>

      <ModalAdd @close="handleModalAddClosed">
        <template v-slot="{ close }">
          <AddPlayerTeam v-if="!showPlayerPreview" @close="close"
                         :listposition="position" @success="FetchData()"/>
          <ViewPlayer v-else :Player_View="listplayer" @success="FetchData()"/>
        </template>
      </ModalAdd>

      <ModalEdit>
        <template v-slot="{ close }">
          <EditPlayerTeam @close="close" :listplayerteam="listplayer" :listposition="position" @success="FetchData()"/>
        </template>
      </ModalEdit>

      <ModalDelete>
        <template v-slot="{ close }">
          <DeletePlayerTeam @close="close" :player_id="playerteamId" @success="FetchData()"/>
        </template>
      </ModalDelete>

    </div>
  </div>
</template>

<script>
import AddPlayerTeam from './CRUD/AddPlayerTeam'
import EditPlayerTeam from './CRUD/EditPlayerTeam'
import DeletePlayerTeam from './CRUD/DeletePlayerTeam'
import ViewPlayer from './CRUD/ViewPlayer'
import PlayerTeamExport from "@/components/Export/PlayerTeamExport";

export default {
  components: {
    AddPlayerTeam,
    EditPlayerTeam,
    DeletePlayerTeam,
    ViewPlayer,
    PlayerTeamExport
  },
  data() {
    return {
      PlayerId: '',
      // active: 1,
      page: 1,
      max: 5,
      playerteams: [],
      listplayer: {}, //sa deng kor moun nuk tea nai team
      playerteamId: '',
      // teamId: '',
      position: [],
      showPlayerPreview: false,
      allCheck: false,
      selected: [],
    }
  },
  methods: {
    fillterplayerteam(playerteamId) {
      return (
          this.playerteams.filter((item) => {
            return item.id == playerteamId;
          })[0] || {}
      );
    },
    OpenModalAdd() {
      this.$store.commit("modalAdd_State", true);
    },
    OpenModalEdit(playerteamId) {
      this.listplayer = {
        ...this.fillterplayerteam(playerteamId)
      };
      // console.log(this.listplayer);
      this.$store.commit("modalEdit_State", true);
    },
    OpenModalDelete(playerteamId) {
      this.playerteamId = playerteamId
      this.$store.commit("modalDelete_State", true);
    },


    ViewPlayer(playerteamId) {
      this.listplayer = {
        ...this.fillterplayerteam(playerteamId)
      };
      this.showPlayerPreview = true;
      this.$store.commit("modalAdd_State", true);
    },
    handleModalAddClosed() {
      this.showPlayerPreview = false;
    },
    FetchData() {
      /*   this.isLoading = true; */
      const id = this.$route.params.team_id
      this.$axios.get(`team/${id}/player`).then(res => {
        setTimeout(() => {
          this.playerteams = res.data.player_lists;
          this.position = res.data.position;
          console.log(this.playerteams)
        }, 100);
      }).catch(() => {

      });
    },

    PrintExcel(selected) {
      const ref = this.$refs["PlayerPdfPrint"];
      if (ref) {
        ref.PrintExcel(selected);
      }
    },



  },
  created() {
    this.FetchData();
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
  width: 10px;
}

#table-header-button {
  width: 150px;

}

#teamname {
  width: 200px;
}

.buttons {
  width: 150px;
}
</style>
