<template>
<div>
    <div class="header-title">
        <i class="fas fa-info-circle"></i><span>ອັບເດດ ຂໍ້ມູນການແຂ່ງຂັນ</span>
    </div>
    <div class="section-content" style="margin-top: 40px">
        <div class="field">
            <div class="control">
                <label for="" class="label">
                    ເລືອກທີມທີໜື່ງ
                    <span class="has-text-danger">* {{ errors.first('team_1') }}</span>
                    <span class="has-text-danger">
                        {{server_errors.team_1}}
                    </span>
                </label>
                <div class="select" style="width: 100%">
                    <select style="width: 100%" v-model="listMatch.team_1_id" name="team_1">
                        <option v-for="(listMatchs,index) in teams" :key="index" :value="listMatchs.id">
                            {{listMatchs.team_name}}
                        </option>

                    </select>
                </div>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label for="" class="label">
                    ເລືອກທີມທີສອງ
                    <span class="has-text-danger">* {{ errors.first('team_2') }}</span>
                    <span class="has-text-danger">
                        {{server_errors.team_2}}
                    </span>
                </label>
                <div class="select" style="width: 100%">
                    <select style="width: 100%" v-model="listMatch.team_2_id" name="team_2">
                        <option v-for="(listMatchs,index) in teams" :key="index" :value="listMatchs.id">
                            {{listMatchs.team_name}}
                        </option>

                    </select>
                </div>
            </div>
        </div>

        <div class="field">
            <div class="control">
                <label for="" class="label">
                    ວັນເວລາແຂ່ງຂັນ
                     <span class="has-text-danger">* {{ errors.first('match_date') }}</span>
                     <span class="has-text-danger">
                        {{server_errors.match_date}}
                    </span>
                    </label>
                <DatePicker  name="match_date"  style="width:100%;" type="datetime" v-model="time1" valueType="format" slot="activator" :popup-style="{ top: '100%', left:'15%'}" :append-to-body="false"></DatePicker>
            </div>
        </div>

        <div class="field">
            <div class="control">
                <label for="" class="label">
                    ສະຖານະການແຂ່ງຂັນ
                     <span class="has-text-danger">* {{ errors.first('status') }}</span>
                     <span class="has-text-danger">
                        {{server_errors.status}}
                    </span>
                </label>
                <div class="select" style="width: 100%">
                    <select style="width: 100%" v-model="listMatch.status" name="status">
                        <option v-for="(statuslists, index) in statuslist" :key="index" :value="statuslists.status">
                            {{statuslists.status}}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="field btn">
            <div class="control">
                <button class="button is-fullwidth" style="color:#ffff;" @click="ValidateForm()">
                    ອັບເດດ ຂໍ້ມູນການແຂ່ງຂັນ
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
} from 'vee-validate';


const dict = {
    custom: {
        team_1: {
            required: '(ກະລຸນາປ້ອນກ່ອນ...)',
        },
        team_2: {
            required: '(ກະລຸນາປ້ອນກ່ອນ...)',
        },
        match_date: {
            required: '(ກະລຸນາປ້ອນກ່ອນ...)',
        },
        status: {
            required: '(ກະລຸນາປ້ອນກ່ອນ...)',
        },
    }
};

Validator.localize('en', dict);

export default {
    components: {
        DatePicker
    },
    props: [
        'listMatch',
    ],
    data() {
        return {
            value: "",
            time1: '',
            teams: '',
            statuslist:[],
            status:'',

    server_errors: {
                     team_1: '',
                     team_2: '',
                     match_date: '',
                     status: '',

         },
        };
    },

    methods: {
        FetchMatch() {
            this.$axios.get('team').then(res => {
                setTimeout(() => {
                    this.teams = res.data.data;
                }, 100);
            }).catch(() => {

            });
        },

         //get status_list form match
          FetchStatusList() {
            this.$axios.get('match').then(res => {
                setTimeout(() => {
                    this.statuslist = res.data.statsus_list;
                }, 100);
            }).catch(() => {
            });
        },

        ValidateForm() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.UpdateData();
                }
            });
        },

          UpdateData() {
            let formData = new FormData();
            formData.append('team1', this.listMatch.team_1_id);
            formData.append('team2', this.listMatch.team_2_id);
            formData.append('match_date', this.listMatch.match_date);
            formData.append('status',this.listMatch.status);
            console.log(this.status)
            // if (this.file) {
            //     formData.append('logo', this.file);
            // }
            formData.append('_method', 'PUT');
            this.$axios.post('match/' + this.listMatch.id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then(res => {
                if (res) {
                    setTimeout(() => {
                        this.$emit('close');
                        this.$emit('success');
                        this.$notification.OpenNotification_EditItem_OnSuccess('top-right', 'primary', 3000, );
                    }, 500);
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
        this.FetchMatch();
        this.FetchStatusList();
         this.time1 =this.listMatch.match_date;
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
