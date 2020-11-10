<template>
    <div>
        <div class="header-title">
            <i class="fas fa-info-circle"></i><span>ອັບເດດ ຂໍ້ມູນທົວນາເມັ້ນ</span>
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
                           v-model="EditTournament.name"

                           v-validate="'required'" />
                </div>
            </div>


            <div class="filed">
                <div class="control">
                    <label for="label" class="label">
                        ຈຳນວນນັດທີ່ເຕະ
                        <span class="has-text-danger">* {{ errors.first('amount_matches') }}</span>
                        <span class="has-text-danger">
                        {{server_errors.amount_matches}}
                    </span>
                    </label>
                    <input type="text" class="input" name="amount_matches"
                           v-model="EditTournament.matches"

                           v-validate="'required|numeric'" />
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
                           v-model="EditTournament.days"

                           v-validate="'required|numeric'" />
                </div>
            </div>
        </div>
        <div class="field btn">
            <div class="control">
                <button class="button is-fullwidth" style="color:#ffff" @click="ValidateForm()">
                  ອັບເດດ ຂໍ້ມູນທົວນາເມັ້ນ
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
            amount_matches: {
                required: '(ກະລຸນາປ້ອນກ່ອນ...)',numeric: '(ປ້ອນສະເພາະຕົວເລກ...)',
            amount_days: {
                required: '(ກະລຸນາປ້ອນກ່ອນ...)',numeric: '(ປ້ອນສະເພາະຕົວເລກ...)',
            },

        }
    }
    }
    Validator.localize('en', dict);
    export default {
        props:['EditTournament'],
        data(){
            return{
                name:'',
                teams:'',
                server_errors: {
                    tournament_name: '',
                    amount_mathces:'',
                    amount_days:'',
                },
            }
        },
        methods:{
            ValidateForm() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.EditData();
                    }
                });
            },
            EditData() {
                this.$axios.put(`tournament/${this.EditTournament.id}`,this.EditTournament).then(res => {
                    if (res) {
                        setTimeout(() => {
                            this.$emit('close');
                            this.$emit('success');
                            this.$notification.OpenNotification_EditItem_OnSuccess('top-right', 'primary', 3000);
                        }, 300);
                    }
                }).catch(() => {});
            }
            },
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
