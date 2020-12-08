<template>
  <div class="container">
    <div class="box-title">
      <div class="show-select-menu">
        <div class="select is-medium">
          <select placeholder="ສະຖານະ..." class="is-focused"
                  name="ListReport"
                  v-model="ListReport">
            <option value="">ເລືອກລາຍງານ...</option>
            <option value="Yellow">ລາຍງານຂໍ້ມູນໃບເຫຼືອງ</option>
            <option value="Red">ລາຍງານຂໍ້ມູນໃບແດງ</option>
            <option value="Goal">ລາຍງານຂໍ້ມູນສະຖິຕິການຍິງປະຕູ</option>
            <option value="Assist">ລາຍງານຂໍ້ມູນAssist</option>
          </select>
        </div>
      </div>
      <vs-tooltip primary border style="float:left;">
        <vs-button style="margin-bottom: 10px;"
                   v-if="selected.length > 0"
                   @click="PrintExcel(selected)">
          ພິມລາຍງານ
        </vs-button>
        <template #tooltip>
          <div class="text-tooltip">
            ລາຍງານຂໍ້ມູນ
          </div>
        </template>
      </vs-tooltip>
    </div>

    <div class="center">
      <vs-table v-model="selected">
        <template #thead>
          <vs-tr class="table-header">
            <vs-th id="table-checkbox">
              <vs-checkbox
                  :indeterminate="selected.length == PlayerCards.length"
                  v-model="allCheck"
                  @change="selected = $vs.checkAll(selected, PlayerCards)"/>
            </vs-th>
            <vs-th id="table-index">
              ລຳດັບ
            </vs-th>
            <vs-th>
              ຊື່ ແລະ ນາມສະກຸນ
            </vs-th>
            <vs-th>
              ເບີເສື້ອ
            </vs-th>

              <vs-th v-if="CardType == 'Yellow'">
                ໃບເຫຼືອງ
              </vs-th>

              <vs-th v-if="CardType == 'Red'">
                ໃບແດງ
              </vs-th>

              <vs-th v-if="GoalType == 'Goal'">
                ຈຳນວນປະຕູ
              </vs-th>
            <vs-th v-if="GoalType == 'Assist'">
              ຈຳນວນ Assist
            </vs-th>

            <vs-th>
              ຊື່ທີມ
            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="index" v-for="(PlayerCard, index) in $vs.getPage(PlayerCards, page, max)" :data="PlayerCard"
                 :is-selected="!!selected.includes(PlayerCard)">
            <vs-td checkbox>
              <vs-checkbox :val="PlayerCard" v-model="selected"/>
            </vs-td>

            <vs-td>
              {{ index + 1 }}
            </vs-td>

            <vs-td>
              {{ PlayerCard.full_name }}
            </vs-td>

            <vs-td>
              {{ PlayerCard.player_number }}
            </vs-td>
            <vs-td v-if="GoalType == 'Goal'">
              {{PlayerCard.score}} ປະຕູ
            </vs-td>
            <vs-td v-if="GoalType == 'Assist'">
              {{PlayerCard.score}} ປະຕູ
            </vs-td>
            <vs-td v-if="CardType =='Yellow'">
              {{ PlayerCard.cards }}
            </vs-td>
            <vs-td v-if="CardType =='Red'">
              {{ PlayerCard.cards }}
            </vs-td>


            <vs-td>
              {{ PlayerCard.team_name }}
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination v-model="page" :length="$vs.getLength(PlayerCards, max)"/>
        </template>
      </vs-table>

      <YellowCardExport v-show="false" ref="CardPdfPrint" :CheckCardType="CardType" :CheckGoalType = "GoalType"></YellowCardExport>
    </div>

  </div>
</template>

<script>
import YellowCardExport from "@/components/Export/YellowCardExport";

export default {
  components: {
    YellowCardExport
  },
  data: () => ({
    page: 1,
    max: 10,
    allCheck: false,
    selected: [],
    ListReport: "",
    PlayerCards: [],
    CardType: {},
    GoalType:{},
  }),
  watch: {
    ListReport() {
      this.delaySelectData();
    }
  },
  methods: {
    delaySelectData() {
      const tournament_id = this.$route.params.tournament_id;
      const request = `report=${this.ListReport || ""}`;
      this.$axios.get(`tournament/${tournament_id}/report-player?${request}`)
          .then((res) => {
            console.log(res)
            setTimeout(() => {
              this.$emit("close");
            }, 100);
            setTimeout(() => {
              this.PlayerCards = res.data[0]['players']
              this.CardType = res.data[0]['card_type']
              this.GoalType = res.data[0]['player_type']
            }, 50);
          }).catch()
    },


    PrintExcel(selected) {
      const ref = this.$refs["CardPdfPrint"];
      if (ref) {
        ref.PrintExcel(selected);
      }
    },

    // FetchData() {
    //   const tournament_id = this.$route.params.tournament_id;
    //   this.$axios.post(`tournament/${tournament_id}/report-yellow`).then(res => {
    //     console.log(res)
    //     setTimeout(() => {
    //       this.$emit('close');
    //     }, 200);
    //     setTimeout(() => {
    //       // this.teams = res.data.data;
    //     }, 100);
    //   }).catch(() => {
    //
    //   });
    // },

  },
  created() {
    // this.FetchData();
    this.delaySelectData();
  }
};
</script>

<style scoped>
.show-select-menu {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 20px;

}

.show-select-menu select {
  font-family: BoonBaan, sans-serif;
}

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

.btn-action .buttons {
  width: 200px;
}

#table-checkbox {
  width: 10px !important;
}
</style>
