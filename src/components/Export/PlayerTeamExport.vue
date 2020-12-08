<template>
  <div id="target">
    <table>
      <tr>
        <th>ລຳດັບ</th>
        <th>ຊື່ນັກເຕະ</th>
        <th>ນາມສະກຸນ</th>
        <th>ເບີເສື້ອ</th>
        <th>ຕຳແໜ່ງ</th>
        <th>ປະຕູ</th>
        <th>assist</th>
        <th>ໃບແດງ</th>
        <th>ໃບເຫຼືອງ</th>
        <th>ຊື່ທີມ</th>
      </tr>
      <tr :key="index" :data="playerteam" v-for="(playerteam, index) in value">
        <td>{{ index + 1 }}</td>
        <td>{{playerteam.name}}</td>
        <td>{{ playerteam.sur_name }}</td>
        <td>{{ playerteam.player_number }}</td>
        <td>{{ playerteam.player_position }}</td>
        <td> {{ playerteam.goal_score }}</td>
        <td>{{ playerteam.assist_score }}</td>
        <td>{{ playerteam.red_card }}</td>
        <td>{{ playerteam.yellow_card }}</td>
        <td>{{playerteam.team_name}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import XLSX from 'xlsx';
export  default {
  data(){
    return{
      value:[],
      timer:null,
    }
  },
  methods:{
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
        XLSX.writeFile(workbook, "ລາຍງານຂໍ້ມູນນັກເຕະ.xlsx");
      }, 300);
    },
  },
  created() {

  }
}
</script>
