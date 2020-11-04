<template>
<div class="container">
    <div class="box-title">
        <h4>
            ລາຍການແຂ່ງຂັນ ທັງໝົດ
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
                    <vs-th id="table-index">
                        ລຳດັບ
                    </vs-th>
                    <vs-th style="width: 50px; white-space: nowrap; ">
                        ຊື່ທີມທີໜື່ງ
                    </vs-th>
                    <vs-th>

                    </vs-th>

                    <vs-th id="match-status">

                    </vs-th>
                  <vs-th>

                    </vs-th>
                    <vs-th>
                        ຊື່ທີມທີສອງ
                    </vs-th>
                    <vs-th>
                        ສະຖານະ
                    </vs-th>

                    <vs-th>
                        ເວລາການແຂ່ງຂັນ
                    </vs-th>

                    <vs-th> </vs-th>
                    <vs-th id="icon-menu"> </vs-th>

                </vs-tr>
            </template>
            <template #tbody>
                <vs-tr :key="index " v-for="(match, index) in $vs.getPage(matchs, page, max)" :data="match">
                    <vs-td>
                        {{index + 1 }}
                    </vs-td>
                    <vs-td style="text-align: right">
                       {{ match.team_1 }}
                    </vs-td>
                    <vs-td style="width:60px;">
                    <img :src="match.team1_logo" alt="" class="image-log-team">
                    </vs-td>
                    <vs-td style="text-align: center">
                        {{ index +1 }}  -  {{ index +1 }}
                    </vs-td>
                      <vs-td style="width:60px;">
                        <img :src="match.team2_logo" alt="" class="image-log-team">
                    </vs-td>
                    <vs-td style="text-align: left">
                      {{ match.team_2 }}
                    </vs-td>
                    <vs-td>
                        {{ match.status }}
                    </vs-td>
                    <vs-td>
                        {{ match.match_date }}
                    </vs-td>

                      <vs-td>

                    </vs-td>

                    <vs-td style="text-align: right; width: 100px">
                        <div class="buttons">
                            <vs-button circle icon flat @click="OpenModalEdit(match.id)">
                                <i class="fas fa-pencil-alt"></i>
                            </vs-button>
                            <vs-button circle danger icon flat @click="OpenModalDelete(match.id)">
                                <i class="fas fa-trash-alt"></i>
                            </vs-button>
                            <vs-button circle icon flat @click="AddScore(match.id)">
                                <i class="far fa-calendar-plus"></i>
                            </vs-button>
                        </div>
                    </vs-td>
                </vs-tr>
            </template>
            <template #footer>
                <vs-pagination v-model="page" :length="$vs.getLength(matchs, max)" />

            </template>
        </vs-table>
    </div>
    <ModalAdd>
        <template v-slot="{ close }">
            <AddMatch @close="close" @success="FetchData()" />
        </template>
    </ModalAdd>
    <ModalEdit>
        <template v-slot="{ close }">
            <EditMatch :listMatch="listmatch" @close="close" @success="FetchData()"/>
        </template>
    </ModalEdit>

    <ModalDelete>
        <template v-slot="{ close }">
            <DeleteMatch @close="close" :match_id="matchId" @success="FetchData()" />
        </template>
    </ModalDelete>
</div>
</template>

<script>
import AddMatch from "./CRUD/AddMatch";
import EditMatch from "./CRUD/EditMatch";
import DeleteMatch from "./CRUD/DeleteMatch";
export default {
    components: {
        AddMatch,
        EditMatch,
        DeleteMatch,
    },
    data() {
        return {
            active: 1,
            page: 1,
            max: 5,
            matchs: [],
            statuslist:[],
            listmatch: {},
            matchId: '',
        }
    },
    methods: {
        filtermatch(matchId) {
            return (
                this.matchs.filter((item) => {
                    return item.id == matchId;
                })[0] || {}
            );
        },
        AddScore(matchId) {
            this.$router.push({
                name: "MatchScore",
                params: {
                    match_id: matchId,
                }
            });
        },
        OpenModalAdd() {
            this.$store.commit("modalAdd_State", true);
        },
        OpenModalEdit(matchId) {
            this.listmatch = {
                ...this.filtermatch(matchId)
            };
            // console.log(this.listmatch)
            this.$store.commit("modalEdit_State", true);
        },
        OpenModalDelete(matchId) {
            this.matchId = matchId
            this.$store.commit("modalDelete_State", true);
        },

        FetchData() {
            this.$axios.get('match').then(res => {
                // console.log(res)
                setTimeout(() => {
                    this.$emit('close');
                }, 200);
                setTimeout(() => {
                    this.matchs = res.data.data;
                    console.log(this.matchs)
                }, 100);
            }).catch(() => {

            });
        },
    },
    created() {
        this.FetchData();
    }
}

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
.image-log-team {
    width: 100%;
    margin-top: 8px;
}

#table-index {
    width: 20px;
    text-align: center;
    margin-top: 50%;
}
#match-status{
    width: 100px;
   margin-left: 200px;
}
#icon-menu{
    width:150px;
}



</style>
