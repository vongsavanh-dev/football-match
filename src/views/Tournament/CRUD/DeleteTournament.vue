<template>
  <div class="delete-section">
    <img src="../../../assets/images/delete-trash.png" alt=""/>
    <div class="message-title">
        <span>
            ກົດຍືນຍັນ ເພື່ອລຶບຂໍ້ມູນ
        </span>
    </div>
    <hr/>
    <div class="buttons btn">
      <vs-button class="btn" transparent @click="DeleteTeam(Delete_Tournament)">
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
  props: ['Delete_Tournament'],
  data() {
    return {}
  },
  methods: {
    DeleteTeam(TournamentId) {
      this.$axios.delete('tournament/' + TournamentId).then(res => {
        this.$emit('close');
        this.$emit('success');
        if (res && res.data) {
          setTimeout(() => {
            this.$notification.OpenNotification_DeleteItem_OnSuccess('top-right', 'danger', 3000);
          }, 300);
        }
      }).catch(() => {
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
