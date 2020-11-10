<template>
  <div>
    <div class="header-title">
      <i class="fas fa-info-circle"></i><span>ບັນທຶກ ຂໍ້ມູນນັກເຕະ</span>
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
          <input type="text" class="input" v-model="player_team.name" name="name"  v-validate="'required'" placeholder="ປ້ອນຊື່ນັກເຕະ..." />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label for="" class="label">
            ນາມສະກຸນ
            <span class="has-text-danger">* {{ errors.first('sur_name') }}</span>
            <span class="has-text-danger">
              {{ server_errors.sur_name }}
            </span>
          </label>
          <input type="text" class="input" v-model="player_team.sur_name" name="sur_name" v-validate="'required'" placeholder="ປ້ອນນາມສະກຸນ..." />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label for="" class="label">
            Name
<!--            <span class="has-text-danger">* {{ errors.first('eng_name') }}</span>-->
<!--            <span class="has-text-danger">-->
<!--              {{ server_errors.eng_name }}-->
<!--            </span>-->
          </label>
          <input type="text" class="input" v-model="player_team.eng_name" name="eng_name"  placeholder="name..."  />
        </div>
      </div>

     <div class="field">
        <div class="control">
          <label  class="label">
            SurName
<!--            <span class="has-text-danger">* {{ errors.first('eng_surname') }}</span>-->
<!--            <span class="has-text-danger">-->
<!--              {{ server_errors.eng_surname }}-->
<!--            </span>-->
          </label>
          <input type="text" class="input" v-model="player_team.eng_surname" name="eng_surname"
                 placeholder="surname..."  />
        </div>
      </div>


      <div class="field">
        <div class="control">
          <label for="" class="label">
            ວັນເດືອນປີເກີດ
            <span class="has-text-danger"
              >* {{ errors.first('date_of_birth') }}</span
            >
            <span class="has-text-danger">
              {{ server_errors.date_of_birth }}
            </span>
          </label>
          <DatePicker class="date-time"
            style="width: 100%;"
            type="date"
            v-model="player_team.date_of_birth"
            valueType="format"
            slot="activator"
            :popup-style="{ top: '100%', left: '15%' }"
            :append-to-body="false"
            v-validate="'required'"
            name="date_of_birth"
            placeholder="ປ້ອນວັນເດືອນປີເກີດ..."
          ></DatePicker>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label for="" class="label">
            ເບີເສື້ອ
            <span class="has-text-danger"
              >* {{ errors.first('player_number') }}</span
            >
            <span class="has-text-danger">
              {{ server_errors.player_number }}
            </span>
          </label>
          <input
            type="text"
            class="input"
            v-model="player_team.player_number"
            v-validate="'required|numeric'"
            name="player_number"
            placeholder="ປ້ອນເບີເສື້ອ..."
          />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label for="" class="label">
            ຕຳແໜ່ງ
            <span class="has-text-danger"
              >* {{ errors.first('player_position') }}</span
            >
            <span class="has-text-danger">
              {{ server_errors.player_position }}
            </span>
          </label>
          <div class="select" style="width: 100%">
            <select style="width: 100%" v-model="player_team.player_position" name="player_position" v-validate="'required'">
              <option
                v-for="(position, index) in listposition"
                :key="index"
                :value="position.name"
              >
                {{ position_Laoname[position.name] }}
              </option>
            </select>
          </div>
        </div>
      </div>


<div class="filed">
<div class="control">
  <label for="" class="label" style="font-size:18px;">
      ເລືອກຮູບພາບ
         <span class="has-text-danger"
              >* {{ errors.first('image') }}</span
            >
            <span class="has-text-danger">
              {{ server_errors.image }}
            </span>
    </label>
</div>
    </div>
      <div class="image-preview" v-if="image.length > 0">
        <img class="preview" :src="image"/>
      </div>
      <div class="filed">

          <div class="control">
            <input type="file" @change="previewImage" name="image" accept="image/*" class="input"  v-validate="'required'"/>
          </div>
      </div>


      <div class="field btn">
        <div class="control">
          <button
            class="button is-fullwidth"
            style="color: #ffff"
            @click="ValidateForm()"
            :class="{'loading':btnLoading}"
          >
            ບັນທຶກ ຂໍ້ມູນນັກເຕະ
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
        // eng_name: {
        //     required: '(ກະລຸນາປ້ອນກ່ອນ...)',
        // },
        //  eng_surname: {
        //     required: '(ກະລຸນາປ້ອນກ່ອນ...)',
        // },
          date_of_birth: {
            required: '(ກະລຸນາປ້ອນກ່ອນ...)',
        },
            player_number: {
            required: '(ກະລຸນາປ້ອນກ່ອນ...)', numeric: '(ປ້ອນສະເພາະຕົວເລກ...)',
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
  props: ["listposition"],

  data: () => ({
    btnLoading:false,
    value: "",
    time1: "",
    image: "",
    imageFile: null,

    server_errors: {
      name: "",
      sur_name: "",
      // eng_name:"",
      // eng_surname:'',
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

    player_team: {
      name: "",
      sur_name: "",
      eng_name:'',
      eng_surname:'',
      date_of_birth: "",
      player_number: "",
      player_position: "",
      image:'',
    },
  }),


  methods: {

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
          this.SaveData();
        }
      });
    },

    SaveData() {
      this.btnLoading = true;
      const id = this.$route.params.team_id;
      let formData = new FormData();
      formData.append('name',this.player_team.name)
      formData.append('sur_name',this.player_team.sur_name)
      formData.append('eng_name',this.player_team.eng_name)
      formData.append('eng_surname',this.player_team.eng_surname)
      formData.append('date_of_birth',this.player_team.date_of_birth)
      formData.append('player_number',this.player_team.player_number)
      formData.append('player_position',this.player_team.player_position)
      formData.append('image',this.imageFile)
      this.$axios
        .post(`team/${id}/player`, formData)
        .then((res) => {
          // console.log(res)
          if (res) {
            setTimeout(() => {
              this.btnLoading = false;
              this.$emit("close");
              this.$emit("success");
              this.$notification.OpenNotification_AddItem_OnSuccess(
                "top-right",
                "primary",
                3000
              );
            }, 300);
          }
        })
        .catch((error) => {
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
        scale: "0.6",
        background: "primary",
        opacity: 1,
        color: "#fff",
      });
    },
  },
  created() {

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
  font-size: 12px;
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

.image-preview img{
 width:250px;
 height: 250px;
}
.date-time ::placeholder{
  font-family: BoonBaan;

}

</style>
