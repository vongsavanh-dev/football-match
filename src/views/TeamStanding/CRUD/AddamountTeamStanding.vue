<template>
  <div>
    <div class="header-title">
      <i class="fas fa-info-circle"></i>
      <span>ບັນທຶກ ຂໍ້ມູນທີມຜ່ານເຂົ້າຮອບ</span>
     <div class="message-error">
       <span class="has-text-danger" style="font-size: 18px;">{{errorMessage}}</span>
     </div>

    </div>
    <div class="section-content">
      <div class="filed">
        <div class="control">
          <label for="label" class="label">
            ຈຳນວນທິມຜ່ານເຂົ້າຮອບ
            <span class="has-text-danger">* {{ errors.first('amount_teams') }}</span>
            <span class="has-text-danger">
                        {{server_errors.amount_teams}}
                    </span>
          </label>
          <input type="text" class="input" name="amount_teams"
                 v-model="Add_Teams.teams"
                 v-validate="'required'" />
        </div>
      </div>
    </div>
    <div class="field btn">
      <div class="control">
        <button class="button is-fullwidth" style="color:#ffff"
                :class="{'is-loading':btnLoading}"
                @click="ValidateForm()">
          ບັນທຶກ ຂໍ້ມູນ
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
    amount_teams: {
      required: '(ກະລຸນາປ້ອນກ່ອນ...)',
    },

  }
};
Validator.localize('en', dict);
export default {
  data(){
    return{
      btnLoading:false,
      server_errors: {
        amount_teams: '',

      },
      errorMessage:'',
      Add_Teams:{
        teams:''
      }
    }
  },
  methods:{
    ValidateForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.btnLoading = true
          this.SaveData();
        }
      });
    },
    SaveData() {
      const id = this.$route.params.tournament_id;
      this.$axios.post(`tournament/${id}/standing`, this.Add_Teams).then(res => {
        console.log(res)
        if (res) {
          setTimeout(() => {
            this.$emit('close');
            this.$emit('success');
            this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 3000);
          }, 300);
        }
      }).catch((e) =>{
        if(e && e.response){
          const message = (e.response.data || {}).error;
          this.errorMessage = message
        }

      })
    },

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




.file-cta .file-icon {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  padding-left: 60px;
}

.btn button {
  font-family: BoonBaan;
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
