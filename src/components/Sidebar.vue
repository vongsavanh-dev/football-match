<template>
<div class="hidden">
    <vs-sidebar absolute v-model="active" open>
        <template class="logo-dashboard">
            <img class="dashboard-logo" src="../assets/logo.png" alt="" />
        </template>

        <vs-sidebar-group>
            <template #header>
                <vs-sidebar-item arrow class="text-header-dashboard">
                    <template #icon>
                        <i class="fas fa-folder-open"></i>
                    </template>
                    <h2>ຈັດການຂໍ້ມູນຫຼັກ</h2>
                </vs-sidebar-item>
            </template>
            <div @click="Tournament()">
                <vs-sidebar-item id="Instagram" class="text-header-dashboard">
                    <template #icon>
                        <i class="fas fa-futbol"></i>
                    </template>
                    <h2>ຂໍ້ມູນທົວນາເມັ້ນ</h2>
                </vs-sidebar-item>
            </div>
            <div @click="Team()">
                <vs-sidebar-item id="Instagram" class="text-header-dashboard">
                    <template #icon>
                        <i class="fas fa-sitemap"></i>
                    </template>
                    <h2>ຂໍ້ມູນທີມ</h2>
                </vs-sidebar-item>
            </div>
            <div @click="Player()">
                <vs-sidebar-item id="twitter" class="text-header-dashboard">
                    <template #icon>
                        <i class="fas fa-futbol"></i>
                    </template>
                    <h2>ຂໍ້ມູນນັກເຕະ</h2>
                </vs-sidebar-item>
            </div>
            <div @click="Position()">
                <vs-sidebar-item id="Facebook" class="text-header-dashboard">
                    <template #icon>
                        <i class="fas fa-crosshairs"></i>
                    </template>
                    <h2>ຂໍ້ມູນຕຳແໜ່ງ</h2>
                </vs-sidebar-item>
            </div>
        </vs-sidebar-group>

        <!--  <vs-sidebar-group> -->
        <div @click="MatchTable()">
            <vs-sidebar-item id="chat" class="text-header-dashboard">
                <template #icon>
                    <i class="fas fa-edit"></i>
                </template>
                <h2>ຕາຕະລາງ</h2>
            </vs-sidebar-item>
        </div>

        <div @click="MatchScore()">
            <vs-sidebar-item id="chat" class="text-header-dashboard">
                <template #icon>
                    <i class="fas fa-edit"></i>
                </template>
                <h2>ຜົນການແຂ່ງຂັນ</h2>
            </vs-sidebar-item>
        </div>
        <!-- </vs-sidebar-group> -->
    </vs-sidebar>
</div>
</template>

<script>
export default {
    data: () => ({
        active: "home",
    }),
    methods: {
        Tournament(){
            this.$router.push({
                name:"Tournament"
            })
        },
        Team() {
            this.$router.push({
                name: "listteam"
            });
        },
        Player() {
            this.$router.push({
                name: "Listplayer"
            });
        },
        Position() {
            this.$router.push({
                name: "Position"
            });
        },
        MatchTable() {
            this.$router.push({
                name: "Match"
            })
        },
        MatchScore() {
            this.$router.push({
                name: "MatchScore"
            })
        }
    },
};
</script>

<style lang="css" scoped>
.dashboard-logo {
    height: 120px;
    width: 120px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
}

.text-header-dashboard {
    font-family: BoonBaan;
}

.text-header-dashboard h2 {
    font-size: 18px;
    padding-left: 10px;
}
</style>
