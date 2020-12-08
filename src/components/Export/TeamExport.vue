<template>
    <div id="target">
      <table>
        <tr>
          <th>ລຳດັບ</th>
          <th>ຊື່ທີມ</th>
          <th>ຊື່ຫຍໍ້</th>
        </tr>
        <tr :key="index" :data="team" v-for="(team, index) in value">
          <td>{{ index + 1 }}</td>
          <td>{{team.team_name}}</td>
         <td>{{team.initial_name}}</td>
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
        XLSX.writeFile(workbook, "ລາຍງານຂໍ້ມູນທີມ.xlsx");
      }, 300);
    },
  },
  created() {

  }
}
</script>
