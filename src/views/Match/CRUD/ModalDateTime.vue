<template>
  <div>
    <div class="column">
      <DatePicker
        type="datetime"
        v-model="time1"
        valueType="format"
        slot="activator"
      ></DatePicker>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  components: {
    DatePicker,
  },
  data(){
      return{
          value: "",
      time1: null,
      }
  }
};
</script>

<style></style>
