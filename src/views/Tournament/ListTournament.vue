<template>
  <div class="container">
    <div class="box-title">
      <h4>
        ລາຍການທົວນາເມັ້ນ
      </h4>
      <span class="btn-add">
         <vs-tooltip primary style="float: right" border>
        <vs-button class="btn-icon" circle icon flat @click="OpenModalAdd()">
          <i class="fas fa-plus"></i>
        </vs-button>
           <template #tooltip>
            ເພີ່ມທົວນາເມັ້ນ
        </template>
      </vs-tooltip>
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
              ຊື່ທົວນາເມັ້ນ
            </vs-th>
            <vs-th>
              ຈຳນວນມື້
            </vs-th>
            <vs-th>
              ຈຳນວນນັດ
            </vs-th>
            <vs-th>
              ຈຳນວນທີມ
            </vs-th>
            <vs-th>
              ຈຳນວນນັກເຕະ
            </vs-th>

            <vs-th>
              goal_against
            </vs-th>

            <vs-th>
              top_scorer
            </vs-th>
            <vs-th>
              Status
            </vs-th>
            <vs-th></vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="index" v-for="(tournament, index) in $vs.getPage(ListTournament, page, max)"
                 :data="tournament">
            <vs-td>
              {{ index + 1 }}
            </vs-td>
            <vs-td>
              {{ tournament.name }}
            </vs-td>
            <vs-td>
              {{ tournament.days }}
            </vs-td>

            <vs-td>
              {{ tournament.matches }}
            </vs-td>
            <vs-td>
              {{ tournament.teams }}
            </vs-td>
            <vs-td>
              {{ tournament.players }}
            </vs-td>

            <vs-td>
              {{ tournament.goal_against }}
            </vs-td>

            <vs-td>
              {{ tournament.top_scorer }}
            </vs-td>
            <vs-td>
              {{ tournament.status }}
            </vs-td>
            <vs-td class="btn-action">
              <div class="buttons">
                <vs-tooltip ref="addTooltip" top primary border>
                  <vs-button circle icon flat @click="AddTournament(tournament.id)">
                    <i class="fas fa-folder-plus"></i>
                  </vs-button>
                  <template #tooltip>
                    <div class="text-tooltip">
                      ເພີ່ມກຸ່ມ
                    </div>
                  </template>
                </vs-tooltip>
                <vs-tooltip warn border>
                  <vs-button circle icon flat @click="OpenModalEdit(tournament.id)">
                    <i class="fas fa-pencil-alt"></i>
                  </vs-button>
                  <template #tooltip>
                    <div class="text-tooltip">
                      ແກ້ໄຂທົວນາເມັ້ນ
                    </div>
                  </template>
                </vs-tooltip>

                <vs-tooltip danger border>
                  <vs-button circle danger icon flat
                             @click="OpenModalDelete(tournament.id)">
                    <i class="fas fa-trash-alt"></i>
                  </vs-button>
                  <template #tooltip>
                    <div class="text-tooltip">
                      ລຶບທົວນາເມັ້ນ
                    </div>
                  </template>
                </vs-tooltip>


                <vs-tooltip primary border ref="addTooltip">
                  <vs-button circle danger icon flat
                             @click="AddhightLight(tournament.id)">
                    <i class="fab fa-youtube"></i>
                  </vs-button>
                  <template #tooltip>
                    <div class="text-tooltip">
                      highlight
                    </div>
                  </template>
                </vs-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination v-model="page" :length="$vs.getLength(ListTournament, max)"/>
        </template>
      </vs-table>
    </div>
    <ModalAdd>
      <template v-slot="{ close }">
        <AddTournament @close="close" @success="FetchData()"/>
      </template>
    </ModalAdd>
    <ModalEdit>
      <template v-slot="{ close }">
        <EditTournament @close="close" :EditTournament="Tournament" @success="FetchData()"/>
      </template>
    </ModalEdit>

    <ModalDelete>
      <template v-slot="{ close }">
        <DeleteTournament @close="close" :Delete_Tournament="TournamentId" @success="FetchData()"/>
      </template>
    </ModalDelete>
  </div>
</template>

<script>
import AddTournament from './CRUD/AddTournament'
import EditTournament from './CRUD/EditTournament'
import DeleteTournament from "./CRUD/DeleteTournament";

export default {
  components: {
    AddTournament,
    EditTournament,
    DeleteTournament,
  },
  data: () => ({
    // active: 1,
    page: 1,
    max: 5,
    ListTournament: [],
    Tournament: {},
    TournamentId: '',
  }),
  methods: {
    filterTournament(TournamentId) {
      return (
          this.ListTournament.filter((item) => {
            return item.id == TournamentId;
          })[0] || {}
      );
    },
    OpenModalAdd() {
      this.$store.commit("modalAdd_State", true);
    },
    OpenModalEdit(TournamentId) {
      this.Tournament = {
        ...this.filterTournament(TournamentId)
      };
      this.$store.commit("modalEdit_State", true);
    },
    OpenModalDelete(TournamentId) {
      this.TournamentId = TournamentId
      this.$store.commit("modalDelete_State", true);
    },

     // Add Group
    AddTournament(TournamentId) {
      const { addTooltip } = this.$refs;
      if(addTooltip && addTooltip[0]) {
        addTooltip[0].removeTooltip();
      }

      setTimeout(() => {
        this.$router.push({
          name: "Group",
          params: {
            tournament_id: TournamentId,
          }
        });
      })
    },


    AddhightLight(TournamentId) {
      const {addTooltip} = this.$refs;
      if(addTooltip && addTooltip[0]){
        addTooltip.forEach(function (item){
          item.removeTooltip()
        })
      }
      setTimeout(() =>{
        this.$router.push({
          name: "MatchHightLight",
          params: {
            tournament_id: TournamentId,
          }
        });
      })

    },



    FetchData() {
      this.$axios.get('tournament').then(res => {
        // setTimeout(() => {
        //     this.$emit('close');
        // }, 200);
        setTimeout(() => {
          this.ListTournament = res.data.data;
        }, 100);
      }).catch(() => {
      });
    },
  },
  created() {
    this.FetchData();
  }
};
</script>

<style>
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
  text-align: center;
  margin-top: 50%;
}

#table-header-button {
  width: 200px;
}

.text-tooltip {
  font-size: 16px;
}
.btn-action .buttons{
  width: 200px;
}


</style>
