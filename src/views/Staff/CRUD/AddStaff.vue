<template>
  <div>
    <div class="header-title">
      <i class="fas fa-info-circle"></i><span>ບັນທຶກ ຂໍ້ມູນ Staff</span>
    </div>
    <div class="section-content">
      <div class="field">
        <div class="control">
          <label for="" class="label">
            ຊື່
            <span class="has-text-danger">* {{ errors.first('name') }}</span>
            <span class="has-text-danger">
                        {{server_errors.name}}
                    </span>
          </label>
          <input type="text" class="input" name="name" v-model="staff.name" v-validate="'required'" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label for="" class="label">
            ນາມສະກຸນ
            <span class="has-text-danger">* {{ errors.first('sur_name') }}</span>
            <span class="has-text-danger">
                        {{server_errors.sur_name}}
                    </span>
          </label>
          <input type="text" class="input" name="initial_name" v-model="staff.sur_name" v-validate="'required'" />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label for="" class="label">
            ຕຳແໜ່ງ
            <span class="has-text-danger"
            >* {{ errors.first('staff_position') }}</span
            >
            <span class="has-text-danger">
              {{ server_errors.staff_position }}
            </span>
          </label>
          <div class="select" style="width: 100%">
            <select style="width: 100%" v-model="staff.player_position" name="player_position" v-validate="'required'">
              <option
                  v-for="(position, index) in Staff_position"
                  :key="index"
                  :value="position.name"
              >
                {{ position.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="upload-profile">
        <h2>
          ເລືອກຮູບພາບ
<!--          <span class="has-text-danger">* {{ errors.first('image') }}</span>-->
<!--          <span class="has-text-danger">-->
<!--                    {{server_errors.image}}-->
<!--                </span>-->
        </h2>
        <div class="image-preview" v-if="image.length > 0">
          <img class="preview" :src="image"/>
        </div>
        <div class="filed">
          <div class="control">
            <input type="file" @change="previewImage" name="image" accept="image/*" class="input" />
          </div>
        </div>

      </div>
      <div class="field btn">
        <div class="control">
          <button class="button is-fullwidth" style="color:#ffff"
                  :class="{'is-loading':btnLoading}"
                  @click="ValidateForm()">
            ບັນທຶກ ຂໍ້ມູນ Staff
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
    name: {
      required: '(ກະລຸນາປ້ອນກ່ອນ...)',
    },
    sur_name: {
      required: '(ກະລຸນາປ້ອນກ່ອນ...)',
    },
    // image: {
    //   required: '(ກະລຸນາປ້ອນກ່ອນ...)',
    // },
    player_position:{
      required: '(ກະລຸນາປ້ອນກ່ອນ...)',
    }


  }
};
Validator.localize('en', dict);

export default {
  props:['Staff_position'],
  data: () => ({
    btnLoading:false,
    active: false,
    imageFile: null,
    image:'',
    server_errors: {
      name: '',
      sur_name: '',
      logo: '',
      file: '',
      // image_name:'',
      // image:''
    },
    staff: {
      name: '',
      sur_name: '',
      player_position:'',
      image:'',
    }
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
          this.btnLoading = true
          this.SaveData();
        }
      });
    },

    SaveData() {
      const loading = this.BtnLoading();
      const id = this.$route.params.team_id;
      let formData = new FormData();
      formData.append('name', this.staff.name);
      formData.append('sur_name', this.staff.sur_name);
      formData.append('player_position', this.staff.player_position);
      if(this.imageFile){
        formData.append('image', this.imageFile);
      }
      this.$axios.post(`team/${id}/staff`, formData ,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if (res) {
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
