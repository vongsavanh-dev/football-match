<template>
  <div class="container">
    <div class="box-title">
      <h4>
        ລາຍຊື່ Staff
      </h4>
      <span class="btn-add">
        <vs-tooltip primary border style="float: right">
            <vs-button class="btn-icon" circle icon flat @click="OpenModalAdd()">
                <i class="fas fa-plus"></i>
            </vs-button>
          <template #tooltip>
            <div class="text-tooltip">
              ເພີ່ມຂໍ້ມູນ
            </div>
          </template>
            </vs-tooltip>
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
              ຮູບພາບ
            </vs-th>
            <vs-th>
              ຊື່
            </vs-th>
            <vs-th id="sponser">
              ນາມສະກຸນ
            </vs-th>
            <vs-th id="sponser">
              ຕຳແໜ່ງ
            </vs-th>
            <vs-th id="table-header-button"></vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="index" v-for="(staff, index) in $vs.getPage(listStaff, page, max)" :data="staff">
            <vs-td>
              {{ index + 1 }}
            </vs-td>
            <vs-td>
              <img :src="staff.image_url" alt="" style="width:60px;height: 60px;">
            </vs-td>
            <vs-td>
              {{ staff.name }}
            </vs-td>
            <vs-td>
              {{ staff.sur_name }}
            </vs-td>
            <vs-td>
              {{ staff.player_position }}
            </vs-td>

            <vs-td style="text-align: right; width: 200px">
              <div class="buttons">
                <vs-tooltip warn border>
                  <vs-button circle icon flat @click="OpenModalEdit(staff.id)">
                    <i class="fas fa-pencil-alt"></i>
                  </vs-button>
                  <template #tooltip>
                    <div class="text-tooltip">
                      ແກ້ໄຂຂໍ້ມູນ
                    </div>
                  </template>
                </vs-tooltip>
                <vs-tooltip danger border>
                  <vs-button circle danger icon flat @click="OpenModalDelete(staff.id)">
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
          <vs-pagination v-model="page" :length="$vs.getLength(listStaff, max)"/>
        </template>
      </vs-table>
    </div>
    <ModalAdd>
      <template v-slot="{ close }">
        <AddStaff @close="close" :Staff_position="staffPosition" @success="FetchData()"/>
      </template>
    </ModalAdd>

    <ModalEdit>
      <template v-slot="{ close }">
        <EditStaff :Staff="staffs" :listposition="staffPosition" @close="close" @success="FetchData()"/>
      </template>
    </ModalEdit>
    <ModalDelete>
      <template v-slot="{ close }">
        <DeleteStaff @close="close" :Delete_staff="staffId" @success="FetchData()"/>
      </template>
    </ModalDelete>
  </div>
</template>

<script>
import AddStaff from "@/views/Staff/CRUD/AddStaff";
import DeleteStaff from "@/views/Staff/CRUD/DeleteStaff";
import EditStaff from "@/views/Staff/CRUD/EditStaff";

export default {
  components: {
    AddStaff,
    DeleteStaff,
    EditStaff,
  },
  data: () => ({
    // active: 1,
    page: 1,
    max: 5,
    staffPosition: [],
    listStaff: [],
    staffs: {},
    staffId: '',
  }),
  methods: {
    OpenModalAdd() {
      this.$store.commit("modalAdd_State", true);
    },
    filterStaff(StaffID) {
      return (
          this.listStaff.filter((item) => {
            return item.id == StaffID;
          })[0] || {}
      );
    },
    OpenModalEdit(staffId) {
      this.staffs = {
        ...this.filterStaff(staffId)
      };
      this.$store.commit("modalEdit_State", true);
    },

    OpenModalDelete(staffId) {
      this.staffId = staffId
      this.$store.commit("modalDelete_State", true);
    },
    FetchData() {
      const id = this.$route.params.team_id;
      this.$axios.get(`team/${id}/staff`).then(res => {
        setTimeout(() => {
          this.$emit('close');
        }, 200);
        setTimeout(() => {
          this.listStaff = res.data.staff_lists;
        }, 100);
      }).catch(() => {

      });
    },

    getStaffPosition() {
      const id = this.$route.params.team_id;
      this.$axios.get(`team/${id}/staff`).then((res) => {
        this.staffPosition = res.data.position
      })
    },

  },

  created() {
    this.FetchData();
    this.getStaffPosition();
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
  height: 60px;
  margin-top: 8px;
}
</style>
