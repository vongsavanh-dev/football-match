<template>
  <div class="container">
    <div class="box-title">
      <h4>
        ຕຳແໜ່ງ
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
            <vs-th>
              ລຳດັບ
            </vs-th>
            <vs-th>
              ຕຳແໜ່ງ
            </vs-th>

            <vs-th> </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="i" v-for="(tr, i) in users" :data="tr">
            <vs-td>
              {{ tr.name }}
            </vs-td>
            <vs-td>
              {{ tr.email }}
            </vs-td>

            <vs-td>
              <div class="buttons">
                <vs-button circle icon flat @click="OpenModalEdit()">
                  <i class="fas fa-pencil-alt"></i>
                </vs-button>
                <vs-button circle icon flat @click="OpenModalDelete()">
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
        <AddPosition @close="close" @success="FetchData()" />
      </template>
    </ModalAdd>
    <ModalEdit>
      <template v-slot="{ close }">
        <EditPosition @close="close" @success="FetchData()" />
      </template>
    </ModalEdit>

    <ModalDelete>
      <template v-slot="{ close }">
        <DeletePosition @close="close" @success="FetchData()" />
      </template>
    </ModalDelete>
  </div>
</template>

<script>
import AddPosition from "./CRUD/AddPosition";
import EditPosition from "./CRUD/EditPosition";
import DeletePosition from "./CRUD/DeletePosition";
export default {
  components: {
    AddPosition,
    EditPosition,
    DeletePosition,
  },
  data: () => ({
    users: [
      {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        website: "hildegard.org",
      },
      {
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        website: "anastasia.net",
      },
    ],
  }),
  methods: {
    OpenModalAdd() {
      this.$store.commit("modalAdd_State", true);
    },
    OpenModalEdit() {
      this.$store.commit("modalEdit_State", true);
    },
    OpenModalDelete() {
      this.$store.commit("modalDelete_State", true);
    },
  },
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
</style>
