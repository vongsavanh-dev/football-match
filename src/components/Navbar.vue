<template>
<div class="center examplex">
    <vs-navbar center-collapsed v-model="active" class="navbar">
        <template #right>
            <vs-button @click="LogoutUsers()" class="logout-text">ອອກຈາກລະບົບ</vs-button>
        </template>
    </vs-navbar>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex';
export default {
    data: () => ({
        active: 'guide'
    }),
    methods: {
        ...mapActions({
            LogoutUser: 'User/destroyToken'
        }),

        LogoutUsers() {
            // const loading = this.$vs.loading();
            this.LogoutUser().then(res => {
                // setTimeout(() => {
                //     this.$notification.OpenNotification_Logout_Success('top-right', 'danger', 3000);
                //     // loading.close();
                // }, 500);
                if (res.data.success == true) {
                    setTimeout(() => {
                        this.$notification.OpenNotification_Logout_Success('top-right', 'danger', 3000);
                        // loading.close();
                    }, 500);
                }
            }).catch(() => {});
        }

    }
};
</script>

<style scoped>
.logout-text {
    font-family: BoonBaan;
    font-size: 14px;
}
</style>
