<template>
    <div>
        <div class="header-title">
            <i class="fas fa-info-circle"></i><span>ອັບເດດ ຂໍ້ມູນກຸ່ມ</span>
        </div>
        <div class="section-content">
            <div class="filed">
                <div class="control">
                    <label for="label" class="label">
                        ຊື່ກຸ່ມ
                        <span class="has-text-danger">* {{ errors.first('name') }}</span>
                        <span class="has-text-danger">
                        {{server_errors.name}}
                    </span>
                    </label>
                    <input type="text" class="input" name="name"
                           v-model="EditGroup.name"
                           v-validate="'required'" />
                </div>
            </div>
        </div>
        <div class="field btn">
            <div class="control">
                <button class="button is-fullwidth" style="color:#ffff" @click="ValidateForm()">
                  ອັບເດດ ຂໍ້ມູນກຸ່ມ
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
            name: {
                required: '(ກະລຸນາປ້ອນກ່ອນ...)',
            },

        }
    };
    Validator.localize('en', dict);
    export default {
        props:['EditGroup'],
        data(){
            return{
                name:'',
                server_errors: {
                    tournament_name: '',
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
                const id = this.$route.params.tournament_id;
                this.$axios.put(`tournament/${id}/group/${this.EditGroup.id}`, this.EditGroup).then(res => {
                    if (res) {
                        setTimeout(() => {
                            this.$emit('close');
                            this.$emit('success');
                            this.$notification.OpenNotification_EditItem_OnSuccess('top-right',
                                'success', 3000);
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
