<template>
  <div class="container">
    <div class="box-title">
      <h4 class="highlight">
        HighLight<span>Match</span>
      </h4>
      <span class="btn-add">
          <vs-tooltip primary border style="float: right">
              <vs-button class="btn-icon" circle icon flat @click="OpenModalAdd()">
                <i class="fas fa-plus"></i>
            </vs-button>
            <template #tooltip>
              <div class="text-tooltip">
                ເພີ່ມ
              </div>
            </template>
          </vs-tooltip>

        </span>
    </div>

    <div class="center">
      <vs-table>
        <template #thead>
          <vs-tr class="table-header">
            <vs-th>
              title
            </vs-th>
            <vs-th>
              Video URL
            </vs-th>
            <vs-th>

            </vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="index " v-for="(highlight, index) in $vs.getPage(highlights, page, max)" :data="highlight">
            <vs-td>
              {{ highlight.title }}
            </vs-td>
            <vs-td>
              {{ highlight.video_url }}
            </vs-td>
            <vs-td class="btn-action">
              <div class="buttons">
                <vs-tooltip border warn>
                  <vs-button circle icon flat @click="OpenModalEdit(highlight.id)">
                    <i class="fas fa-pencil-alt"></i>
                  </vs-button>
                  <template #tooltip>
                    <div class="text-tooltip">
                      ແກ້ໄຂ
                    </div>
                  </template>
                </vs-tooltip>

                <vs-tooltip danger border>
                  <vs-button circle danger icon flat @click="OpenModalDelete(highlight.id)">
                    <i class="fas fa-trash-alt"></i>
                  </vs-button>
                  <template #tooltip>
                    <div class="text-tooltip">
                      ລືບ
                    </div>
                  </template>
                </vs-tooltip>
              </div>
            </vs-td>
          </vs-tr>
        </template>
        <!--        <template #footer>-->
        <!--          <vs-pagination v-model="page" :length="$vs.getLength(teams, max)" />-->

        <!--        </template>-->
      </vs-table>
    </div>
    <ModalAdd>
      <template v-slot="{ close }">
        <AddHighlight @close="close" @success="FetchData()"/>
      </template>
    </ModalAdd>
        <ModalEdit>
          <template v-slot="{ close }">
            <EditHighLight :EditHighlight="ListHighlight" @close="close" @success="FetchData()" />
          </template>
        </ModalEdit>

        <ModalDelete>
          <template v-slot="{ close }">
            <DeleteHighlight  :Highlight_Delete="Highlight_ID" @close="close"  @success="FetchData()" />
          </template>
        </ModalDelete>
  </div>
</template>

<script>
import AddHighlight from "@/views/MatchHightLight/CRUD/AddHightLight";
import EditHighLight from "@/views/MatchHightLight/CRUD/EditHighLight";
import DeleteHighlight from "@/views/MatchHightLight/CRUD/DeleteHighlight";


export default {
  components: {
    AddHighlight,
    EditHighLight,
    DeleteHighlight

  },
  data: () => ({
    page: 1,
    max: 5,
    highlights: [],
    ListHighlight:{},
    Highlight_ID :'',
  }),
  methods: {
    OpenModalAdd() {
      this.$store.commit("modalAdd_State", true);
    },
    filterMatch(MatchID) {
      return (
          this.highlights.filter((item) => {
            return item.id == MatchID;
          })[0] || {}
      );
    },
    OpenModalEdit(highlight) {
      this.ListHighlight = {
        ...this.filterMatch(highlight)
      };
      this.$store.commit("modalEdit_State", true);
    },

    OpenModalDelete(highlight_id) {
      this.Highlight_ID = highlight_id
      this.$store.commit("modalDelete_State", true);
    },

    FetchData() {
      const id = this.$route.params.match_id;
      this.$axios.get(`match/${id}/highligth`,).then(res => {
        if (res) {
          this.highlights = res.data
        }
        setTimeout(() => {
          this.$emit('close');
        }, 200);
        setTimeout(() => {
          // this.teams = res.data.data;
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

.btn-action .buttons {
  width: 200px;
}
.highlight span{
  color: #cc1010;
  margin-left: 5px;
  border-radius: 10px;
}

</style>
