<template>
    <div>
        <div class="header-title">
            <i class="fas fa-info-circle"></i><span>ແກ້ໄຂ ຂໍ້ມູນນັກເຕະ</span>
        </div>
        <div class="section-content">
            <div class="field">
                <div class="control">
                    <label for="" class="label">
                        ຊື່ນັກເຕະ
                        <span class="has-text-danger">* {{ errors.first('name') }}</span>
                        <span class="has-text-danger">
                        {{server_errors.name}}
                </span>
                    </label>
                    <input type="text" class="input" name="name"
                           placeholder="ປ້ອນຊື່..."
                           v-model="listplayerteam.name"
                           v-validate="'required'"/>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <label for="" class="label">
                        ນາມສະກຸນ
                        <span class="has-text-danger">* {{ errors.first('sur_name') }}</span>
                        <span class="has-text-danger">
                        {{server_errors.name}}
                </span>
                    </label>
                    <input type="text" class="input" name="sur_name" placeholder="ປ້ອນນາມສະກຸນ..."
                           v-model="listplayerteam.sur_name"
                           v-validate="'required'"/>
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <label for="" class="label">
                        Name
                        <span class="has-text-danger">* {{ errors.first('eng_name') }}</span>
                        <span class="has-text-danger">
              {{ server_errors.eng_name }}
            </span>
                    </label>
                    <input type="text" class="input" v-model="listplayerteam.eng_name"
                           name="eng_name" v-validate="'required'" placeholder="name..."/>
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <label for="" class="label">
                        ວັນເດືອນປີເກີດ
                        <span class="has-text-danger">* {{ errors.first('date_of_birth') }}</span>
                        <span class="has-text-danger">
                        {{server_errors.date_of_birth}}
                </span>
                    </label>
                    <!--          <input type="text" class="input" v-model="listplayerteam.date_of_birth" />-->

                    <DatePicker class="date-time" style="width:100%;"
                                v-validate="'required'"
                                name="date_of_birth"
                                placeholder="ປ້ອນວັນເດືອນປີເກີດ..."
                                type="date" v-model="listplayerteam.date_of_birth"
                                valueType="format" slot="activator"
                                :popup-style="{ top: '100%', left: '15%' }"
                                :append-to-body="false">

                    </DatePicker>
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <label for="" class="label">ເບີເສື້ອ</label>
                    <input type="text" class="input" v-model="listplayerteam.player_number"/>
                </div>
            </div>

            <div class="field">
                <div class="control">
                    <label for="" class="label">ຕຳແໜ່ງ</label>
                    <div class="select" style="width:100%;">
                        <select style="width:100%;" v-model="listplayerteam.player_position">
                            <option v-for="(position , index) in listposition" :key="index"
                                    :value="position.name">
                                {{position_Laoname[position.name]}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>


            <div class="filed">
                <div class="control">
                    <label for="" class="label" style="font-size:18px;">
                        ເລືອກຮູບພາບ
                    </label>
                </div>
            </div>
            <div class="image-preview">
                <img class="preview" :src="image || listplayerteam.image_url"/>
            </div>
            <div class="filed">
                <div class="control">
                    <input type="file" @change="previewImage" name="image" accept="image/*"
                           class="input"/>
                </div>
            </div>

            <div class="field btn">
                <div class="control">
                    <button class="button is-fullwidth" style="color:#ffff;"
                            @click="ValidateForm()">ອັບເດດ ຂໍ້ມູນນັກເຕະ
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
            name: {
                required: '(ກະລຸນາປ້ອນກ່ອນ...)',
            },
            sur_name: {
                required: '(ກະລຸນາປ້ອນກ່ອນ...)',
            },
            eng_name: {
                required: '(ກະລຸນາປ້ອນກ່ອນ...)',
            },
            eng_surname: {
                required: '(ກະລຸນາປ້ອນກ່ອນ...)',
            },
            date_of_birth: {
                required: '(ກະລຸນາປ້ອນກ່ອນ...)',
            },
            player_number: {
                required: '(ກະລຸນາປ້ອນກ່ອນ...)',
            },
            player_position: {
                required: '(ກະລຸນາປ້ອນກ່ອນ...)',
            },
            image: {
                required: '(ກະລຸນາປ້ອນກ່ອນ...)',
            },
        }

    };
    Validator.localize('en', dict);


    export default {
        components: {
            DatePicker,
        },
        props: [
            'listplayerteam',
            'listposition'
        ],

        data: () => ({
            player: '',
            image: null,
            imageFile: '',
            value: "",
            server_errors: {
                name: "",
                sur_name: "",
                eng_name: "",
                eng_surname: '',
                date_of_birth: "",
                player_number: "",
                player_position: "",
            },

            position_Laoname: {
                Goalkeeper: "ຜູ້ຮັກສາປະຕູ",
                Defender: "ກອງຫຼັງ",
                Midfielder: "ກອງກາງ",
                Forward: "ກອງໜ້າ",
            },
        }),
        methods: {
            previewImage: function (event) {
                var input = event.target;
                if (input.files && input.files[0]) {
                    this.imageFile = input.files[0];
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
                        this.UpdateData();
                    }
                });
            },

            UpdateData() {
                const id = this.$route.params.team_id
                let formData = new FormData();
                formData.append('name', this.listplayerteam.name)
                formData.append('sur_name', this.listplayerteam.sur_name)
                formData.append('eng_name', this.listplayerteam.eng_name)
                formData.append('eng_surname', this.listplayerteam.eng_surname)
                formData.append('date_of_birth', this.listplayerteam.date_of_birth)
                formData.append('player_number', this.listplayerteam.player_number)
                formData.append('player_position', this.listplayerteam.player_position)
                if (this.imageFile) {
                    formData.append('image', this.imageFile)
                }
                // console.log(this.imageFile)
                formData.append('_method', 'PUT');
                this.$axios.post(`team/${id}/player/${this.listplayerteam.id}`, formData).then(res => {
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
        },
        created() {
            this.player = this.listplayerteam;
            // console.log(this.player)
        }
    };
</script>

<style scopde>
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

    .date-time {
        font-family: BoonBaan;
    }
</style>
