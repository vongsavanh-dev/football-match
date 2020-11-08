<template>
  <div class="container">
    <div class="box-title">
      <h4>
        ທີມເຂົ້າຮອບ
      </h4>
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
            <vs-th>
              ຊື່ທົວນາເມັ້ນ
            </vs-th>
            <vs-th>
              ຈຳນວນທີມເຂົ້າຮອບ
            </vs-th>
            <vs-th id="table-header-button"> </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr >
            <vs-td>
              {{standing.tournament_name}}
            </vs-td>
            <vs-td>
              {{standing.teams}} ທີມ
            </vs-td>

            <vs-td style="text-align: right; width: 100px">
              <div class="buttons">
                <vs-button circle icon flat @click="AddTeamInStanding(standing.id)">
                  <i class="fas fa-plus"></i>
                </vs-button>
                <vs-button circle icon flat @click="OpenModalEdit()">
                  <i class="fas fa-pencil-alt"></i>
                </vs-button>
                <vs-button circle danger icon flat @click="OpenModalDelete()">
                  <i class="fas fa-trash-alt"></i>
                </vs-button>
              </div>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <ModalAdd>
      <template v-slot="{ close }">
        <AmountTeamStanding @close="close" @success="FetchData()"/>
      </template>
    </ModalAdd>
    <!--    <ModalEdit>-->
    <!--      <template v-slot="{ close }">-->
    <!--        <EditTournament @close="close" :EditTournament="Tournament" @success="FetchData()" />-->
    <!--      </template>-->
    <!--    </ModalEdit>-->

    <!--    <ModalDelete>-->
    <!--      <template v-slot="{ close }">-->
    <!--        <DeleteTournament @close="close" :Delete_Tournament ="TournamentId" @success="FetchData()" />-->
    <!--      </template>-->
    <!--    </ModalDelete>-->
  </div>
</template>

<script>
import AmountTeamStanding from './CRUD/AddamountTeamStanding'

export default {
  components: {
    AmountTeamStanding
  },
  data: () => ({
    page: 1,
    max: 5,
    standing: {},

  }),
  methods: {
    FetchData() {
      const id = this.$route.params.tournament_id;
      this.$axios.get(`tournament/${id}/standing`).then(res => {
        console.log(res)
        setTimeout(() => {
          this.$emit('close');
        }, 200);
        setTimeout(() => {
          this.standing = res.data.data
        }, 100);
      }).catch(() => {

      });
    },
    OpenModalAdd() {
      this.$store.commit("modalAdd_State", true);
    },

    // OpenModalEdit(TournamentId) {
    //   this.Tournament = {
    //     ...this.filterTournament(TournamentId)
    //   };
    //   this.$store.commit("modalEdit_State", true);
    // },
    // OpenModalDelete(TournamentId) {
    //   this.TournamentId = TournamentId
    //   this.$store.commit("modalDelete_State", true);
    // },
    AddTeamInStanding(standingId){
      this.$router.push({
        name: "ListTeamStanding",
        params: {
          // tournament_id: TournamentId,
          tournament_id: this.$route.params.tournament_id,
          standing_id :standingId,

        }
      });
    }

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


</style>
