<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6-tablet is-5-desktop is-4-widescreen">
            <form action="" class="box">
              <figure>
                <img class="image-logo" src="../../assets/logo.png" />
              </figure>
              <div class="field">
                <label for="" class="label">ຊື່ຜູ້ໃຊ້</label>
                <div class="control has-icons-left">
                  <input type="email" class="input" required />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">ລະຫັດຜ່ານ</label>
                <div class="control has-icons-left">
                  <input type="password" class="input" required />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>

              <div class="field">
                <button class="button is-success">
                  <span class="icon is-small is-left">
                    ເຂົ້າສູ່ລະບົບ
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.box {
  height: 430px;
}
.field {
  position: relative;
}
.field button {
  position: relative;
  color: #ffff;
  font-family: BoonBaan;
  display: inline-block;
  margin-top: 10px;
  width: 100%;
}

figure .image-logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  padding: 0;
  border: 0;
}

label {
  text-align: start;
  font-family: BoonBaan;
  font-weight: 100;
  font-size: 16px;
  font-weight: 100;
}
</style>
