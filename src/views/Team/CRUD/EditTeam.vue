<template>
<div>
    <div class="header-title">
        <i class="fas fa-info-circle"></i><span>ອັບເດດ ຂໍ້ມູນທີມ</span>
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
                <input type="text" class="input" name="team_name" v-model="listTeam.team_name" v-validate="'required'" />
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label for="" class="label">
                    ຜູ້ສະໜັບສະໜຸນ
                    <span class="has-text-danger">* {{ errors.first('initial_name') }}</span>
                    <span class="has-text-danger">
                        {{server_errors.initial_name}}
                    </span>
                </label>
                <input type="text" class="input" name="initial_name" v-model="listTeam.initial_name" v-validate="'required'" />
            </div>
        </div>
        <div class="upload-profile">

<!--            <div class="file is-fullwidth">-->
<!--                <label class="file-label">-->
<!--                    <input class="file-input" type="file" name="logo" ref="file" v-on:change="ImgFileUpload()" />-->
<!--                    <span class="file-cta">-->
<!--                        <span class="file-icon">-->
<!--                            <i class="fas fa-upload"></i>-->
<!--                        </span>-->
<!--                        <span class="file-label">-->
<!--                            Choose a file…-->
<!--                        </span>-->
<!--                    </span>-->
<!--                </label>-->
<!--            </div>-->

            <div class="filed">
                <div class="control">
                    <label for="" class="label" style="font-size:18px;">
                        ເລືອກຮູບພາບ
                    </label>
                </div>
            </div>
            <div class="image-preview">
                <img class="preview" :src=" image || listTeam.logo_url"/>
            </div>
            <div class="filed">
                <div class="control">
                    <input type="file" @change="previewImage" name="logo" accept="image/*"
                           class="input"/>
                </div>
            </div>

        </div>
        <div class="field btn">
            <div class="control">
                <button class="button is-fullwidth" style="color:#ffff" @click="ValidateForm()">
                    ອັບເດດ ຂໍ້ມູນທີມ
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
        initial_name: {
            required: '(ກະລຸນາປ້ອນກ່ອນ...)',
        },

    }
};
Validator.localize('en', dict);

export default {
    props: [
        'listTeam'
    ],
    data: () => ({
        /* team: [], */
        active: false,
        image:null,
        imageFile:'',
        server_errors: {
            team_name: '',
            initial_name: '',

        },
        file: '',
    }),
    methods: {
        // ImgFileUpload() {
        //     this.file = this.$refs.file.files[0];
        //     // console.log(this.file)
        //     // this.file = this.$refs.file.files[0];
        // },

        previewImage: function (event) {
            var input = event.target;
            if (input.files && input.files[0]) {
                this.imageFile = input.files[0];
                // console.log(this.imageFile)
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.image = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);

            }

        },
        ValidateForm() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    this.EditData();
                }
            });
        },
        EditData() {
            /*    const loading = this.BtnLoading(); */
            let formData = new FormData();
            formData.append('team_name', this.listTeam.team_name);
            formData.append('initial_name', this.listTeam.initial_name);
            if (this.imageFile) {
                formData.append('logo', this.imageFile);
            }
            // formData.append('logo_name', this.listTeam.logo_name);

            // console.log(this.listTeam)
            formData.append('_method', 'PUT');
            // formData.append('file', this.file);
            this.$axios.post('team/' + this.listTeam.id, formData, {

                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then(res => {
                if (res /* .data.success == true */ ) {
                    setTimeout(() => {
                        /*    loading.close(); */
                        this.$emit('close');
                        this.$emit('success');
                        this.$notification.OpenNotification_EditItem_OnSuccess('top-right', 'primary', 3000, );
                    }, 500);
                }
            }).catch(error => {
                /*  loading.close(); */
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



    }
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
