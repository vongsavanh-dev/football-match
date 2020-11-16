<template>
  <div>
    <div class="header-title">
      <i class="fas fa-info-circle"></i><span>ບັນທຶກ ຂໍ້ມູນ</span>
    </div>
    <div class="section-content">
      <div class="field">
        <div class="control">
          <label for="" class="label">
            ຊື່ທົວນາເມັ້ນ
            <span class="has-text-danger"
            >* {{ errors.first('tournament_name') }}</span
            >
            <span class="has-text-danger">
              {{ server_errors.tournament_name }}
            </span>
          </label>
          <div class="select" style="width: 100%">
            <select style="width: 100%" name="tournament_name" v-model="standingTeamAmount.tournament_id"  v-validate="'required'" >
              <option
                  v-for="(tournament, index) in TournamentName"
                  :key="index"
                  :value="tournament.id"
              >
                {{ tournament.name }}
              </option>
            </select>
          </div>
        </div>
      </div>


      <div class="filed">
        <div class="control">
          <label for="label" class="label">
            ຈຳນວນທີມທີ່ເຂົ້າຮອບ
            <span class="has-text-danger">* {{ errors.first('amount_team') }}</span>
            <span class="has-text-danger">
              {{ server_errors.amount_team }}
            </span>
          </label>
          <input type="text" class="input" name="amount_team" v-model="standingTeamAmount.teams"
                 v-validate="'required|numeric'"/>
        </div>
      </div>
    </div>
    <div class="field btn">
      <div class="control">
        <button class="button is-fullwidth"
                :class="{'is-loading':btnLoading}"
                style="color:#ffff" @click="ValidateForm()">
          ບັນທຶກ ຂໍ້ມູນທີມ
        </button>
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
    tournament_name: {
      required: '(ກະລຸນາປ້ອນກ່ອນ...)',
    },
    amount_team: {
      required: '(ກະລຸນາປ້ອນກ່ອນ...)', numeric: '(ປ້ອນສະເພາະຕົວເລກ...)',
    },
  }
};
Validator.localize('en', dict);
export default {
  data() {
    return {
      btnLoading:false,
      server_errors: {
        tournament_name: '',
        amount_team: '',

      },
      errorMessage:'',
      TournamentName: [],
      standingTeamAmount:{
        tournament_id:'',
        teams:'',

      }
    }
  },
  methods: {
    ValidateForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.btnLoading = true
          this.SaveData();
        }
      });
    },
    getTournament() {
      this.$axios.get(`tournament`).then(res => {
        setTimeout(() => {
          this.TournamentName = res.data.data
        }, 100);
      }).catch(() => {

      });
    },

    SaveData() {
      const id = this.standingTeamAmount.tournament_id;
      this.$axios.post(`tournament/${id}/standing`, this.standingTeamAmount).then(res => {
        if (res) {
          setTimeout(() => {
            this.$emit('close');
            this.$emit('success');
            this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 3000);
          }, 300);
        }
      }).catch((e)=>{
        if(e && e.response){
          const message  = (e.response.data || {}).error;
          this.errorMessage = message;
        }
      })
    },

  },
  created() {
    this.getTournament();
  }


}
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
  width: 100%;
}

.upload-profile h2 {
  font-family: BoonBaan;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
}

.file-cta {
  width: 100%;
}

.file-cta .file-icon {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  padding-left: 60px;
}

.btn button {
  font-family: BoonBaan, sans-serif;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  background-color: #3380ff;
  color: #ffff;
}

label {
  font-family: BoonBaan;
  text-align: left;
  font-weight: bold;
}

</style>
