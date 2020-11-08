<template>
  <div>
    <div class="header-title">
      <i class="fas fa-info-circle"></i><span>ບັນທຶກ ຂໍ້ມູນການແຂ່ງຂັນ</span>
    </div>
    <div class="section-content" style="margin-top: 40px">
      <div class="field">
        <div class="control">
          <label for="" class="label">
            ເລືອກທີມທີໜື່ງ
            <span class="text-danger">* {{ errors.first('team1') }}</span>
            <span class="text-danger">
                        {{server_errors.team1}}
                    </span>
          </label>
          <div class="select" style="width: 100%">
            <select style="width: 100%" v-model="matchs.team1">
              <option v-bind:value="team.id" :key="index " v-for="(team, index) in teams" :data="team">{{team.team_name}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label for="" class="label">
            ເລືອກທີມທີສອງ
            <span class="text-danger">* {{ errors.first('team2') }}</span>
            <span class="text-danger">
                        {{server_errors.team2}}
                    </span>
          </label>
          <div class="select" style="width: 100%">
            <select style="width: 100%" v-model="matchs.team2">
              <option v-bind:value="team.id" :key="index " v-for="(team, index) in teams" :data="team">{{team.team_name}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label for="" class="label">
            ວັນເວລາແຂ່ງຂັນ
            <span class="text-danger">* {{ errors.first('match_date') }}</span>
            <span class="text-danger">
                        {{server_errors.match_date}}
                    </span>
          </label>
          <DatePicker style="width:100%;"
                      type="datetime"
                      name="match_date"
                      valueType="format"
                      v-model="matchs.match_date"
                      slot="activator" :popup-style="{ top: '100%', left: '15%' }"
                      :append-to-body="false">

          </DatePicker>
        </div>
      </div>

      <!--        <div class="field">-->
      <!--            <div class="control">-->
      <!--                <label for="" class="label">-->
      <!--                    ສະຖານະການແຂ່ງຂັນ-->
      <!--                    <span class="text-danger">* {{ errors.first('status') }}</span>-->
      <!--                    <span class="text-danger">-->
      <!--                        {{server_errors.status}}-->
      <!--                    </span>-->
      <!--                </label>-->
      <!--                <div class="select" style="width: 100%">-->
      <!--                    <select style="width: 100%" v-model="matchs.status">-->
      <!--                        <option v-bind:value="StatusMatch.status" :key="index " v-for="(StatusMatch, index) in StatusMatchs" :data="StatusMatch">-->
      <!--                            {{StatusMatch.name}}-->
      <!--                        </option>-->
      <!--                    </select>-->
      <!--                </div>-->
      <!--            </div>-->
      <!--        </div>-->

      <div class="field btn">
        <div class="control">
          <button class="button is-fullwidth" style="color:#ffff;" @click="ValidateForm()">
            ບັນທຶກ ຂໍ້ມູນການແຂ່ງຂັນ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import {
  Validator
} from 'vee-validate'
const dict = {
  custom: {
    team1: {
      required: '(ກະລຸນາປ້ອນກ່ອນ...)',
    },
    team2: {
      required: '(ກະລຸນາປ້ອນກ່ອນ...)',
    },
    match_date: {
      required: '(ກະລຸນາປ້ອນກ່ອນ...)',
    },
    // status: {
    //     required: '(ກະລຸນາປ້ອນກ່ອນ...)',
    // }
  }
};
Validator.localize('en', dict);
export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      active: false,
      value: "",
      match_date: '',
      teams: [], //get team_name from Table team
      // StatusMatchs: [], //get status from Table match

      server_errors: {
        team_1: '',
        team_2: '',
        match_date: '',
        // status: ''
      },
      matchs: {
        team1: this.value,
        team2: this.value,
        match_date: '',
      },
    };
  },
  methods: {

    // customFormatter(match_date) {
    //     return (match_date).format('MMMM Do YYYY, h:mm:ss a');
    // },

    ValidateForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.SaveData();
        }
      });
    },
    //get team_name form Tale Team
    FetchData() {
      this.$axios.get('team').then(res => {
        setTimeout(() => {
          this.teams = res.data.data;
        }, 100);
      }).catch(() => {

      });
    },

    SaveData() {
      this.$axios.post('match', this.matchs).then(res => {
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

    BtnLoading() {
      return this.$vs.loading({
        target: this.$refs.button,
        scale: '0.6',
        background: 'primary',
        opacity: 1,
        color: '#fff'
      });
    }
  },
  created() {
    this.FetchData();
    // this.FetchStatusMatch();
  }

};
</script>

<style>
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



































<!--<template>-->
<!--<div>-->
<!--    <div class="header-title">-->
<!--        <i class="fas fa-info-circle"></i><span>ບັນທຶກ ຂໍ້ມູນການແຂ່ງຂັນ</span>-->
<!--    </div>-->
<!--    <div class="section-content" style="margin-top: 40px">-->
<!--        <div class="field">-->
<!--            <div class="control">-->
<!--                <label for="" class="label">-->
<!--                    ເລືອກທີມທີໜື່ງ-->
<!--                    <span class="text-danger">* {{ errors.first('team1') }}</span>-->
<!--                    <span class="text-danger">-->
<!--                        {{server_errors.team1}}-->
<!--                    </span>-->
<!--                </label>-->
<!--                <div class="select" style="width: 100%">-->
<!--                    <select style="width: 100%" v-model="matchs.team1">-->
<!--                        <option v-bind:value="team.id" :key="index " v-for="(team, index) in teams" :data="team">{{team.team_name}}</option>-->
<!--                    </select>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--        <div class="field">-->
<!--            <div class="control">-->
<!--                <label for="" class="label">-->
<!--                    ເລືອກທີມທີສອງ-->
<!--                    <span class="text-danger">* {{ errors.first('team2') }}</span>-->
<!--                    <span class="text-danger">-->
<!--                        {{server_errors.team2}}-->
<!--                    </span>-->
<!--                </label>-->
<!--                <div class="select" style="width: 100%">-->
<!--                    <select style="width: 100%" v-model="matchs.team2">-->
<!--                        <option v-bind:value="team.id" :key="index " v-for="(team, index) in teams" :data="team">{{team.team_name}}</option>-->
<!--                    </select>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

<!--        <div class="field">-->
<!--            <div class="control">-->
<!--                <label for="" class="label">-->
<!--                    ວັນເວລາແຂ່ງຂັນ-->
<!--                    <span class="text-danger">* {{ errors.first('match_date') }}</span>-->
<!--                    <span class="text-danger">-->
<!--                        {{server_errors.match_date}}-->
<!--                    </span>-->
<!--                </label>-->
<!--                <DatePicker style="width:100%;"-->
<!--                            type="datetime"-->
<!--                            name="match_date"-->
<!--                            valueType="format"-->
<!--                            v-model="matchs.match_date"-->
<!--                            slot="activator" :popup-style="{ top: '100%', left: '15%' }"-->
<!--                            :append-to-body="false">-->

<!--                </DatePicker>-->
<!--            </div>-->
<!--        </div>-->

<!--&lt;!&ndash;        <div class="field">&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="control">&ndash;&gt;-->
<!--&lt;!&ndash;                <label for="" class="label">&ndash;&gt;-->
<!--&lt;!&ndash;                    ສະຖານະການແຂ່ງຂັນ&ndash;&gt;-->
<!--&lt;!&ndash;                    <span class="text-danger">* {{ errors.first('status') }}</span>&ndash;&gt;-->
<!--&lt;!&ndash;                    <span class="text-danger">&ndash;&gt;-->
<!--&lt;!&ndash;                        {{server_errors.status}}&ndash;&gt;-->
<!--&lt;!&ndash;                    </span>&ndash;&gt;-->
<!--&lt;!&ndash;                </label>&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="select" style="width: 100%">&ndash;&gt;-->
<!--&lt;!&ndash;                    <select style="width: 100%" v-model="matchs.status">&ndash;&gt;-->
<!--&lt;!&ndash;                        <option v-bind:value="StatusMatch.status" :key="index " v-for="(StatusMatch, index) in StatusMatchs" :data="StatusMatch">&ndash;&gt;-->
<!--&lt;!&ndash;                            {{StatusMatch.name}}&ndash;&gt;-->
<!--&lt;!&ndash;                        </option>&ndash;&gt;-->
<!--&lt;!&ndash;                    </select>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->

<!--        <div class="field btn">-->
<!--            <div class="control">-->
<!--                <button class="button is-fullwidth" style="color:#ffff;" @click="ValidateForm()">-->
<!--                    ບັນທຶກ ຂໍ້ມູນການແຂ່ງຂັນ-->
<!--                </button>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import DatePicker from "vue2-datepicker";-->
<!--import "vue2-datepicker/index.css";-->
<!--import {-->
<!--    Validator-->
<!--} from 'vee-validate'-->
<!--const dict = {-->
<!--    custom: {-->
<!--        team1: {-->
<!--            required: '(ກະລຸນາປ້ອນກ່ອນ...)',-->
<!--        },-->
<!--        team2: {-->
<!--            required: '(ກະລຸນາປ້ອນກ່ອນ...)',-->
<!--        },-->
<!--        match_date: {-->
<!--            required: '(ກະລຸນາປ້ອນກ່ອນ...)',-->
<!--        },-->
<!--        // status: {-->
<!--        //     required: '(ກະລຸນາປ້ອນກ່ອນ...)',-->
<!--        // }-->
<!--    }-->
<!--};-->
<!--Validator.localize('en', dict);-->
<!--export default {-->
<!--    components: {-->
<!--        DatePicker,-->
<!--    },-->
<!--    data() {-->
<!--        return {-->
<!--            active: false,-->
<!--            value: "",-->
<!--            match_date: '',-->
<!--            teams: [], //get team_name from Table team-->
<!--            // StatusMatchs: [], //get status from Table match-->

<!--            server_errors: {-->
<!--                team_1: '',-->
<!--                team_2: '',-->
<!--                match_date: '',-->
<!--                // status: ''-->
<!--            },-->
<!--            matchs: {-->
<!--                team1: this.value,-->
<!--                team2: this.value,-->
<!--                match_date: '',-->
<!--            },-->
<!--        };-->
<!--    },-->
<!--    methods: {-->

<!--        // customFormatter(match_date) {-->
<!--        //     return (match_date).format('MMMM Do YYYY, h:mm:ss a');-->
<!--        // },-->

<!--        ValidateForm() {-->
<!--            this.$validator.validateAll().then((result) => {-->
<!--                if (result) {-->
<!--                    this.SaveData();-->
<!--                }-->
<!--            });-->
<!--        },-->
<!--        //get team_name form Tale Team-->
<!--        FetchData() {-->
<!--            this.$axios.get('team').then(res => {-->
<!--                setTimeout(() => {-->
<!--                    this.teams = res.data.data;-->
<!--                }, 100);-->
<!--            }).catch(() => {-->

<!--            });-->
<!--        },-->
<!--        // get status from Table match-->
<!--        // FetchStatusMatch() {-->
<!--        //     /*   this.isLoading = true; */-->
<!--        //     this.$axios.get('match').then(res => {-->
<!--        //         setTimeout(() => {-->
<!--        //             this.StatusMatchs = res.data.statsus_list;-->
<!--        //         }, 100);-->
<!--        //     }).catch(() => {-->
<!--        //-->
<!--        //     });-->
<!--        // },-->

<!--        SaveData() {-->
<!--            this.$axios.post('match', this.matchs).then(res => {-->
<!--              console.log(res)-->
<!--                if (res) {-->
<!--                    setTimeout(() => {-->
<!--                        this.$emit('close');-->
<!--                        this.$emit('success');-->
<!--                        this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 3000);-->
<!--                    }, 300);-->
<!--                }-->
<!--            }).catch(error => {-->
<!--                if (error.response.status == 422) {-->
<!--                    var obj = error.response.data.errors; // ໃຊ້ການລູບຂໍ້ມູນເພາະວ່າຂໍ້ມູນ errors ທີ່ສົ່ງມາຈາກ Server ນັ້ນເປັນ Array Object-->
<!--                    for (let [key, value] of Object.entries(obj)) {-->
<!--                        this.server_errors[key] = value[0];-->
<!--                    }-->
<!--                }-->
<!--            });-->
<!--        },-->

<!--        BtnLoading() {-->
<!--            return this.$vs.loading({-->
<!--                target: this.$refs.button,-->
<!--                scale: '0.6',-->
<!--                background: 'primary',-->
<!--                opacity: 1,-->
<!--                color: '#fff'-->
<!--            });-->
<!--        }-->
<!--    },-->
<!--    created() {-->
<!--        this.FetchData();-->
<!--        // this.FetchStatusMatch();-->
<!--    }-->

<!--};-->
<!--</script>-->

<!--<style>-->
<!--.header-title {-->
<!--    font-family: BoonBaan;-->
<!--    color: blue;-->
<!--    font-size: 22px;-->
<!--}-->

<!--.header-title span {-->
<!--    margin: 10px;-->
<!--    font-weight: bold;-->
<!--    font-size: 22px;-->
<!--}-->

<!--.field .control label {-->
<!--    font-size: 18px;-->
<!--}-->

<!--label {-->
<!--    font-family: BoonBaan;-->
<!--    text-align: left;-->
<!--    font-weight: bold;-->
<!--}-->

<!--.upload-profile {-->
<!--    margin-right: auto;-->
<!--    margin-left: auto;-->
<!--    width: 50%;-->
<!--}-->

<!--.upload-profile h2 {-->
<!--    font-family: BoonBaan;-->
<!--    margin-top: 10px;-->
<!--    margin-bottom: 10px;-->
<!--    font-size: 18px;-->
<!--    font-weight: bold;-->
<!--}-->

<!--.btn button {-->
<!--    font-family: BoonBaan;-->
<!--    margin-top: 20px;-->
<!--    font-size: 18px;-->
<!--    font-weight: bold;-->
<!--    background-color: #3380ff;-->
<!--    color: #ffff;-->
<!--}-->
<!--</style>-->
