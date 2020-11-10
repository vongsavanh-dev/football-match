<template>
  <div>
    <div class="header-title">
      <i class="fas fa-info-circle"></i><span>ບັນທຶກຂໍ້ມູນ Card</span>
    </div>
    <div class="section-content">
      <div class="field">
        <div class="control">
          <label for="" class="label">
            ນັກເຕະ
            <span class="has-text-danger">* {{ errors.first('player_id') }}</span>
            <span class="has-text-danger">
                        {{server_errors.player_id}}
                    </span>
          </label>
          <div class="select" style="width: 100%">
            <select style="width: 100%" v-model="selectedPlayTeam1.id" name="player_id" v-validate="'required'" >
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
          <label for="" class="label">Card</label>
          <div class="select" style="width: 100%">
            <select class="input" v-model="AddCard_firstTeam.card_type">
              <option value="Yellow">Yellow</option>
              <option value="Red">Red</option>
            </select>
          </div>
        </div>
      </div>


      <div class="field">
        <div class="control">
          <label for="" class="label">
            ເວລາ
            <span class="has-text-danger"
            >* {{ errors.first('time') }}</span
            >
            <span class="has-text-danger">
              {{ server_errors.time }}
            </span>
          </label>
          <input type="text" class="input" v-model="AddCard_firstTeam.time" name="time"  v-validate="'required|numeric'"
                 placeholder="ປ້ອນເວລາ...">
        </div>
      </div>

      <div class="field btn">
        <div class="control">
          <button class="button is-fullwidth" style="color: #ffff" @click="ValidateForm()"
                  :class="{'is-loading': btnLoading}"
          >
            ບັນທຶກຂໍ້ມູນ Card
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Validator
} from 'vee-validate'
const dict = {
  custom: {
    player_id: {
      required: '(ກະລຸນາປ້ອນກ່ອນ...)',
    },
    time: {
      required: '(ກະລຸນາປ້ອນກ່ອນ...)',numeric: '(ປ້ອນສະເພາະຕົວເລກ...)',
    },
  }
};
Validator.localize('en', dict);
export default {
  props: ["Card_firstTeam"],

  data() {
    return {
      btnLoading:false,
      server_errors: {
        player_id: '',
        time: '',
      },
      player_team1: [],
      selectedPlayTeam1: {},
      listteam:'',

      AddCard_firstTeam: {
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
          .get(`team/${this.Card_firstTeam.team_1_id}/player`)
          .then((res) => {
            setTimeout(() => {
              this.player_team1 = res.data.player_lists;
              this.selectedPlayTeam1 = {...this.player_team1[0]};
            }, 100);
          })
          .catch(() => {});
    },
    ValidateForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.btnLoading = true;
          this.SaveData();
        }
      });
    },
    SaveData() {
      const id = this.$route.params.match_id;
      this.AddCard_firstTeam.player_id = this.selectedPlayTeam1.id;
      this.$axios.post(`match/${id}/matchCardDetail`, this.AddCard_firstTeam).then(res => {
        console.log(res)
        if (res) {
          setTimeout(() => {
            this.btnLoading = false;
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
