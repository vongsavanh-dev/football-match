<template>
  <div class="delete-section">
    <img src="../../../assets/images/delete-trash.png" alt="" />
    <div class="message-title">
      <span>
        ກົດຍືນຍັນ ເພື່ອລຶບຂໍ້ມູນ
      </span>
    </div>
    <hr />
    <div class="buttons btn">
      <vs-button class="btn" transparent>
        ຢືນຢັນ
      </vs-button>
      <vs-button class="btn cancel" @click="$emit('close')" dark transparent>
        ຍົກເລີກ
      </vs-button>
    </div>
  </div>
</template>

<script>
export default {};
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
  margin-left:5px;

}
 .cancel{
  background-color:red;
}

</style>
