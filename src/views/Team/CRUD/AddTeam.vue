<template>
<div>
    <div class="header-title">
        <i class="fas fa-info-circle"></i><span>ບັນທຶກ ຂໍ້ມູນທີມ</span>
    </div>
    <div class="section-content">
        <div class="field">
            <div class="control">
                <label for="" class="label">
                    ຊື່ທີມ
                    <span class="has-text-danger">* {{ errors.first('team_name') }}</span>
                    <span class="has-text-danger">
                        {{server_errors.team_name}}
                    </span>
                </label>
                <input type="text" class="input" name="team_name" v-model="teams.team_name" v-validate="'required'" />
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label for="" class="label">
                    ຜູ້ສະໜັບສະໜຸນ
                    <span class="has-text-danger">* {{ errors.first('sponser') }}</span>
                    <span class="has-text-danger">
                        {{server_errors.sponser}}
                    </span>
                </label>
                <input type="text" class="input" name="sponser" v-model="teams.sponser" v-validate="'required'" />
            </div>
        </div>
        <div class="upload-profile">
            <h2>
                ເລືອກຮູບພາບ
                <span class="has-text-danger">* {{ errors.first('logo_url') }}</span>
                <span class="has-text-danger">
                    {{server_errors.logo_url}}
                </span>
            </h2>

            <div class="file is-fullwidth">
                <label class="file-label">
                    <input class="file-input" type="file" name="logo" ref="file" v-on:change="ImgFileUpload()" v-validate="'required'" />
                    <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Choose a file…
                        </span>
                    </span>
                </label>
            </div>

        </div>
        <div class="field btn">
            <div class="control">
                <button class="button is-fullwidth" style="color:#ffff" @click="ValidateForm()">
                    ບັນທຶກ ຂໍ້ມູນທີມ
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
        team_name: {
            required: '(ກະລຸນາປ້ອນກ່ອນ...)',
        },
        sponser: {
            required: '(ກະລຸນາປ້ອນກ່ອນ...)',
        },
        logo_url: {
            required: '(ກະລຸນາປ້ອນກ່ອນ...)',
        }
    }
};
Validator.localize('en', dict);

export default {
    data: () => ({
        active: false,
        server_errors: {
            team_name: '',
            sponser: '',
            logo: '',
            file: ''
        },
        teams: {
            team_name: '',
            sponser: '',
            logo_url: '',
        }
    }),
    methods: {
        ImgFileUpload() {
            this.teams.logo = this.$refs.file.files[0];
            // console.log(this.logo_url)
            // this.file = this.$refs.file.files[0];
        },
        ValidateForm() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.SaveData();
                }
            });
        },

        SaveData() {
            const loading = this.BtnLoading();
            let formData = new FormData();
            formData.append('team_name', this.teams.team_name);
            formData.append('sponser', this.teams.sponser);
            formData.append('logo', this.teams.logo);
            console.log(this.teams)
            // formData.append('file', this.file);
            this.$axios.post('team', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                if (res /* .data.success == true */ ) {
                    setTimeout(() => {
                        loading.close();
                        this.$emit('close');
                        this.$emit('success');
                        this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 3000);
                    }, 300);
                }
            }).catch(error => {
                loading.close();
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

};
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
</style>
