<template>
    <div>
     <div class="card-container">
         <span class="pro">{{Player_View.player_position}}</span>
         <img class="round" :src="Player_View.image_url"/>
         <div class="Player-name">
           <h2> ຊື່ ນາມສະກຸນ: {{Player_View.name}} {{Player_View.sur_name}}</h2>
           <h2>ອາຍຸ : {{Player_View.age}}</h2>
             <hr>
         </div>
     </div>
        <div class="skill">
          <div class="columns">
              <div class="column is-10 skill-name">
                 <h3 class="skill-player">ຈຳນວນປະຕູທີ່ຍິງ</h3>
                  <h3 class="skill-player">ຈຳນວນ Assist</h3>
                  <h3 class="skill-player">ໃບແດງ</h3>
                  <h3 class="skill-player">ໃບເຫຼືອງ</h3>
              </div>
              <div class="column is-2" style="white-space: nowrap">
                  <h3 class="skill-player">{{playerStatic.goal_score}} ປະຕູ</h3>
                  <h3 class="skill-player">{{playerStatic.assist_score}} ປະຕູ</h3>
                  <h3 class="skill-player">{{playerStatic.red_card}} ໃບ</h3>
                  <h3 class="skill-player">{{playerStatic.yellow_card}} ໃບ</h3>
              </div>
          </div>
        </div>
 </div>
</template>

<script>
export default {

props:['Player_View'],

    data(){
        return{
            player_id:'',
            playerStatic:[],
        }
    },
    methods:{
    //get ka player static ma show
        getPlayerStatic(){
            this.$axios.get(`player/${this.Player_View.id}/static`).then(res => {
                // console.log(res)
                setTimeout(() => {
                    this.playerStatic = res.data.static;
                    console.log(this.playerStatic)
                }, 100);
            }).catch(() => {

            });
        }
    },
    created(){
    this.getPlayerStatic();
    }
}

</script>

<style scoped>
    .card-container .pro {
        color: #ffffff;
        background-color: #FEBB0B;
        border-radius: 50px;
        font-size: 14px;
        font-weight: bold;
        padding: 2px 10px;
        position: absolute;
        top: 30px;
        left: 30px;

    }
    .Player-name{
        /*color: #ffffff;*/
        /*background-color: #FEBB0B;*/
        /*border-radius: 50px;*/
        /*background-color: #FEBB0B;*/
        font-size: 18px;
        font-weight: bold;
        padding: 2px;
        margin: 5px 100px 30px 100px;
    }

    .card-container .round {
        /*border: 2px solid #FEBB0B;*/
        border-radius: 50%;
        padding: 7px;
        width: 200px;
        height: 200px;
    }
    .skill{
        /*background-color: #FEBB0B;*/
        border-radius: 3px;
        font-size: 14px;
        font-weight: bold;
        padding: 3px 7px;
        /*color: #ffffff;*/
        color: #020202;
    }
    /*.skill-name{*/
    /*    background-color: red;*/
    /*}*/
    .column .skill-player{
        font-size: 20px;
        text-align: left;
    }
</style>
