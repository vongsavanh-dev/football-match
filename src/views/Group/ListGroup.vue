<template>
    <div class="container">
        <div class="box-title">
            <h4>
                ລາຍຊື່ກຸ່ມ
            </h4>
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
                        <vs-th id="table-index">
                            ລຳດັບ
                        </vs-th>
                        <vs-th>
                            ຊື່ກຸ່ມ
                        </vs-th>
                        <vs-th>
                            ຈຳນວນທີມ
                        </vs-th>
                        <vs-th>
                            ຈຳນວນນັດ
                        </vs-th>
                        <vs-th id="table-header-button"> </vs-th>
                    </vs-tr>
                </template>
                <template #tbody>
                    <vs-tr :key="index" v-for="(group, index) in $vs.getPage(ListGroup, page, max)"
                           :data="group">
                        <vs-td>
                        {{index +1}}
                        </vs-td>
                        <vs-td>
                            {{group.name}}
                        </vs-td>
                        <vs-td>
                            {{group.teams}}
                        </vs-td>
                        <vs-td>
                            {{group.play}}
                        </vs-td>



                        <vs-td style="text-align: right; width: 100px">
                            <div class="buttons">
                                <vs-button circle icon flat @click="OpenModalEdit(group.id)">
                                    <i class="fas fa-pencil-alt"></i>
                                </vs-button>
                                <vs-button circle danger icon flat @click="OpenModalDelete(group.id)">
                                    <i class="fas fa-trash-alt"></i>
                                </vs-button>
                            </div>
                        </vs-td>
                    </vs-tr>
                </template>
            </vs-table>
        </div>
        <ModalAdd>
            <template v-slot="{ close }">
                <AddGroup @close="close" @success="FetchData()" />
            </template>
        </ModalAdd>
        <ModalEdit>
            <template v-slot="{ close }">
                <EditGroup  @close="close" :EditGroup ="Groups" @success="FetchData()" />
            </template>
        </ModalEdit>

        <ModalDelete>
            <template v-slot="{ close }">
                <DeleteGroup @close="close" :Group_Delete="groupId" @success="FetchData()" />
            </template>
        </ModalDelete>
    </div>
</template>

<script>
    import  AddGroup from './CRUD/AddGroup'
   import EditGroup from './CRUD/EditGroup'
 import  DeleteGroup from './CRUD/DeleteGroup'

    export default {
        components: {
            AddGroup,
            EditGroup,
            DeleteGroup
        },
        data: () => ({
            active: 1,
            page: 1,
            max: 5,
            ListGroup:[],
            groupId:'',
            Groups:{},

        }),
        methods: {
            OpenModalAdd() {
                this.$store.commit("modalAdd_State", true);
            },

            filterGroup(GroupID) {
                return (
                    this.ListGroup.filter((item) => {
                        return item.id == GroupID;
                    })[0] || {}
                );
            },
            OpenModalEdit(groupId) {
                this.Groups = {
                    ...this.filterGroup(groupId)
                };
                this.$store.commit("modalEdit_State", true);
            },
            OpenModalDelete(groupId) {
                this.groupId = groupId
                this.$store.commit("modalDelete_State", true);
            },

            FetchData() {
                const id = this.$route.params.tournament_id;
                this.$axios.get(`tournament/${id}/group`, this.GroupAdd).then(res => {
                    setTimeout(() => {
                        this.$emit('close');
                    }, 200);
                    setTimeout(() => {
                        this.ListGroup = res.data;
                    }, 100);
                }).catch(() => {

                });
            },

        },

        created() {
            this.FetchData();
        }
    };
</script>

<style scoped>
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

    #table-index {
        width: 10px;
        text-align: center;
        margin-top: 50%;
    }

    #table-header-button {
        width: 150px;
    }

    #sponser {
        width: 200px;
    }

    .image-log-team {
        width: 60px;
        height:60px;
        margin-top: 8px;
    }
</style>
