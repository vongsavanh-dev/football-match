<template>
  <div class="container">
    <div class="title-icon">
      <i class="fas fa-clipboard"></i>
      <span>ເລືອກທີມເຂົ້າຮອບ</span>
    </div>
    <div class="field">
      <div class="control">
        <label for="" class="label" style="font-size: 22px">
          ເລືອກທີມທີ່ຜ່ານເຂົ້າຮອບ
        </label>
        <div class="select" style="width: 100%">
          <select style="width: 100%" v-model="team.team_win">
            <option :key="index"
                    v-for="(team, index) in match_data"
                    :data="team"
                    v-bind:value="team.id">
              {{ team.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="field btn">
      <div class="control">
        <button class="button is-fullwidth" style="color: #ffff" @click="ValidateForm()"
                :class="{'is-loading':btnLoading}">
          ບັນທຶກ ຂໍ້ມູນທີມຜ່ານເຂົ້າຮອບ
        </button>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  props: ['match_data'],
  data() {
    return {
      btnLoading: false,
      team: {
        team_win: '',
      },
    }
  },
  methods: {
    ValidateForm() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.btnLoading = true;
          this.SaveData();
        }
      });
    },
    SaveData() {
      const id = this.$route.params.match_id;
      this.$axios.post(`match/${id}/draw`, this.team).then(res => {
        if (res) {
          setTimeout(() => {
            this.$emit('close');
            this.$emit('success');
            this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 3000);
          }, 300);
          this.$router.push({
            name: 'MatchStanding'
          })
        }
      }).catch((e) => {
        if (e && e.response) {
          const message = (e.response.data || {}).error;
          this.errorMessage = message;
        }
      })
    },
  },
  created() {
    // this.match = this.match_data
    // console.log(this.match)
  }
}
</script>

<style scoped lang="scss">
.title-icon {
  font-size: 22px;
  color: #3366ff;

  & span {
    padding-left: 10px;
    font-weight: 800;
    color: #3366ff;
  }
}

</style>
