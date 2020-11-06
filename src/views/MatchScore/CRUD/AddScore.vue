<template>
  <div>
    <div class="header-title">
      <i class="fas fa-info-circle"></i><span>ບັນທຶກ ຄະແນນ</span>
    </div>
    <div class="section-content">
      <div class="field">
        <div class="control">
          <label for="" class="label">ນັກເຕະຍິງປະຕູ</label>
          <div class="select" style="width: 100%">
            <select style="width: 100%" v-model="addteam_score.player_id">
              <option
                :key="index"
                v-for="(player, index) in player_team1"
                :data="player"
                v-bind:value="player.id"
              >
                {{ player.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label for="" class="label">ນັກເຕະ Assist</label>
          <div class="select" style="width: 100%">
            <select
              style="width: 100%"
              v-model="addteam_score.assist_player_id"
            >
              <option
                :key="index"
                v-for="(player, index) in player_team1"
                :data="player"
                 v-bind:value="player.id"
              >
                {{ player.name }}
              </option>
            </select>
          </div>
        </div>
      </div>


      <div class="field">
        <div class="control">
          <label for="" class="label"> Time </label>
          <input type="text" class="input" v-model="addteam_score.time" name="time">
        </div>
      </div>

      <div class="field btn">
        <div class="control">
          <button class="button is-fullwidth" style="color: #ffff" @click="SaveData()">
            ບັນທຶກ ຂໍ້ມູນນ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import DatePicker from "vue2-datepicker";
// import "vue2-datepicker/index.css";
export default {
  props: ["listplayer_firstTeam"],
  // components: {
  //   DatePicker,
  // },
  data() {
    return {
      player_team1: {},
      listteam:'',

      addteam_score: {
        player_id: '',
        assist_player_id: '',
         time: "",
      },
    };
  },
  methods: {
    //  get player team_1 from team
    getPlayer() {
      // this.player_teams = this.listplayer_firstTeam;
      this.$axios
        .get(`team/${this.listplayer_firstTeam.team_1_id}/player`)
        .then((res) => {
          // console.log(res)
          setTimeout(() => {
            this.player_team1 = res.data.player_lists;
            // console.log(this.player_team1);
          }, 100);
        })
        .catch(() => {});
    },

    SaveData() {
       const id = this.$route.params.match_id;
          this.$axios.post(`match/${id}/matchscore`, this.addteam_score).then(res => {
            // console.log(this.addteam_score)
              if (res) {
                  setTimeout(() => {
                      this.$emit('close');
                      this.$emit('success');
                      this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 3000);
                  }, 300);
              }
          }).catch(error => {
              if (error.response.status == 422) {
                  var obj = error.response.data.errors; // ໃຊ້ການລູບຂໍ້ມູນເພາະວ່າຂໍ້ມູນ errors ທີ່ສົ່ງມາຈາກ Server ນັ້ນເປັນ Array Object
                  for (let [key, value] of Object.entries(obj)) {
                      this.server_errors[key] = value[0];
                  }
              }
          });
      },
  },
  created() {
    this.getPlayer();
  },
};
</script>



<style scopde>
.header-title {
  font-family: BoonBaan;
  color: blue;
  font-size: 22px;
}
.header-title span {
  margin: 10px;
  font-weight: bold;
  font-size: 22px;
}
.field .control label {
  font-size: 18px;
}
label {
  font-family: BoonBaan;
  text-align: left;
  font-weight: bold;
}
.upload-profile {
  margin-right: auto;
  margin-left: auto;
  width: 50%;
}
.upload-profile h2 {
  font-family: BoonBaan;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}
.btn button {
  font-family: BoonBaan;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  background-color: #3380ff;
  color: #ffff;
}
</style>
