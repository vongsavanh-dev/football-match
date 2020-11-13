<template>
<div class="container">
    <div class="box-title">
        <h4>
            ລາຍຊື່ທີມທັງໝົດ
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
    </div>

    <div class="center">
        <vs-table>
            <template #thead>
                <vs-tr class="table-header">
                    <vs-th id="table-index">
                        ລຳດັບ
                    </vs-th>
                    <vs-th>
                        ໂລໂກ້
                    </vs-th>
                    <vs-th>
                        ຊື່ທີມ
                    </vs-th>
                    <vs-th id="sponser">
                        ຊື່ຫຍໍ້
                    </vs-th>
                    <vs-th id="table-header-button"> </vs-th>
                </vs-tr>
            </template>
            <template #tbody>
                <vs-tr :key="index" v-for="(team, index) in $vs.getPage(teams, page, max)" :data="team">

                    <vs-td>
                        {{ index +1 }}
                    </vs-td>
                    <vs-td>
                        <img :src="team.logo_url" alt="" class="image-log-team">
                    </vs-td>
                    <vs-td>
                        {{ team.team_name }}
                    </vs-td>
                    <vs-td>
                        {{ team.initial_name }}
                    </vs-td>

                    <vs-td class="btn-action">
                        <div class="buttons">
                          <vs-tooltip border warn>
                            <vs-button circle icon flat @click="OpenModalEdit(team.id)">
                                <i class="fas fa-pencil-alt"></i>
                            </vs-button>
                            <template #tooltip>
                             <div class="text-tooltip">
                               ແກ້ໄຂທີມ
                             </div>
                            </template>
                          </vs-tooltip>

                          <vs-tooltip danger border>
                            <vs-button circle  danger icon flat @click="OpenModalDelete(team.id)">
                                <i class="fas fa-trash-alt"></i>
                            </vs-button>
                            <template #tooltip>
                              <div class="text-tooltip">
                                ລືບທີມ
                              </div>
                            </template>
                          </vs-tooltip>

                          <vs-tooltip primary border ref="addTooltip">
                            <vs-button  circle  icon flat @click="AddPlayer(team.id)">
                              <i class="fas fa-user-plus"></i>
                            </vs-button>
                            <template #tooltip>
                              <div class="text-tooltip">
                                ເພີມນັກເຕະ
                              </div>
                            </template>
                          </vs-tooltip>

                          <vs-tooltip primary border ref="addTooltip" >
                            <vs-button circle  icon flat @click="AddStaff(team.id)">
                              <i class="fas fa-street-view" style="font-size: 18px;"></i>
                            </vs-button>
                            <template #tooltip>
                              <div class="text-tooltip">
                                ເພີ່ມທີມງານ
                              </div>
                            </template>
                          </vs-tooltip>

                        </div>
                    </vs-td>
                </vs-tr>
            </template>
            <template #footer>
                <vs-pagination v-model="page" :length="$vs.getLength(teams, max)" />

            </template>
        </vs-table>
    </div>
    <ModalAdd>
        <template v-slot="{ close }">
            <AddTeam @close="close" @success="FetchData()" />
        </template>
    </ModalAdd>
    <ModalEdit>
        <template v-slot="{ close }">
            <EditTeam :listTeam="listteam" @close="close" @success="FetchData()" />
        </template>
    </ModalEdit>

    <ModalDelete>
        <template v-slot="{ close }">
            <DeleteTeam @close="close" :team_id="teamId" @success="FetchData()" />
        </template>
    </ModalDelete>
</div>
</template>

<script>
import AddTeam from "./CRUD/AddTeam";
import EditTeam from "./CRUD/EditTeam";
import DeleteTeam from "./CRUD/DeleteTeam";

export default {
    components: {
        AddTeam,
        EditTeam,
        DeleteTeam,
    },
    data: () => ({
        // active: 1,
        page: 1,
        max: 5,
        teams: [],
        listteam: {},
        teamId: '',
        /* isLoading: true, */
    }),
    methods: {
        OpenModalAdd() {
            this.$store.commit("modalAdd_State", true);
        },
        filterTeam(TeamID) {
            return (
                this.teams.filter((item) => {
                    return item.id == TeamID;
                })[0] || {}
            );
        },
        OpenModalEdit(teamId) {
            this.listteam = {
                ...this.filterTeam(teamId)
            };
            this.$store.commit("modalEdit_State", true);
        },

        OpenModalDelete(teamId) {
            this.teamId = teamId
            this.$store.commit("modalDelete_State", true);
        },


        AddPlayer(teamId) {
          const { addTooltip } = this.$refs;
          if(addTooltip && addTooltip[0]) {
            addTooltip.forEach(function (item) {
              item.removeTooltip()
            })
          }
          setTimeout(() => {
            this.$router.push({
              name: "playerteam",
              params: {
                team_id: teamId,
              }
            });
          })
        },


      AddStaff(teamId){
          const {addTooltip} = this.$refs;
          if (addTooltip && addTooltip[0]){
            addTooltip[0].removeTooltip()
            addTooltip.forEach(function (item){
              item.removeTooltip();
            })
          }
          setTimeout(() =>{
            this.$router.push({
              name:"Staff",
              params:{
                team_id: teamId,
              }
            })
          })
      },
        FetchData() {
            /*   this.isLoading = true; */
            this.$axios.get('team').then(res => {
                // console.log(res)
                setTimeout(() => {
                    this.$emit('close');
                }, 200);
                setTimeout(() => {
                    this.teams = res.data.data;
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
    text-align: center;
    margin-top: 50%;
}

#table-header-button {
    width: 200px;
}

#sponser {
    width: 200px;
}

.image-log-team {
    width: 60px;
    height:60px;
    margin-top: 8px;
}
.btn-action .buttons{
  width: 200px;
}
</style>
