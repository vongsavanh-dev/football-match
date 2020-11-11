<template>
    <div>
        <div class="header-title">
            <i class="fas fa-info-circle"></i><span>ບັນທຶກຂໍ້ມູນທີມໃນກຸ່ມ</span>
        </div>
        <div class="section-content">
            <div class="field">
                <div class="control">
                    <label for="" class="label">
                        ເລືອກທີມ
                      <span class="has-text-danger">* {{ errors.first('name') }}</span>
                      <span class="has-text-danger">
                        {{server_errors.name}}
                    </span>
                    </label>
                    <div class="select" style="width: 100%">
                        <select style="width: 100%" v-model="GroupMember.team_id" name="name" v-validate="'required'">
                            <option v-bind:value="team.id" :key="index " v-for="(team, index) in teams" :data="team">{{team.team_name}}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="field btn">
            <div class="control">
                <button class="button is-fullwidth" style="color:#ffff" @click="ValidateForm()">
                  ບັນທຶກຂໍ້ມູນ
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
        data(){
            return{
                teams:'',
                server_errors: {
                    name: '',
                },
                GroupMember:{
                    team_id:''
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
                const tournament_id = this.$route.params.tournament_id;
                const id = this.$route.params.group_id;
                this.$axios.post(`tournament/${tournament_id}/group/${id}/group-member`, this.GroupMember).then(res => {
                    if (res) {
                        setTimeout(() => {
                            this.$emit('close');
                            this.$emit('success');
                            this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 3000);
                        }, 300);
                    }
                }).catch((e) =>{
                  if(e && e.response){
                    const message = (e.response.data || {}).team_id;
                    this.errorMessage = message;
                    console.log(this.errorMessage)
                  }
                });
            },

        },
        created() {
            this.FetchData();
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
