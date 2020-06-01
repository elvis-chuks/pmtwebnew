<template>
  <div>
      <div class="main">
          <MainNav/>
          <section class="salutation">
            <h4>Where to next?</h4>
            <p>From here you're almost there.</p>
        </section>
        
        <section class="book-form">
            <div class="group">
                <select name="depot" id="depot" @change="zroute()">
                    <option value="">Departure Location</option>
                    <option
                    v-for="depot in depots"
                    :id="depot.depotcode"
                    :key="depot.depotnumber"
                    :value="depot.depotcode">
                    {{depot.name}}
                    </option>
                </select>
                <select name="depot" id="route" @change="update()">
                    <option value="">Arrival Location</option>
                    <option
                    v-for="route in routes"
                    :id="route.routeid"
                    :key="route.routeid"
                    :value="route.routeid">
                    {{route.routename}}
                    </option>
                </select>
                <!-- <input v-model="date" type="date" name="departuredate" id="departuredate" :min="min_max[0]" :max="min_max[1]" > -->
                <select name="departuredare" id="departuredate" v-model="date">
                    <option value="">Select departure date</option>
                    <option
                    v-for="date in min_max"
                    :key="date"
                    >{{ date }}</option>
                </select>
                <!-- <router-link tag="button" :to="{name:'Trips'}" id="search">Search</router-link> -->
                <button @click="goTrips()"  id="search">Search</button>
            </div>
            
        </section>
        <section class="loader-modal" v-show="loading" style="z-index=100;">
            <div class="loader" id="loader"></div>
        </section>
        <!-- <section class="facilities">
            <div class="facility-header">
                <p>Facilities and Services of our Buses.</p>
            </div>
            <div class="facility-body">
                <div class="facility-column">
                    <div class="economy">
                        <p class="small-title ">Economy</p>
                    </div>
                </div>
                <div class="facility-column ">
                    <div class="executive">
                        <p class="small-title">Executive (A/C)</p>
                    </div>
                    <div class="items">
                            
                    </div>
                </div>
            </div>
        </section> -->
        <section class="details">
            <div class="mobile-app right-slide" @click="newWindow()">
                <p class="title">Book via our Mobile App</p>
                <div class="mobile-content">
                    <div class="img">
                        <img src="../assets/app.jpg" alt="app">
                    </div>
                    <div class="text">
                        <p class="small-title">Your trip is a touch away. Manage your booking, tickets and much more.</p>
                        <p class="tiny-text">Currently available on Play Store</p>
                    </div>
                </div>
            </div>
            <div class="ussd left-slide">
                <p class="title">*452*X#</p>
                <p class="small-title">Book via USSD</p>
            </div>
        </section>
      </div>
    
    <main>
        
        
    </main>
    <Footer/>
  </div>
</template>

<script>
import MainNav from '@/components/mainnav'
import Footer from '@/components/footer'

export default {
  name: 'Home',
  components:{
      MainNav,
      Footer,
  },
  data () {
    return {
      msg: '',
      base_url:this.$store.getters.getUrl,
      loading:true,
      depots:[],
      routes:[],
      date:"",
      routeid:"",
    }
  },
  mounted(){
    this.setup();
    this.home();
    // clear trips data from store
    this.$store.dispatch("clearTrips")
    // end clear
    // var isInViewport = function(elem){
    //     var bounding = elem.getBoundingClientRect();
    //     return (
    //         bounding.top >= 0 &&
    //         bounding.left >= 0 &&
    //         bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //         bounding.right <= (window.innerWidth || document.document.documentElement.clientWidth)
    //     );
    // }
    // var details = document.querySelector('.details')
    // window.addEventListener('scroll',function (event){
    //     var mobile = document.querySelector('.mobile-app');
    //     var ussd = document.querySelector('.ussd')
    //     if(mobile != null && ussd != null){
    //         if(isInViewport(details)){
    //             mobile.classList.add('right-scroll')
    //             ussd.classList.add('left-slide')
    //         }else{
    //             mobile.classList.remove('right-scroll')
    //             ussd.classList.remove('left-slide')
    //         }
    //     }
    // });


  },
  methods:{
      newWindow(){
          var url = "https://play.google.com/store/apps/details?id=com.pmt.app"
          window.location = url;
      },
      update(){
          this.routeid = document.getElementById('route').value;
      },
      setup(){
          this.loading = true;
          fetch(this.base_url+'/v2/setup')
          .then(resp => resp.json())
          .then(data => {
              this.loading = false;
              if(data.status == 'found'){
                  this.$store.commit("updateSettings",data.settings);
              }
          })
      },
      home(){
          fetch(this.base_url+'/v2/home')
          .then(resp => resp.json())
          .then(data => {
              this.loading = false;
              if(data.status == 'found'){
                  data.depot.forEach(depot => {
                      this.depots.push(depot)
                  })
              }
          })
      },
      zroute(){
          this.loading = true;
          var code = document.getElementById('depot').value;
          fetch(this.base_url+'/v2/zroute',{
              headers:{
                  depotCode:code,
              }
          })
          .then(resp => resp.json())
          .then(data => {
              if(data.status == 'found'){
                  this.routes = [];
                  data.routes.forEach(route => {
                      this.routes.push(route)
                  })
                  this.loading = false;

                
              }
          })
      },
      goTrips(){
        if(document.getElementById('depot').value != "" || document.getElementById('route').value != "" && this.date == ""){
            var from = document.getElementById(document.getElementById('depot').value).textContent
            var to = document.getElementById(this.routeid).textContent
            var payload = {
                from:from.replace(/\s+/g,''),
                to:to.replace(/\s+/g,''),
                date:this.date,
                routeid:document.getElementById('route').value,
                depotcode:document.getElementById('depot').value,
            }
            this.$store.commit("updateTrip",payload);
            this.$router.push({name:'Trips'})   
        }else{
            console.log("shit")
        }
      },
  },
  computed:{
      min_max(){
      var min,max;

      var year = new Date().getFullYear();

      var month = new Date().getMonth() + 1;

      var min_day = new Date().getDate() + 1;

      
      
      var month30 = [10,4,6,11]
    //   var feb = [2]

      if(month30.includes(month)){
          if(min_day >= 30){
              min_day = 1;
              month += 1;
          }
      }
      if(month == 2){
          if (min_day >= 29){
              min_day = 1;
              month += 1;
          }
      }

      if(!month30.includes(month) && month != 2){
          if(min_day >= 31){
              min_day = 1;
              month += 1;
          }
      }
    var max_day = min_day + parseInt(this.$store.getters.bookableDates) - 1;
      month = month.toString()
      min_day = min_day.toString()
      max_day = max_day.toString()

      if (month.length == 1){
        month = '0'+month
      }
      if(max_day.length == 1){
        max_day = "0"+max_day
      }
      if(min_day.length == 1){
        min_day = "0"+min_day
      }



      min = year + '-' + month + '-' + min_day
      max = year + '-' + month + '-' + max_day

      var minMax = []
      minMax.push(min)
      minMax.push(max)
      return minMax
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loader-modal{
    width:90%;
    margin:auto;
    display: flex;
    justify-content: center;
    margin-top:20px;
}
.loader{
	border: 3px solid #f3f3f3;
	border-top:3px solid #3498db;
	border-radius:50%;
	width:20px;
	height:20px;
	animation: spin 2s linear infinite;
}
@keyframes spin {
    0% { transform: rotate(0deg);}
    100% {transform:rotate(360deg)}
}
.main{
    background:url('../assets/background.jpg');
}
.salutation{
    width:90%;
    margin:auto;
    align-content: center;
    justify-content: center;
    /* color: #2F0054; */
    color:white;
    text-align: center;
    margin-top:10px;
    animation: drop 1.5s ease;
}
.salutation p{
    margin-top:10px;
}
.book-form .group{
    width:90%;
    margin:auto;
    margin-top:30px;
    display: flex;
    animation: toosie-slide 1.5s ease;
}
.book-form .group select, input{
    width:330px;
    height:45px;
    border: none;
    border-right:1px solid rgba(1, 3, 2, 0.1);
    padding-left:20px;
    color:grey;
    -webkit-appearance: none;
}

#depot{
    border-radius: 15px 0px 0px 15px;
}
.book-form .group input{
    border-right:none;
    -webkit-appearance: none;
}
.book-form button{
    border:none;
    width:110px;
    border-radius: 0px 15px 15px 0px;
    background:#2F0054 ;
    color:white;
    cursor: grab;
}
.salutation h4{
    font-size: 44px;
    font-weight: 400;
}
.salutation p{
    margin-top:-10px;
}
.book-form{
    display: flex;
    align-items: center;
    justify-content: center;
    height:100%;
    margin-left:60px;
    margin-bottom:50px;
}



@keyframes drop {
    0%{
        opacity:0;
        transform: translateX(-30px);
    }
    100%{
        opacity:1;
        transform: translateX(0px);
    }
}

@keyframes righty {
    0%{
        opacity:0;
        transform: translateX(-30px);
    }
    100%{
        opacity:0.5;
        transform: translateX(0px);
    }
}
@keyframes left-slide {
    0%{
        opacity:0;
        transform: translateX(30px);
    }
    100%{
        opacity:0.5;
        transform: translateX(0px);
    }
}
@keyframes toosie-slide {
    0%{
        opacity:0;
        transform: translateX(50px);
    }
    100%{
        opacity:1;
        transform: translateX(0px);
    }
}

.facilities{
    width:50%;
    margin:auto;
    /* margin-top:50px; */
    /* padding:20px; */
    color:#2F0054;
    animation: drop 1.5s ease;
}

.facility-header{
    text-align: center;
    /* color:#2F0054; */
    color:white;
    font-weight: 540;
}

.facility-body{
    display: flex;
    padding:20px;
    margin:20px;
    background:white;
    height:50vh;
    /* background: lightblue; */
}

.facility-column{
    flex:1;
    
}
.economy{
    flex:1;
    
}
.executive{
    flex:1;
    display: flex;
    justify-content:flex-end;
}

.details{
    width:65%;
    margin:auto;
    display:flex;
    padding-bottom:40px;
}
.mobile-app,.ussd{
    flex:1;
    margin:10px;
}
.mobile-app{
    background:#a081d9;
    color:white;
    padding:20px;
    border-radius:10px;
    border:none; 
    cursor:pointer;
}

.right-slide{
    animation: righty 1.4s ease;
}
.left-slide{
    animation: left-slide 1.4s ease;
}
.mobile-content{
    display: flex;
    margin-top:10px;
}
.mobile-content img{
    width:100px;
    padding-right:10px;
}
.ussd{
    background:#f36713;
    color:white;
    padding:20px;
    border-radius:10px;
    border:none;   
}
.details .title{
    font-weight:600;
    font-size:30px;
}
.details .tiny-text{
    font-size:14px;
}

@media (max-width: 1024px) {
.loader-modal{
    margin-top:-220px;
    margin-bottom:20px;
    /* flex-direction: column; */
}
 .group{
     flex-direction: column;
 }   
 .book-form{
     margin:auto;
     flex-direction: column;
     height:500px;
 }
 #depot{
     border-radius: 0px;
 }
 #route,#departuredate,#search{
     margin-top:10px;
 }
 .salutation h4{
    font-size: 24px;
    font-weight: 400;
}
.salutation p{
    margin-top:-10px;
}

.book-form .group select, input{
    width:100%;
    border:none;
}

.book-form button{
    width:100%;
    border-radius: 10px;
    background:#2F0054;
    color:white;
    padding:10px;
}
.facilities{
    margin-top:-180px;
    width:90%;
}
.facility-body{
    flex-direction: column;
}
.executive{
    justify-content:flex-start;
}

.details{
    flex-direction: column;
    width:90%;
    /* margin-top:-180px; */
}

}
</style>
