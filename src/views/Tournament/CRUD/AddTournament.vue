<template>
    <div>
        <div class="header-title">
            <i class="fas fa-info-circle"></i><span>ບັນທຶກ ຂໍ້ມູນທົວນາເມັ້ນ</span>
        </div>
        <div class="section-content">
            <div class="filed">
                <div class="control">
                    <label for="label" class="label">
                        ຊື່ທົວນາເມັ້ນ
                        <span class="has-text-danger">* {{ errors.first('tournament_name') }}</span>
                        <span class="has-text-danger">
                        {{server_errors.tournament_name}}
                    </span>
                    </label>
                    <input type="text" class="input" name="tournament_name"
                           v-model="Tournament.name"
                           v-validate="'required'"
                           placeholder="ຊື່ທົວນາເມັ້ນ..."
                    />
                </div>
            </div>
            <div class="filed">
                <div class="control">
                    <label for="label" class="label">
                        ຈຳນວນນັດທີ່ເຕະ
                        <span class="has-text-danger">* {{ errors.first('amount_matchs') }}</span>
                        <span class="has-text-danger">
                        {{server_errors.amount_matchs}}
                    </span>
                    </label>
                    <input type="text" class="input" name="amount_matchs"
                           v-model="Tournament.matches"
                           v-validate="'required|numeric'"
                           placeholder="ຈຳນວນນັດ..."
                    />
                </div>
            </div>
            <div class="filed">
                <div class="control">
                    <label for="label" class="label">
                        ຈຳນວນມື້ທັງໝົດ
                        <span class="has-text-danger">* {{ errors.first('amount_days') }}</span>
                        <span class="has-text-danger">
                        {{server_errors.amount_days}}
                    </span>
                    </label>
                    <input type="text" class="input" name="amount_days"
                           v-model="Tournament.days"
                           v-validate="'required|numeric'"  placeholder="ຈຳນວນມື້..." />
                </div>
            </div>
        </div>
            <div class="field btn">
                <div class="control">
                    <button class="button is-fullwidth" style="color:#ffff" @click="ValidateForm()">
                      ບັນທຶກ ຂໍ້ມູນທົວນາເມັ້ນ
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
            amount_matchs: {
                required: '(ກະລຸນາປ້ອນກ່ອນ...)',numeric: '(ປ້ອນສະເພາະຕົວເລກ...)',
            },
            amount_days: {
                required: '(ກະລຸນາປ້ອນກ່ອນ...)',numeric: '(ປ້ອນສະເພາະຕົວເລກ...)',
            },

        }
    };
    Validator.localize('en', dict);
    export default {
data(){
    return{
        server_errors: {
            tournament_name: '',
            amount_matchs:'',
            amount_days:'',

        },
        Tournament:{
            name:'',
            matches:'',
            days:'',
        }
    }
},
methods:{
    ValidateForm() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                   this.SaveData();
                }
          });
    },
    SaveData() {
        this.$axios.post('tournament', this.Tournament).then(res => {
            console.log(res)
            if (res) {
                setTimeout(() => {
                    this.$emit('close');
                    this.$emit('success');
                    this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 3000);
                }, 300);
            }
        }).catch({

        });
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
