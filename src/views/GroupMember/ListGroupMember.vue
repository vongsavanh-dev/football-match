<template>
  <div class="container">
    <div class="box-title">
      <h4>
        ລາຍຊື່ທີມພາຍໃນກຸ່ມ
      </h4>
      <div class="create-match" style="margin-left:auto;margin-right: auto;width: 50%;">
        <vs-button style="margin-left:auto;margin-right: auto;width: 20%;font-size: 20px;"
                   v-if="!btnstatusMatch"
                   @click="CreateMatch()">
          <i class="fas fa-play-circle"></i> ສ້າງເເມັດ
        </vs-button>
        <span v-else style="color:red">ກຸ່ມນີ້ມີເເມັດການແຂ່ງຂັນແລ້ວ</span>

      </div>
      <span class="btn-add">
      <vs-tooltip primary border style="float: right;">
       <vs-button class="btn-icon" circle icon flat @click="OpenModalAdd()">
          <i class="fas fa-plus"></i>
        </vs-button>
        <template #tooltip>
          <div class="text-tooltip">
            ເພີ່ມຂໍ້ມູນທີມ
          </div>
        </template>
              </vs-tooltip>


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

            <vs-th></vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="index" v-for="(groupmember, index) in
                    $vs.getPage(ListGroupMember,
                    page, max)"
                 :data="ListGroupMember">
            <vs-td>
              {{ index + 1 }}
            </vs-td>
            <vs-td>
              {{ groupmember.team_name }}
            </vs-td>

            <vs-td>
              {{ groupmember.group_name }}
            </vs-td>

            <vs-td style="">
              <div class="buttons">
                <vs-tooltip danger border>
                  <vs-button circle danger icon flat
                             @click="OpenModalDelete(groupmember.id)">
                    <i class="fas fa-trash-alt"></i>
                  </vs-button>
                  <template #tooltip>
                    <div class="text-tooltip">
                      ລຶບຂໍ້ມູນ
                    </div>
                  </template>
                </vs-tooltip>

              </div>
            </vs-td>
          </vs-tr>
        </template>

        <template #footer>
          <vs-pagination v-model="page" :length="$vs.getLength(ListGroupMember, max)"/>
        </template>
      </vs-table>
    </div>
    <ModalAdd>
      <template v-slot="{ close }">
        <AddGroupMember @close="close" @success="FetchData()"/>
      </template>
    </ModalAdd>
    <ModalDelete>
      <template v-slot="{ close }">
        <DeleteGroupMember :teammember_Delete="groupmember_id" @close="close" @success="FetchData()"/>
      </template>
    </ModalDelete>
  </div>
</template>

<script>
import AddGroupMember from "./CRUD/AddGroupMember";
import DeleteGroupMember from './CRUD/DeleteGroupMember'
// import ListGroup from "@/views/Group/ListGroup";
export default {
  components: {
    AddGroupMember,
    DeleteGroupMember

  },
  data: () => ({
    page: 1,
    max: 5,
    ListGroupMember: [],
    teams: [],
    groupmember_id: '',
    memberlist: [],
    btnstatusMatch: ''
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
      // console.log(this.groupmember_id)
      this.$store.commit("modalDelete_State", true);
    },

    //get list team in group-member
    FetchData() {
      const tournament_id = this.$route.params.tournament_id;
      const id = this.$route.params.group_id;
      this.$axios.get(`tournament/${tournament_id}/group/${id}/group-member`,
          this.GroupMember).then(res => {
        console.log(res)
        setTimeout(() => {
          this.$emit('close');
        }, 200);
        setTimeout(() => {
          this.ListGroupMember = res.data.member;
          this.btnstatusMatch = res.data.create;
        }, 100);
      }).catch(() => {

      });
    },


    CreateMatch() {
      const tournament_id = this.$route.params.tournament_id;
      const id = this.$route.params.group_id;
      this.$axios.get(`tournament/${tournament_id}/group/${id}/group-member/create-match`,
      ).then(() => {
        setTimeout(() => {
          this.$emit('close');
          this.$emit('success');
          this.$notification.OpenNotification_AddItem_OnSuccess('top-right', 'primary', 3000);
        }, 300);
        this.$router.push({
          name: 'Match'
        })
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

.buttons {
  width: 150px;
  text-align: right;
}

.btn-create-match .btn-icon {
  margin-left: 550px;

}

</style>
