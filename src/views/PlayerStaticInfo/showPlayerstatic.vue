<template>
  <div class="container">
    <div class="box-title">
      <h4>
        ສະຖິຕິການແຂ່ງຂັນ
      </h4>
    </div>
    <div class="center">
      <vs-table>
        <template #thead>
          <vs-tr class="table-header">
            <vs-th id="table-index">
              ລຳດັບ
            </vs-th>
            <vs-th>
              ທົວນາເມັ້ນ
            </vs-th>
            <vs-th> </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr  :key="index" v-for="(tournament, index) in $vs.getPage(tournaments, page, max)"
                  :data="tournament">
            <vs-td>
              {{index +1}}
            </vs-td>
            <vs-td>
              {{tournament.name}}
            </vs-td>


            <vs-td id="table-header-button" >
              <div class="buttons">
                <vs-tooltip primary border ref="addTooltip">
                  <vs-button circle icon flat @click="ShowStaticInfo(tournament.id)">
                    <i class="fas fa-chart-pie"></i>
                  </vs-button>
                  <template #tooltip>
                    <div class="text-tooltip">
                      ເບິ່ງຂໍ້ມູນສະຖິຕິ
                    </div>
                  </template>
                </vs-tooltip>

              </div>
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination v-model="page" :length="$vs.getLength(tournaments, max)" />
        </template>
      </vs-table>
    </div>

  </div>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    max: 5,
    tournaments:[],

  }),
  methods: {
    FetchData(){
      this.$axios.get('tournament').then(res => {
        setTimeout(() => {
          this.tournaments = res.data.data
          // console.log(this.tournament)
        }, 100);
      }).catch(() => {

      });
    },
    ShowStaticInfo(TournamentId){
      const {addTooltip} = this.$refs;
      if(addTooltip && addTooltip[0]){
        addTooltip[0].removeTooltip()
      }
      setTimeout(() =>{
        this.$router.push({
          name:"ExportCardPlayer",
          params:{
            tournament_id:TournamentId,
          }
        })
      })
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
  width: 300px;
  text-align: center;
  margin-top: 50%;
}
#table-header-button {
  width: 200px;
}


</style>
