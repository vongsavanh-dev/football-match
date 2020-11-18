<template>
  <div>
    <div class="header-title">
      <i class="fas fa-info-circle"></i>
      <span>ບັນທຶກ ຄະແນນ</span>
      <div>
        <span class="has-text-danger" style="font-size: 16px">{{ errorMessage }}</span>
      </div>
    </div>
    <div class="section-content">
      <div class="field">
        <div class="control">
          <label for="" class="label">
            ນັກເຕະຍິງປະຕູ
            <span class="has-text-danger">* {{ errors.first('player_id') }}</span>
            <span class="has-text-danger">
                        {{ server_errors.player_id }}
                    </span>
          </label>
          <div class="select" style="width: 100%">
            <select style="width: 100%" v-model="addteam_score.player_id" name="player_id" v-validate="'required'">
              <option
                      :key="index"
                      v-for="(player, index) in player_team1"
                      :data="player"
                      v-bind:value="player.id"
              >
               <span id="player-number">{{player.player_number }}</span>  {{ player.name }}  {{player.sur_name}}

              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label for="label" class="label">ນັກເຕະ Assist</label>
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
                {{ player.player_number }} {{ player.name }} {{ player.sur_name }}
              </option>
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
          <input type="text" class="input" v-model="addteam_score.time" name="time" v-validate="'required'"
                 placeholder="ປ້ອນເວລາ...">
        </div>
      </div>

      <div class="field btn">
        <div class="control">
          <button class="button is-fullwidth" style="color: #ffff" @click="ValidateForm()"
                  :class="{'is-loading':btnLoading}">
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
} from 'vee-validate'

const dict = {
  custom: {
    player_id: {
      required: '(ກະລຸນາປ້ອນກ່ອນ...)',
    },
    time: {
      required: '(ກະລຸນາປ້ອນກ່ອນ...)',
    },
  }
};
Validator.localize('en', dict);
export default {
  props: ["listplayer_firstTeam"],
  data() {
    return {
      server_errors: {
        player_id: '',
        time: '',
      },
      errorMessage: '',
      btnLoading: false,
      player_team1:{},
      listteam: '',

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
      this.$axios
          .get(`team/${this.listplayer_firstTeam.team_1_id}/player`)
          .then((res) => {
            setTimeout(() => {
              this.player_team1 = res.data.player_lists;
            }, 100);
          })
          .catch(() => {
          });
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
      this.$axios.post(`match/${id}/matchscore`, this.addteam_score).then(res => {
        if (res) {
          setTimeout(() => {
            this.$emit('close');
            this.$emit('success');
            this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 3000);
          }, 300);
        }
      }).catch((e) => {
        if (e && e.response) {
          const message = (e.response.data || {}).error;
          this.errorMessage = message;
        }
      })
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
