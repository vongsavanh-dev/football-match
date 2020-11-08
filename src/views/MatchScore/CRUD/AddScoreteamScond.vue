<template>
  <div>
    <div class="header-title">
      <i class="fas fa-info-circle"></i><span>ບັນທຶກ ຄະແນນ</span>
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
            <select style="width: 100%" v-model="addscore_scondteam.player_id" name="player_id" v-validate="'required'" placeholder="ປ້ອນນັກເຕະ..." >
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
          <label for="" class="label">ນັກເຕະ Assist</label>
          <div class="select" style="width: 100%">
            <select
              style="width: 100%"
              v-model="addscore_scondteam.assist_player_id"
            >
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
          <label for="" class="label">
            ເວລາ
            <span class="has-text-danger">* {{ errors.first('time') }}</span>
            <span class="has-text-danger">
                        {{server_errors.time}}
            </span>
          </label>
          <input
            type="text"
            class="input"
            v-model="addscore_scondteam.time"
            name="time"
            v-validate="'required|numeric'"
            placeholder="ປ້ອນເວລາ..."

          />
          <!-- <DatePicker
            style="width: 100%"
            type="time"
            name="match_score"
            v-model="addteam_score.time_score"
            slot="activator"
            :popup-style="{ top: '100%', left: '15%' }"
            :append-to-body="false"
          >
          </DatePicker> -->
        </div>
      </div>

      <div class="field btn">
        <div class="control">
          <button
            class="button is-fullwidth"
            style="color: #ffff"
            @click="ValidateForm()"
          >
            ບັນທຶກ ຂໍ້ມູນຄະແນນ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Validator
} from 'vee-validate';

const dict = {
  custom: {

    player_id: {
      required: '(ກະລຸນາປ້ອນກ່ອນ...)',
    },
    time: {
      required: '(ກະລຸນາປ້ອນກ່ອນ...)', numeric: '(ປ້ອນສະເພາະຕົວເລກ...)',
    },
  }
};
Validator.localize('en', dict);

export default {
  props: ["listplayer_scondTeam"],
  data() {
    return {
      server_errors: {
        player_id: "",
        time: "",

      },
      player_team2: {},
      addscore_scondteam: {
        player_id: "",
        assist_player_id: "",
        time: "",
      },
    };
  },
  methods: {

    //  get player team_1 from team
    getPlayerSecondTeam() {
      // this.player_team = this.listplayer_scondTeam;
      this.$axios
        .get(`team/${this.listplayer_scondTeam.team_2_id}/player`)
        .then((res) => {
          setTimeout(() => {
            this.player_team2 = res.data.player_lists;
          }, 100);
        })
        .catch(() => {});
    },

    ValidateForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.SaveData();
        }
      });
    },

    SaveData() {
      const id = this.$route.params.match_id;
      this.$axios
        .post(`match/${id}/matchscore`, this.addscore_scondteam)
        .then((res) => {
          // console.log(this.addteam_score)
          if (res) {
            setTimeout(() => {
              this.$emit("close");
              this.$emit("success");
              this.$notification.OpenNotification_AddItem_OnSuccess(
                "top-right",
                "primary",
                3000
              );
            }, 300);
          }
        })
        .catch((error) => {
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
    this.getPlayerSecondTeam();
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
