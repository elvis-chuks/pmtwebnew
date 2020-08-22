<template>
    <div>
        <MainNav/>
        <main>
            <section class="passenger-details">
                <p class="medium-text">Passenger Details</p>
                <hr>
                <div class="inputs">
                    <div class="first-group">
                        <div class="form-group number">
                            <label for="number" class="label">Phone Number</label>
                            <!-- placeholder="Phone Number" -->
                            <input type="text" id="number" v-model="number"  class="form-control" maxlength="11" @input="checkBook()">
                        </div>
                        <div class="form-group">
                            <label for="title" class="label">Title</label>
                            <select v-model="title" name="title" id="title" class="form-control" placeholder="Title">
                                <option selected disabled>Title</option>
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                                <option value="Chief">Chief</option>
                                <option value="Ms">Ms</option>
                                <option value="Alhaji">Alhaji</option>
                                <option value="Mazi">Mazi</option>
                                <option value="Oba">Oba</option>
                                <option value="Nze">Nze</option>
                                <option value="Obi">Obi</option>
                                <option value="Deacon">Deacon</option>
                                <option value="Rev">Rev</option>
                                <option value="Fr.">Fr.</option>
                                <option value="Igwe">Igwe</option>
                                <option value="NA">NA</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="gender" class="label">Gender</label>
                            <select v-model="gender" name="gender" id="gender" class="form-control">
                                <option selected disabled>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div class="second-group">
                        <div class="form-group">
                            <input type="text" v-model="firstName" placeholder="Firstname" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="lastName" placeholder="Lastname" class="form-control">
                        </div>
                    </div>
                    <div class="third-group">
                        <div class="form-group">
                            <input type="text" v-model="email" placeholder="Email address" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="DOB" placeholder="dd/mm" class="form-control">
                        </div>
                    </div>
                    <hr style="margin-top:10px;">
                    <div class="fourth-group">
                        <div class="form-group">
                            <input type="text" v-model="nextname" placeholder="Next of kin name" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="nextnumber" placeholder="Next of kin number" class="form-control">
                        </div>
                    </div>
                    
                </div>
            </section>
            <section class="trip-details">
                <div class="trip-header">
                    <p>Trip Details</p>
                </div>
                <div class="trip-route">
                    <p class="small-text">From</p>
                    <p class="medium-text">{{tripData.from}}</p>
                    <p class="small-text">To</p>
                    <p class="medium-text">{{tripData.to}}</p>
                </div>
                <hr>
                <div class="bus-details">
                    <p class="small-text">Bus Details</p>
                    <p class="medium-text" v-if="tripData.busClassID == '3'">Air conditioned</p>
                    <p class="medium-text" v-else>No Air conditioner</p>
                </div>
                <div class="price-tag">
                    <div class="price-seat">
                        <p class="small-text">Price per seat</p>
                        <p class="medium-text">₦ {{tripData.price}}</p>
                    </div>
                    <div class="price-final">
                        <p class="small-text">Total Price</p>
                        <p class="medium-text">₦ {{tripData.price * tripData.selectedSeats.length}}</p>
                    </div>
                </div>
                <div class="proceed">
                    <button @click="overview()" class="btn-lg">Proceed to Pay</button>
                </div>
            </section>
        </main>
        <Footer/>
    </div>
</template>

<script>
import MainNav from '@/components/mainnav'
import Footer from '@/components/footer'
export default {
    name : "Details",
    components:{
        MainNav,
        Footer,
    },
    mounted(){
        // if(this.checkCookie("pmt_user")){
        //     var deets = JSON.parse(this.getCookie("pmt_user"));
        //     this.number = deets.number;
        //     this.DOB = deets.DOB;
        //     this.email = deets.email;
        //     this.firstName = deets.firstName;
        //     this.lastName = deets.lastName;
        //     this.gender = deets.gender;
        //     this.nextname = deets.nextname;
        //     this.nextnumber = deets.nextnumber;
        //     this.title = deets.title;
        // }
    },
    data(){
        return{
            tripData:this.$store.getters.getTrips,
            base_url:this.$store.getters.getUrl,
            number:"",
            DOB:"",
            email:"",
            firstName:"",
            lastName:"",
            gender:"",
            nextname:"",
            nextnumber:"",
            title:"",

        }
    },
    methods:{
        overview(){
            var payload = {
                number:this.number,
                DOB:this.DOB,
                email:this.email,
                firstName:this.firstName,
                lastName:this.lastName,
                gender:this.gender,
                nextname:this.nextname,
                nextnumber:this.nextnumber,
                title:this.title,
            }
            console.log(payload)

            this.$store.commit("updateTrip",payload);
            this.$router.push({name:'overview'})
            this.setCookie("pmt_user", JSON.stringify(payload), 360)
            
        },
        checkBook(){
            if(this.number.length == 11){
                var formatNo = this.number.substring(1);
                formatNo = '234'+formatNo;
                fetch(this.base_url+'/v2/checkbook',{
                    headers:{
                        phoneNumber:formatNo
                    }
                })
                .then(resp => resp.json())
                .then(data => {
                    if(data.status == 'found'){
                        
                        this.DOB = data.DOB;
                        this.email = data.email;
                        this.firstName = data.firstName;
                        this.lastName = data.lastName;
                        this.gender = data.gender;
                        this.nextname = data.nextOfKinFullName;
                        this.nextnumber = data.nextOfKinPhoneNumber;
                        this.title = data.title;
                    }
                    // console.log(data)
                })
            }
        },
        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
        getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        checkCookie(name) {
            var username = this.getCookie(name);
            if (username != "") {
                return true;
            } else {
                return false;
                }
            },
        }
}
</script>

<style scoped>

.label{
    font-size:11px;
    margin-left:5px;
    color:grey;
}


.first-group,.second-group,.third-group,.fourth-group{
    display: flex;
}
.form-group{
    flex:1;
    margin:5px;
}
.number{
    flex:2;
}
.form-control{
    width:100%;
    padding:10px;
    height:40px;
    background: #F7F7F7;
    border-radius: 10px;
    border:none;
    -webkit-appearance: none;
}
.passenger-details{
    flex:2;
    background:white;
    margin-right:10px;
    margin-top:55px;
    border-radius:15px;
    padding:30px;
}
.medium-text{
    margin-bottom:5px;
}
hr{
    margin-bottom:10px;
}
.price-tag{
    display: flex;
}
.price-seat,.price-final{
    flex:1
}
.bus-seats{
    margin-top: 20px;
    margin-left:250px;
    
}
.seat-select{
    flex:2;
    justify-content: space-around;
}
.small-text{
    font-size:13px;
    color:grey;
}
hr{
    color:grey;
    height:1px;
}
.trip-route{
    margin-top:20px;
    margin-bottom:20px;
}
.bus-details{
    margin-top:20px;
    margin-bottom:20px;
}
main{
   width:90%;
   margin:auto;
   margin-top:30px;
   display:flex;
}

.trip-details{
    flex:1;
    background: white;
    height:60vh;
    margin-bottom:10px;
    border-radius: 10px;
    padding:20px;
    margin-top:55px;
}
.proceed{
    width:100%;
    margin:auto;
}
.proceed .btn-lg{
    width:90%;
    border-radius:10px;
    padding:10px;
    border:none;
    color:white;
    background:#f36713;
    margin-left:20px;
    margin-top:15px;
}

@keyframes righty {
    0%{
        opacity:0;
        transform: translateX(-30px);
    }
    100%{
        opacity:1;
        transform: translateX(0px);
    }
}
@media (max-width: 1024px) {
    main{
        flex-direction: column;
        
    }
    .bus-seats{
        margin-left:0;
        width:100%;
    }
    .trip-details{
        width:100%;
    }
    .proceed .btn-lg{
        margin-left:15px;
    }
    .first-group,.second-group,.third-group,.fourth-group{
        flex-direction: column;
    }
}
</style>