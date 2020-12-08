<template>
  <div id="target">
    <table>
      <tr>
        <th>ລຳດັບ</th>
        <th>ຊື່ ແລະ ນາມສະກຸນ</th>
        <th>ເບີເສື້ອ</th>
        <div v-if="CheckCardType == 'Yellow'">
          <th>ໃບເຫຼືອງ</th>
        </div>
        <div v-if="CheckCardType == 'Red'">
          <th>ໃບແດງ</th>
        </div>

        <div v-if="CheckGoalType == 'Goal'">
          <th>ປະຕູ</th>
        </div>

        <div v-if="CheckGoalType == 'Assist'">
          <th>Assist</th>
        </div>

        <th>ທີມ</th>
      </tr>
      <tr :key="index" :data="player" v-for="(player, index) in value">
        <td>{{ index + 1 }}</td>
        <td>{{ player.full_name }}</td>
        <td>{{ player.player_number }}</td>
        <td v-if="CheckCardType == 'Yellow'">{{ player.cards }}</td>
        <td v-if="CheckCardType == 'Red'">{{ player.cards }}</td>
        <td v-if="CheckGoalType == 'Goal'">{{player.score}}</td>
        <td v-if="CheckGoalType == 'Assist'">{{player.score}}</td>
        <td>{{ player.team_name }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import XLSX from 'xlsx';

export default {
  data() {
    return {
      value: [],
      timer: null,
    }
  },
  props:['CheckCardType','CheckGoalType'],
  methods: {
    PrintExcel(selected) {
      this.value = selected;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const ws1 = XLSX.utils.table_to_sheet(
            document.getElementById("target"),
            {raw: true}
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, ws1);
        XLSX.writeFile(workbook, "ລາຍງານຂໍ້ມູນ.xlsx");
      }, 300);
    },
  },
  created() {

  }
}
</script>
