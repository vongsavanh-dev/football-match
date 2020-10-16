<template>
  <div>
    <div class="header-title">
      <i class="fas fa-info-circle"></i><span>ບັນທຶກ ຂໍ້ມູນຕຳແໜ່ງຜູ້ຫຼິ້ນ</span>
    </div>
    <div class="section-content">
      <div class="field">
        <div class="control">
          <label for="" class="label" style="margin-top:30px;"
            >ຕຳແໜ່ງນັກເຕະ</label
          >
          <input type="text" class="input" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    value: "",
  }),
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
</style>
