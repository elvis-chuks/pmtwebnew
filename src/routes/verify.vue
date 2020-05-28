<template>
    <div class="main">
        <MainNav/>
        <main>
            <section class="intro">
                <div class="intro-text">
                    <h1>Verify your booking</h1>
                    <p>Most times we need to be sure if our transaction or booking has been confirmed
                        or approved.</p>
                    <Grid class="tab"
                    :style="{height:'200px'}"
                    :data-items="rows"
                    :columns="columns">
                </Grid>
                </div>
                <div class="intro-form">
                    <div class="form">
                        <h1>Verify booking</h1>
                        <hr>
                        <label for="date">Booking Date</label>
                        <input type="date" class="form-control" id="date" v-model="date">
                        <label for="number">Phone number</label>
                        <input type="text" class="form-control" id="number" v-model="number">
                        <button class="search" @click="verify()">Search</button>
                        <p>{{remark}}</p>
                        <section class="loader-modal" v-show="loading">
                            <div class="loader" id="loader"></div>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
import MainNav from '@/components/mainnav'
export default {
    name:"Verify",
    components:{
        MainNav
    },
    mounted(){
        this.date = this.getdate;
    },
    data(){
        return {
            loading : false,
            date:'',
            number:'',
            failed:[],
            success:[],
            remark:'',
            baseUrl:this.$store.getters.getUrl,
            rows:[],
            columns:[
                {
                    label:'Route Name',
                    field:'routename'
                },
                {
                    label:'Seats',
                    field:'seats'
                },
                {
                    label:'Status',
                    field:'status',
                }
            ]
        }
    },
    methods:{
        formatNumber(num){
          num = num.substring(1);

          var prefix = '234'
          var newNumber = prefix + num;
          return newNumber
      },
        verify(){
            this.remark = ""
            this.loading = true;
            fetch(this.baseUrl+'/v3/verifybooking',{
                headers:{
                    bookingDate:this.date,
                    number:this.formatNumber(this.number),
                }
            })
            .then(resp => resp.json())
            .then(data => {
                this.loading = false;
                console.log(data)
                if(data.status == 'done'){
                    if(data.success.length == 0 && data.failed.length == 0){
                        this.remark = "No booking records for this date and number"
                    }
                    this.rows = [];
                    data.success.forEach(suc => {
                        suc.status = 'success'
                        this.rows.push(suc)
                    });
                    
                    data.failed.forEach(fai => {
                        fai.status = 'failed'
                        this.rows.push(fai)
                    })
                }
            })
        }
    },
    computed:{
        getdate(){
            var year = new Date().getFullYear();
            var month = new Date().getMonth() + 1;
            var day = new Date().getDate();

            if(month.toString.length == 1){

                month = '0'+month.toString()
            }

            return year + '-' + month + '-' + day
        },
    }
}
</script>
<style>
.tab{
    margin-top:50px;
}
input{
    border:1px solid grey;
}
input{
    padding-left:20px;
}
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
    background-image:url('../assets/background.jpg');
    height:100vh;
}
.form h1{
    color:indigo;
}
.form-control{
    width:100%;
    margin-top:10px;
    height:35px;
    border-radius:10px;
}
.search{
    width:100%;
    margin-top:10px;
    height:35px;
    border:none;
    border-radius:10px;
    background: #2F0054;
    color:white;
}
hr{
    margin-bottom:20px;
}
main{
    width:90%;
    margin:auto;
}
.intro-text{
    color:white;
    flex:1;
    margin:10px;
}
.intro-form{
    flex:1;
    margin:10px;
}
.intro-form select,button{
    display:block;
}
.form{
    background:white;
    padding:50px;
    border-radius:15px;
    width:80%;
    margin-left:50px;
}
.intro{
    display:flex;
    min-height:60vh;
    align-items: center;
}
@media(max-width:528px){
    .intro{
        flex-direction: column;
    }
    .form{
        margin-left:0px;
        width:100%;
    }
}
</style>