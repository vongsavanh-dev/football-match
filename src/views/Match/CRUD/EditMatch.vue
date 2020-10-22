<template>
  <div>
    <div class="header-title">
      <i class="fas fa-info-circle"></i><span>ອັບເດດ ຂໍ້ມູນການແຂ່ງຂັນ</span>
    </div>
    <div class="section-content" style="margin-top: 40px">
      <div class="field">
        <div class="control">
          <label for="" class="label">ເລືອກທີມທີໜື່ງ</label>
          <div class="select" style="width: 100%">
            <select style="width: 100%">
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <label for="" class="label">ເລືອກທີມທີສອງ</label>
          <div class="select" style="width: 100%">
            <select style="width: 100%">
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
      </div>

  <div class="field">
    <div class="control">
      <label for="" class="label">ວັນເວລາແຂ່ງຂັນ</label>
        <DatePicker style="width:100%;"
       type="datetime"
        v-model="time1"
        valueType="format"
        slot="activator"
        :popup-style="{ top: '100%', left:'15%'}" :append-to-body="false" 
      ></DatePicker> 
    </div>
  </div>



      <div class="field btn">
        <div class="control">
          <button class="button is-fullwidth" style="color:#ffff;">
            ອັບເດດ ຂໍ້ມູນການແຂ່ງຂັນ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  components:{
DatePicker
  },
  data() {
    
    return {
      value: "",
      time1: null,
      
    
    };
  },
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
