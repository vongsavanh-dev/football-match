<template>
  <div>
    <div class="header-title">
      <i class="fas fa-info-circle"></i><span>Card</span>
    </div>
    <div class="section-content">
      <div class="field">
        <div class="control">
          <label for="" class="label">ນັກເຕະ</label>
          <div class="select" style="width: 100%">
            <select style="width: 100%" v-model="AddCard_secondTeam.player_id">
              <option
                  :key="index"
                  v-for="(player, index) in player_team2"
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
          <label for="" class="label">Card</label>
          <div class="select" style="width: 100%">
            <select class="input" v-model="AddCard_secondTeam.card_type">
              <option value="1">Yellow</option>
              <option value="2">Red</option>
            </select>
          </div>
        </div>
      </div>


      <div class="field">
        <div class="control">
          <label for="" class="label"> Time </label>
          <input type="text" class="input" v-model="AddCard_secondTeam.time" name="time">
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
  props: ["Card_secondTeam"],
  // components: {
  //   DatePicker,
  // },
  data() {
    return {
      player_team2: {},
      listteam:'',

      AddCard_secondTeam: {
        player_id: '',
        card_type: '',
        time: "",
      },
    };
  },
  methods: {


    //  get player team_1 from team
    getPlayer() {
      // this.player_teams = this.listplayer_firstTeam;
      this.$axios
          .get(`team/${this.Card_secondTeam.team_2_id}/player`)
          .then((res) => {
            setTimeout(() => {
              this.player_team2 = res.data.player_lists;
            }, 100);
          })
          .catch(() => {});
    },

    SaveData() {
      const id = this.$route.params.match_id;
      this.$axios.post(`match/${id}/matchCardDetail`, this.AddCard_secondTeam).then(res => {
        console.log(res)
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



<style scoped>
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
