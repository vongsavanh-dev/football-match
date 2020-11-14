<template>
  <div class="delete-section">
    <div class="message-title">
        <span>
            ກົດຍືນຍັນ ເພື່ອບັນທຶກຂໍ້ມູນ
        </span>
     <div>
       <hr>
       <span style="font-size: 16px; color: #ff0000;">(ຖ້າບັນທຶກແລ້ວ ບໍ່ສາມາດກັບມາແກ້ໄຂໄດ້ອີກ)</span>
     </div>
    </div>
    <span class="has-text-danger" style="font-size: 16px;">{{errorMessage}}</span>
    <hr/>
    <div class="buttons btn">
      <vs-button class="btn"  transparent @click="SuccessMatch()">
        ຢືນຢັນ
      </vs-button>
      <vs-button class="btn cancel" @click="$emit('close')" dark transparent>
        ຍົກເລີກ
      </vs-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage:'',
    }
  },
  methods: {
    SuccessMatch() {
      this.$axios
          .get(`match/${this.$route.params.match_id}/finished`)
          .then(() => {
            setTimeout(() => {
              this.$emit("close");
            }, 200);
            setTimeout(() => {
              this.$emit('close');
              this.$emit('success');
              this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 300);
            }, 300);
            this.$router.push({
              name: 'Match'
            })


          })
          .catch((e) => {
            if (e && e.response) {
              const message = (e.response.data || {}).error;
              this.errorMessage = message
            }

          });
    }
  },

  created() {
  }
};
</script>

<style scoped>
span {
  font-family: BoonBaan;
  font-size: 22px;
  font-weight: bold;
  color: blue;
}

.buttons .btn {
  font-family: BoonBaan;
  font-size: 16px;
  position: relative;
  bottom: 10px;
  left: 180px;
  margin-left: 5px;

}

.cancel {
  background-color: red;
}
</style>
