<template>
<div class="columns is-vcentered" style="background-color:#ffff;">
    <div class="login column is-4">
        <section class="section">
            <div class="has-text-centered">
                <img class="login-logo" src="../../assets/footballLOGO.png" />
            </div>
            <p :style="{color: 'crimson'}">
                {{$store.getters['User/ShowMsgErrors']}}
            </p>
            <div class="field">
                <label class="label">Username</label>
                <div class="control has-icons-right">
                    <input class="input" type="text" v-model="users.email" />
                    <span class="icon is-small is-right">
                        <i class="fa fa-user"></i>
                    </span>
                </div>
            </div>

            <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-right">
                    <input class="input" type="password" v-model="users.password" />
                    <span class="icon is-small is-right">
                        <i class="fa fa-key"></i>
                    </span>
                </div>
            </div>
            <div class="has-text-centered">
                <a class="button is-vcentered is-link is-outlined" style="font-family:BoonBaan;width:100%;" @click="AdminSignIn()">Login</a>
            </div>
        </section>
    </div>
    <div id="particles-js" class="interactive-bg column is-8"></div>

</div>
</template>

<script>
import {
    mapActions
} from "vuex";

export default {
    data() {
        return {
            users: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        ...mapActions({
            AdminLogin: "User/LoginUser",
        }),

        AdminSignIn() {
            /* const loading = this.$vs.loading(); */
            this.AdminLogin(this.users)
                .then(() => {
                    // setTimeout(() => {
                    //     this.$notification.OpenNotification_Login_Success(
                    //         "top-right",
                    //         "success",
                    //         30000
                    //     );
                    // }, );
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        /*  loading.close(); */
                    } else {
                        /*  loading.close() ;*/

                    }
                });
        },
    },
};
</script>

<style scoped>
.interactive-bg {
    height: 100vh;
    background-color: #031e31;
    -webkit-box-shadow: inset 24px 4px 64px -24px rgba(71, 71, 71, 1);
    -moz-box-shadow: inset 24px 4px 64px -24px rgba(71, 71, 71, 1);
    box-shadow: inset 24px 4px 64px -24px rgba(71, 71, 71, 1);
    padding: 0px;
}

@media (max-width: 769px) {
    .interactive-bg {
        display: none;
    }
}

.input {
    border-radius: 5px;
}

.button {
    margin-top: 20px;
    margin-bottom: 20px;
    min-width: 150px;
}

.login-logo {
    margin: 0 auto;
    margin-bottom: 50px;
    height: 50%;
    width: 50%;
}

.columns {
    margin: 0px;
}
</style>
