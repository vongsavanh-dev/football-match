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
                </vs-tr>
            </template>
             <template #footer>
              <vs-pagination v-model="page" :length="$vs.getLength(player_firstteam, max)" />

            </template>
        </vs-table>
     </div>


<!--Table team 2-->

       <div class="column is-6">
           <span class="btn-add">
            <vs-button class="btn-right" circle icon flat @click="OpenModalAddScondTeam()">
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
                </vs-tr>
            </template>
             <template #footer>
              <vs-pagination v-model="page" :length="$vs.getLength(player_scondteam, max)" />
            </template>
        </vs-table>
           <ModalAdd @close="handleModalAddClosed">
               <template v-slot="{ close }">
                   <AddScorefirstTeam v-if="!showModalfirstTeam" @close="close"
                                      :listplayer_firstTeam="listplayers_team"
                             @success="FetchData()" />
                   <AddScoreSecondTeam  v-else @close="close" :listplayer_scondTeam="listplayers_team"
                                        @success="FetchData()" />
               </template>
           </ModalAdd>
     </div>
    </div>



</div>
</template>

<script>
import AddScorefirstTeam from './CRUD/AddScore'
import AddScoreSecondTeam from './CRUD/AddScoreteamScond'
export default {
  components:{
      AddScorefirstTeam,
    AddScoreSecondTeam,
  },
  data() {
    return {

        active: 1,
        page: 1,
        max: 5,
        showModalfirstTeam: false,
        listplayers_team:[],
        player_firstteam:[],
        player_scondteam:[],
        listplayers_match:[],
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
            this.listplayers_team = res.data.data;
          }, 100);
      })
 },
     OpenModalAdd() {
         this.showModalfirstTeam = false;

            this.$store.commit("modalAdd_State", true);
        },
      OpenModalAddScondTeam(){
          this.showModalfirstTeam = true;
          this.$store.commit("modalAdd_State", true);
      },
      handleModalAddClosed() {
          this.showModalfirstTeam = false;
      },

  },
  created(){
      this.FetchData();
      this.FetchDataScondTeam();
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
