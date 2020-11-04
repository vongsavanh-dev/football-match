<template>
    <div class="container">
        <div class="box-title">
            <h4>
                ລາຍຊື່ທີມພາຍໃນກຸ່ມ

            </h4>

            <span class="btn-create-match">
        <vs-button class="btn-icon" icon circle style="background: #3380ff" @click="CreateMatch()">
         <i class="fas fa-play-circle"
            style="font-size: 25px;color:#ffffff;"></i>
        </vs-button>

            </span>

            <span class="btn-add">
        <vs-button class="btn-icon" circle icon flat @click="OpenModalAdd()">
          <i class="fas fa-plus"></i>
        </vs-button>
             </span>
        </div>

        <div class="center">
            <vs-table>
                <template #thead>
                    <vs-tr class="table-header">
                        <vs-th style="width: 300px">
                            ລຳດັບ
                        </vs-th>
                        <vs-th>
                            ຊື່ທີມ
                        </vs-th>
                        <vs-th>
                            ກຸ່ມ
                        </vs-th>

                        <vs-th> </vs-th>
                    </vs-tr>
                </template>
                <template #tbody>
                    <vs-tr :key="index" v-for="(groupmember, index) in
                    $vs.getPage(ListGroupMember,
                    page, max)"
                           :data="ListGroupMember">
                        <vs-td>
                            {{index +1}}
                        </vs-td>
                        <vs-td>
                            {{groupmember.team_name}}
                        </vs-td>

                        <vs-td>
                            {{groupmember.group_name}}
                        </vs-td>

                        <vs-td style="">
                            <div class="buttons">
                                <vs-button circle danger icon flat
                                           @click="OpenModalDelete(groupmember.id)">
                                    <i class="fas fa-trash-alt"></i>
                                </vs-button>
                            </div>
                        </vs-td>
                    </vs-tr>
                </template>

                <template #footer>
                    <vs-pagination v-model="page" :length="$vs.getLength(ListGroupMember, max)" />
                </template>
            </vs-table>
        </div>
        <ModalAdd>
            <template v-slot="{ close }">
                <AddGroupMember @close="close" @success="FetchData()" />
            </template>
        </ModalAdd>
        <ModalDelete>
            <template v-slot="{ close }">
                <DeleteGroupMember :teammember_Delete ="groupmember_id" @close="close" @success="FetchData()" />
            </template>
        </ModalDelete>
    </div>
</template>

<script>
    import AddGroupMember from "./CRUD/AddGroupMember";
    import  DeleteGroupMember from './CRUD/DeleteGroupMember'
    export default {
        components: {
            AddGroupMember,
            DeleteGroupMember

        },
        data: () => ({
            page: 1,
            max: 5,
            ListGroupMember:[],
            teams:[],
            groupmember_id:'',
            memberlist:[],
        }),
        methods: {
            OpenModalAdd() {
                this.$store.commit("modalAdd_State", true);
            },
            // OpenModalEdit() {
            //     this.$store.commit("modalEdit_State", true);
            // },
            OpenModalDelete(groupmember_id) {
                this.groupmember_id = groupmember_id
                console.log(this.groupmember_id)
                this.$store.commit("modalDelete_State", true);
            },

            //get list team in group-member
            FetchData(){
                const tournament_id = this.$route.params.tournament_id;
                const id = this.$route.params.group_id;
                this.$axios.get(`tournament/${tournament_id}/group/${id}/group-member`,
                    this.GroupMember).then(res => {
                    setTimeout(() => {
                        this.$emit('close');
                    }, 200);
                    setTimeout(() => {
                        this.ListGroupMember = res.data.member;
                    }, 100);
                }).catch(() => {

                });
            },

            CreateMatch(){
                const tournament_id = this.$route.params.tournament_id;
                const id = this.$route.params.group_id;
                this.$axios.get(`tournament/${tournament_id}/group/${id}/group-member/create-match`,
                   ).then(res => {
                    if (res) {
                        setTimeout(() => {
                            this.$emit('close');
                            this.$emit('success');
                            this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 3000);
                        }, 300);
                    }
                }).catch(() => {

                });
            }

        },
        created() {
            this.FetchData();
        }
    };
</script>

<style>
    .container {
        width: 100%;
        height: auto;
    }
    .container .box-title {
        margin-top: 30px;
    }
    .box-title {
        font-family: BoonBaan;
        font-size: 18px;
    }
    .center {
        font-family: BoonBaan;
        text-align: left;
    }
    .btn-add .btn-icon {
        margin-bottom: 20px;
        font-size: 18px;
        float: right;
    }
    .buttons{
        width: 150px;
        text-align: right;
    }
    .btn-create-match .btn-icon{
       margin-left: 550px;

    }

</style>
