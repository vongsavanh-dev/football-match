<template>
  <div class="container">
    <div class="images-preview" v-if="image.length > 0">
      <img class="preview" :src="image"/>
    </div>

    <div class="images-file-upload">
      <div class="file is-boxed">
        <label class="file-label">
          <input class="file-input" type="file" name="image" @change="previewImage" accept="image/*">
          <span class="file-cta">
      <span class="file-icon">
       <i class="fas fa-images" style="font-size: 30px;margin-top: 10px;"></i>
      </span>
      <span class="file-label" style="margin-top: 10px;">
        Choose a file…
      </span>
    </span>
        </label>
      </div>
    </div>

    <div class="images-button-upload">
      <div class="field btn">
        <div class="control">
          <button
              class="button is-fullwidth"
              style="color: #ffff"
              @click="ValidateForm()"
              :class="{'loading':btnLoading}"
          >
            ບັນທຶກ
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      image: "",
      chart_img: "",
      imageFile: null,
      btnLoading: false,
      errorMessage: '',
    }
  },
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
          this.SaveData();
        }
      });
    },

    SaveData() {
      this.btnLoading = true;
      const id = this.$route.params.tournament_id;
      let formData = new FormData();
      if (this.imageFile) {
        formData.append('chart_img', this.imageFile)
      }
      this.$axios
          .post(`tournament/${id}/standingChart`, formData)
          .then((res) => {
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
            this.$router.push({
              name: 'GroupStanding'
            })
          })
    }
  }
}
</script>
<style scoped>
.container {
  margin-top: 60px;
  width: 900px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.images-preview img {
  width: 600px;
  height: 400px;
  object-fit: contain;
}

.images-file-upload {
  margin-top: 10px;
}

</style>
