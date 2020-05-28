<template>
    <div>
        <MainNav/>
        <main>
            <section class="trip-details">
                <div class="trip-header">
                    <p>Trip Details</p>
                </div>
                <hr style="margin-top:5px;">
                <div class="trip-route-deets">
                    <div class="trip-route">
                        <p class="small-text">From</p>
                        <p class="medium-text">{{tripData.from}}</p>
                        <p class="small-text">To</p>
                        <p class="medium-text">{{tripData.to}}</p>
                    </div>
                    <div class="trip-class">
                        <p class="small-text">Departure Time</p>
                        <p class="medium-text">{{tripData.tripTime}}</p>
                        <p class="small-text">Bus Order</p>
                        <p class="medium-text">{{tripData.tripOrder}}</p>
                    </div>
                </div>
                <hr>
                <div class="busandseat">
                    <div class="bus-details">
                        <p class="small-text">Bus Details</p>
                        <p class="medium-text" v-if="tripData.busClassID == '3'">Air conditioned</p>
                        <p class="medium-text" v-else>No Air conditioner</p>
                    </div>
                    <div class="bus-details">
                        <p class="small-text">Selected Seats</p>
                        <p class="medium-text">{{tripData.selectedSeats.toString()}}</p>
                    </div>
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
                <hr style="margin-top:5px;margin-bottom:5px;">
                <p class="medium-text">Passenger Details</p>
                <hr style="margin-top:5px;margin-bottom:5px;">
                <div class="inputs">
                    <div class="first-group">
                        <div class="form-group number">
                            <input type="text" v-model="tripData.number" placeholder="Phone Number" class="form-control" maxlength="11">
                        </div>
                        <div class="form-group">
                            <select v-model="tripData.title" name="title" id="title" class="form-control">
                                <option>Mr</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select v-model="tripData.gender" name="gender" id="title" class="form-control">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                    </div>

                    <div class="second-group">
                        <div class="form-group">
                            <input v-model="tripData.firstName" type="text" placeholder="Firstname" class="form-control">
                        </div>
                        <div class="form-group">
                            <input v-model="tripData.lastName" type="text" placeholder="Lastname" class="form-control">
                        </div>
                    </div>
                    <div class="third-group">
                        <div class="form-group">
                            <input v-model="tripData.email" type="text" placeholder="Email address" class="form-control">
                        </div>
                        <div class="form-group">
                            <input v-model="tripData.DOB" type="text" placeholder="dd/mm" class="form-control">
                        </div>
                    </div>
                    <hr style="margin-top:10px;">
                    <div class="fourth-group">
                        <div class="form-group">
                            <input v-model="tripData.nextname" type="text" placeholder="Next of kin name" class="form-control">
                        </div>
                        <div class="form-group">
                            <input v-model="tripData.nextnumber" type="text" placeholder="Next of kin number" class="form-control">
                        </div>
                    </div>
                    
                </div>
                
            </section>
            <section class="payment">
                <div class="payment-header">
                    <p class="medium-text">Payment</p>
                </div>
                <hr>
                <div class="payment-body">
                    <div class="form-group">
                        <input type="text" v-model="card" placeholder="Card Number" class="form-control">
                    </div>
                    <div class="expiry">
                        <div class="form-group">
                            <input type="text" v-model="month" placeholder="Expiry month" maxlength="2" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="year" placeholder="Expiry year" maxlength="2" class="form-control">
                        </div>
                    </div>
                    <div class="expiry">
                        <div class="form-group">
                            <input type="text" v-model="cvv" placeholder="cvv" maxlength="3" class="form-control">
                        </div>
                        <div class="form-group">
                            <input type="text" v-model="pin" placeholder="Pin" maxlength="4" class="form-control">
                        </div>
                    </div>
                    <div class="form-group" v-show="otpTime">
                            <input type="text" v-model="otp" placeholder="otp"  class="form-control">
                        </div>
                    <div class="remark" style="text-align:center;">
                        <p>{{remark}}</p>
                    </div>
                    <div class="proceed" v-show="payTime">
                        <button class="btn-lg" @click="initiate()">Pay with flutterwave</button>
                    </div>
                    <div class="proceed" v-show="otpTime">
                        <button class="btn-lg" @click="verifyOtp()">Verify Otp</button>
                    </div>
                    <div class="proceed" v-show="authPay">
                        <button class="btn-lg" @click="toBank()">Proceed to Bank</button>
                    </div>
                    <div class="proceed" v-show="goHome">
                        <button class="btn-lg" @click="$router.push({name:'HelloWorld'})">Go Home</button>
                    </div>
                    
                    <section class="loader-modal" v-show="loading">
                        <div class="loader" id="loader"></div>
                    </section>
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
    name : "Overview",
    components:{
        MainNav,
        Footer,
    },
    data(){
        return{
            tripData:this.$store.getters.getTrips,
            base_url:this.$store.getters.getUrl,
            otpTime:false,
            payTime:true,
            authPay:false,
            goHome:false,
            remark:"",
            card:"",
            month:"",
            year:"",
            cvv:"",
            pin:"",
            otp:"",
            txRef:"",
            flwRef:"",
            loading:false,
            bankPage:{},
            authUrl:"",
        }
    },
    mounted(){
        
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
    },
    methods:{
        formatNumber(num){
          num = num.substring(1);

          var prefix = '234'
          var newNumber = prefix + num;
          return newNumber
      },
        verifyOtp(){
            this.loading = true;
            this.remark = "";
            var verifyData = {
            otp:this.otp,
            flwRef:this.flwRef,
            txRef:this.txRef,
            }
            fetch(this.base_url+'/v2/verifypay',{
                method:"POST",
                headers:verifyData,
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                if(data.status == "success"){
                    this.remark = "Payment succesful"
                    this.otpTime = false;
                    this.goHome = true;
                    // call the bookendpoint
                    fetch(this.base_url+'/v2/book',{
                        method:"POST",
                        headers:{
                        flwRef:this.flwRef,
                        txRef:this.flwRef,
                        Title:this.tripData.title,
                        FirstName:this.tripData.firstName,
                        Surname:this.tripData.lastName,
                        Gender:this.tripData.gender,
                        DateOfBirth:this.tripData.DOB,
                        PhoneNumber:this.formatNumber(this.tripData.number),
                        EmailAddress:this.tripData.email,
                        NextOfKinFullName:this.nextname,
                        NextOfKinPhoneNumber:this.nextnumber,
                        BusesQueueID:this.tripData.busQueueID,
                        RoutePID:"",
                        RouteName:this.tripData.from + ' TO ' + this.tripData.to,
                        BusClassName:this.tripData.busClassID,
                        NoOfSeat:this.tripData.selectedSeats.length,
                        SeatNumber:this.tripData.selectedSeats.toString(),
                        SeatCardinal:this.tripData.selectedSeats.toString(),
                        DepartureDate:this.tripData.date,
                        ConvinienceFee:"0",
                        DiscountedAmount:this.tripData.price * this.tripData.selectedSeats.length,
                        BookingDate:this.getdate,
                        BusOrderName:this.tripData.busOrderID,
                        channel:"Website"
                    }

                    })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        if(data.status == 'done'){
                            this.loading = false;
                            this.remark = "Booking Succesful"
                        }else{
                            this.loading = false;
                            this.remark = "Booking Failed"
                        }
                    })
                }else{
                    this.remark = "Payment Failed"
                    this.payTime = true;
                    this.otpTime = false;
                    // call failed booking
                    this.failedBooking();
                }
            })
        },
        fet(){
            fetch("https://pmtapi.elvischuks.com.ng/v3/verifytxref",{
                headers:{
                txRef:this.txRef,
                    }
                })
                .then(resp => resp.json())
                .then(data => {
                    if(data.status == 'success'){
                        this.book()
                    }else{
                        this.remark = "Payment Failed"
                        this.goHome = true;
                        this.authPay = false;
                        // call failed booking here
                        this.failedBooking();
                    }
                })
            },
        toDo(page,val){
            console.log("time")
            if(page.closed){
                console.log("Closed")
                clearInterval(val)
                this.fet()
            }
        },
        toBank(){
            this.loading = true;
            var bank_page = window.open(this.authUrl,'_blank');
            var time = 10000
            var inter = setInterval(() => {
               console.log("time")
               if(bank_page.closed){
                   console.log('CLosed')
                   clearInterval(inter)
                    this.fet()
               } 
            }, time)
            
        },
        initiate(){
            this.loading = true;
            this.remark = "";
            fetch(this.base_url+'/v2/pay',{
                method:"POST",
                headers:{
                    cardno:this.card,
                    cvv:this.cvv,
                    expirymonth:this.month,
                    expiryyear:this.year,
                    amount:this.tripData.price * this.tripData.selectedSeats.length,
                    email:this.tripData.email,
                    phonenumber:this.tripData.number,
                    firstname:this.tripData.firstName,
                    lastname:this.tripData.lastName,
                    IP:"",
                    pin:this.pin,
                    depotcode:this.tripData.depotcode,
                }
            })
            .then(resp => resp.json())
            .then(data =>{
                this.loading = false;
                console.log(data)
                if(data.error == false){
                    if(data.validationRequired == true){
                        this.txRef = data.txRef;
                        this.flwRef = data.flwRef;
                        if(data.authUrl == null){
                            this.otpTime = true;
                            this.payTime = false;
                        }else{
                            this.authUrl = data.authUrl;
                            this.authPay = true;
                            this.payTime = false;
                        }
                    }
                }
                if(data.error == undefined){
                    this.remark = data;
                }

            })
        },
        book(){
            fetch(this.base_url+'/v2/book',{
                method:"POST",
                headers:{
                flwRef:this.flwRef,
                txRef:this.flwRef,
                Title:this.tripData.title,
                FirstName:this.tripData.firstName,
                Surname:this.tripData.lastName,
                Gender:this.tripData.gender,
                DateOfBirth:this.tripData.DOB,
                PhoneNumber:this.tripData.number,
                EmailAddress:this.tripData.email,
                NextOfKinFullName:this.nextname,
                NextOfKinPhoneNumber:this.nextnumber,
                BusesQueueID:this.tripData.busQueueID,
                RoutePID:"",
                RouteName:this.tripData.from + ' TO ' + this.tripData.to,
                BusClassName:this.tripData.busClassID,
                NoOfSeat:this.tripData.selectedSeats.length,
                SeatNumber:this.tripData.selectedSeats.toString(),
                SeatCardinal:this.tripData.selectedSeats.toString(),
                DepartureDate:this.tripData.date,
                ConvinienceFee:"0",
                DiscountedAmount:this.tripData.price * this.tripData.selectedSeats.length,
                BookingDate:this.getdate,
                BusOrderName:this.tripData.busOrderID,
                channel:"Website"
            }

            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                if(data.status == 'done'){
                    this.loading = false;
                    this.authPay = false;
                    this.goHome = true;
                    this.remark = "Booking Succesful"
                }else{
                    this.loading = false;
                    this.remark = "Booking Failed"
                    // call failedbooking
                }
            })
        },
        failedBooking(){
            this.remark = ""
            fetch(this.base_url+'/v3/failedbooking',{
                method:"POST",
                headers:{
                flwRef:this.flwRef,
                txRef:this.flwRef,
                Title:this.tripData.title,
                FirstName:this.tripData.firstName,
                Surname:this.tripData.lastName,
                Gender:this.tripData.gender,
                DateOfBirth:this.tripData.DOB,
                PhoneNumber:this.tripData.number,
                EmailAddress:this.tripData.email,
                NextOfKinFullName:this.nextname,
                NextOfKinPhoneNumber:this.nextnumber,
                BusesQueueID:this.tripData.busQueueID,
                RoutePID:"",
                RouteName:this.tripData.from + ' TO ' + this.tripData.to,
                BusClassName:this.tripData.busClassID,
                NoOfSeat:this.tripData.selectedSeats.length,
                SeatNumber:this.tripData.selectedSeats.toString(),
                SeatCardinal:this.tripData.selectedSeats.toString(),
                DepartureDate:this.tripData.date,
                ConvinienceFee:"0",
                DiscountedAmount:this.tripData.price * this.tripData.selectedSeats.length,
                BookingDate:this.getdate,
                BusOrderName:this.tripData.busOrderID,
                channel:"Website",
                reason:"Could not verify payer identity"
            }

            })
            .then(resp => resp.json())
            .then(data => {
                this.remark = "Booking Failed"
                if(data.status == 'done'){
                    console.log('done')
                    
                }
            })
        },
    },
}
</script>

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
.first-group,.second-group,.third-group,.fourth-group{
    display: flex;
}
.medium-text{
    margin-bottom:5px;
}
.busandseat{
    display: flex;
}
.trip-route-deets{
    display: flex;
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

.payment{
    flex:1;
    background:white;
    margin:10px;
    padding:20px;
    border-radius:10px;
    margin-top:55px;
    height:58vh;
}
.expiry{
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

.small-text{
    font-size:13px;
    color:grey;
}
hr{
    color:grey;
    height:1px;
}
.trip-route,.trip-class{
    margin-top:20px;
    margin-bottom:20px;
    flex:1;
}
.bus-details{
    margin-top:20px;
    margin-bottom:20px;
    flex:1;
}
main{
   width:90%;
   margin:auto;
   margin-top:30px;
   display:flex;
}

.trip-details{
    flex:2;
    background: white;
    /* height:60vh; */
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