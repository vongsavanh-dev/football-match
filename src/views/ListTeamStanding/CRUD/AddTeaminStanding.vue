<template>
  <div class="center con-selects">
    <div class="field">
      <div class="header-title" >
        <i class="fas fa-info-circle"></i>
        <span>
        ບັນທຶກ ຂໍ້ມູນ
      </span>
      </div>
      <label for="lable" class="label" style="margin-top: 20px;">
        ເລືອກທີມເຂົ້າຮອບ
        <span class="has-text-danger" style="font-size: 18px;">* {{errorMessage}}</span>
      </label>
      <vs-select
          filter
          multiple
          placeholder="ເລືອກທີມ"
          v-model="selectedTeams"

      >
        <vs-option v-for="(team, idx) in list_teams" :key="idx"
                   :label="team.team_name" :value="team.team_id">
          {{ team.team_name }}
        </vs-option>
      </vs-select>

    </div>
    <vs-button style="width:100%;font-size: 20px;" @click="SaveData()">
      ບັນທຶກຂໍ້ມູນທີມ
    </vs-button>
  </div>
</template>
<script>

import {
  Validator
} from 'vee-validate'
const dict = {
  custom: {

  }
};
Validator.localize('en', dict);
export default {
  props: ['list_teams'],
  data: () => ({
    server_errors: {
      errorMessage: '',
    },
    errorMessage:'',
    selectedTeams: [],
    team_id: [],
  }),
  methods: {
    SaveData() {
      const payload = {
        team_id: this.selectedTeams
      };
      const tournament_id = this.$route.params.tournament_id;
      const id = this.$route.params.standing_id;
      this.$axios.post(`tournament/${tournament_id}/standing/${id}`, payload
      ).then(res => {
        if (res) {
          setTimeout(() => {
            this.$emit('close');
            this.$emit('success');
            this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 3000);
          }, 300);
        }
      }).catch((e) => {
         if(e && e.response) {
           const message = (e.response.data || {}).message;
         //      if (message == 'Standing teams can not be more than 2'){
         //   this.errorMessage = 'ທີມຕ້ອງບໍ່ເກີນ'
         // }
           this.errorMessage = message

           // console.log(this.errorMessage)
         }
      });
    }
  },
  created() {

  }
}


</script>
<style scoped>
.header-title {
  font-family: BoonBaan, serif;
  color: blue;
  font-size: 22px;
  text-align: center;
}

.header-title span {
  margin: 10px;
  font-weight: bold;
  font-size: 22px;
}

</style>


















