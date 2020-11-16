<template>
  <div class="delete-section">
    <div class="message-title">
        <span>
            ກົດຍືນຍັນ ເພື່ອບັນທຶກຂໍ້ມູນ
        </span>
    </div>
    <div>
      <hr>
      <span style="font-size: 16px; color: #ff0000;">(ຖ້າບັນທຶກແລ້ວ ບໍ່ສາມາດກັບມາແກ້ໄຂໄດ້ອີກ)</span>
    </div>
    <span class="has-text-danger" style="font-size: 16px;">{{matchTeamouterror}}</span>
    <hr/>
    <div class="buttons btn">
      <vs-button class="btn" transparent @click="MatchTeamOut()">
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
      matchTeamouterror:'',
    }
  },
  methods: {
    MatchTeamOut() {
      this.$axios.get(`match/${this.$route.params.match_id}/team-out`).then((res) => {
        if (res) {
          setTimeout(() => {
            this.$router.push({
              name: 'MatchStanding'
            });
            this.$emit('close');
            this.$emit('success');
            this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 3000);
          }, 300)
              .catch((e) => {
                        if(e && e.response){
                          const message =(e.response.data || {}).error;
                          this.matchTeamouterror = message;
                          // console.log( this.matchTeamouterror)
                        }
                      });
        }

      })

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
