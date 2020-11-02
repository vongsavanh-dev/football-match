<template>
<div class="container">
    <div class="box-title">
        <h4>
            ບັນທຶກຄະແນນ
        </h4>
        <!-- <span class="btn-add">
            <vs-button class="btn-icon" circle icon flat @click="OpenModalAdd()">
                <i class="fas fa-plus"></i>
            </vs-button>
        </span> -->
    </div>

    <div class="columns">
     <div class="column is-6">
        <span class="btn-add">
            <vs-button class="btn-icon" circle icon flat @click="OpenModalAdd()">
                <i class="fas fa-plus"></i>
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
                 
                    <!-- <vs-th id="table-header-button"> </vs-th> -->
                </vs-tr>
            </template>
            <template #tbody>
                <vs-tr :key="index " v-for="(player, index) in $vs.getPage(player_firstteam, page, max)" :data="player">

                    <vs-td>
                     {{index +1 }}
                    </vs-td>
                    <vs-td style="  white-space: nowrap;text-align:left;">
                     {{player.player_name}}
                    </vs-td>
                    <vs-td style="  white-space: nowrap;text-align:left;">
                     {{player.assist_player_name}}
                    </vs-td>
             

                    <!-- <vs-td style="text-align: right; width: 100px">
                        <div class="buttons">
                            <vs-button circle icon flat @click="OpenModalEdit()">
                                <i class="fas fa-pencil-alt"></i>
                            </vs-button>
                            <vs-button circle icon flat @click="OpenModalDelete()">
                                <i class="fas fa-trash-alt"></i>
                            </vs-button>
                        </div>
                    </vs-td> -->
                </vs-tr>
            </template>
             <template #footer>
              <vs-pagination v-model="page" :length="$vs.getLength(player_firstteam, max)" />

            </template>
        </vs-table>
     </div>

       <div class="column is-6">
           <span class="btn-add">
            <vs-button class="btn-right" circle icon flat @click="OpenModalAdd()">
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
                        {{index +1}}
                    </vs-td>
                    <vs-td style="white-space: nowrap;text-align:left;">
                      {{player.player_name}}
                    </vs-td>
                    <vs-td style="white-space: nowrap;text-align:left;">
                     {{player.assist_player_name}}
                    </vs-td>
               
<!-- 
                    <vs-td style="text-align: right; width: 100px">
                        <div class="buttons">
                            <vs-button circle icon flat @click="OpenModalEdit()">
                                <i class="fas fa-pencil-alt"></i>
                            </vs-button>
                            <vs-button circle icon flat @click="OpenModalDelete()">
                                <i class="fas fa-trash-alt"></i>
                            </vs-button>
                          
                        </div>
                    </vs-td> -->
                </vs-tr>
            </template>
             <template #footer>
              <vs-pagination v-model="page" :length="$vs.getLength(player_scondteam, max)" />

            </template>
        </vs-table>
     </div>
    </div>
    <ModalAdd>
        <template v-slot="{ close }">
            <AddScore @close="close" :listplayer_team="listplayers_match"  @success="FetchData()" />
        </template>
    </ModalAdd>

      <ModalAdd>
        <template v-slot="{ close }">
            <AddScoreSecondTeam @close="close" :listplayer_teamSecond="listplayers_scondteam"  @success="FetchData()" />
        </template>
    </ModalAdd>
    <!-- <ModalEdit>
        <template v-slot="{ close }">
            <EditTeam  @close="close" @success="FetchData()" />
        </template>
    </ModalEdit> -->

    <!-- <ModalDelete>
        <template v-slot="{ close }">
            <DeleteTeam @close="close"  @success="FetchData()" />
        </template>
    </ModalDelete> -->
</div>
</template>

<script>
import AddScore from './CRUD/AddScore'
import AddScoreSecondTeam from './CRUD/AddScoreteamScond'
export default {
  components:{
    AddScore,
    AddScoreSecondTeam,
  },
  data() {
    return {

        active: 1,
        page: 1,
        max: 5,
        listplayers_scondteam:{},
        listplayers_match:{},
        player_firstteam:[],
        player_scondteam:[],
    }
  },
  methods: {

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
            // console.log(this.listplayers_match)
          }, 100);
        })
        .catch(() => {});
    },


//FetchData Team 2
 
  FetchDataScondTeam(){
      this.$axios.get("match/" + this.$route.params.match_id).then((res) =>{
           setTimeout(() => {
            this.isLoading = false;
            this.$emit("close");
          }, 200);
          setTimeout(() => {
            this.listplayers_scondteam = res.data.data;
            console.log(this.listplayers_scondteam)
          }, 100);
      })
 },

    
     getMatch_score(){
            const id = this.$route.params.match_id;
            this.$axios.get(`match/${id}/matchscore`).then(res =>{
               setTimeout(() => {
                   this.player_firstteam = res.data.data
                //    console.log(this.player_firstteam)
               }, 200);
            })
        },
        getMatch_scorescondteam(){
            const id = this.$route.params.match_id;
            this.$axios.get(`match/${id}/matchscore`).then(res =>{
               setTimeout(() => {
                   this.player_scondteam = res.data.data
                //    console.log(this.player_scondteam)
               }, 200);
            })
        },


     OpenModalAdd() {
            this.$store.commit("modalAdd_State", true);
        },

  },
  created(){
      this.FetchData();
      this.FetchDataScondTeam();
      this.getMatch_score();
      this.getMatch_scorescondteam();
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