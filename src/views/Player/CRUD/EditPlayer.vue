<template>
  <div>
    <div class="header-title">
      <i class="fas fa-info-circle"></i><span>ແກ້ໄຂ ຂໍ້ມູນນັກເຕະ</span>
    </div>
    <div class="section-content">
      <div class="field">
        <div class="control">
          <label for="" class="label">ຊື່ນັກເຕະ</label>
          <input type="text" class="input" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label for="" class="label">ນາມສະກຸນ</label>
          <input type="text" class="input" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label for="" class="label">ວັນເດືອນປີເກີດ</label>
          <input type="text" class="input" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label for="" class="label">ເບີເສື້ອ</label>
          <input type="text" class="input" />
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label for="" class="label">ຕຳແໜ່ງ</label>
          <div class="select" style="width:100%;">
            <select style="width:100%;">
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>

       <div class="field btn">
        <div class="control">
          <button class="button is-fullwidth" style="color:#ffff;">ອັບເດດ ຂໍ້ມູນນັກເຕະ</button>
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
.btn button {
  font-family: BoonBaan;
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  background-color: #3380ff;
  color: #ffff;
}
</style>
