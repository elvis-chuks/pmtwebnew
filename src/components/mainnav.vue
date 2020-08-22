<template>
    <div>
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
        <!-- <header> -->
            
            
            <nav>
                <input type="checkbox" name="check" id="check">
                <label for="check" class="checkbtn">
                    <i class="fa fa-bars"></i>
                </label>
                    <img src="../assets/pmt_log.png" alt="logo" class="logo" @click="goHome()">

                    <ul class="nav-links">
                        <li><a href="/" class="nav-link">Home</a></li>
                        <li><router-link tag="a" :to="{name:'About'}" class="nav-link">About Us</router-link></li>
                        <li><router-link tag="a" :to="{name:'Contact'}" class="nav-link">Contact Us</router-link></li>
                        <li><router-link tag="a" :to="{name:'Verify'}" class="nav-link">Verify Booking</router-link></li>
                        <li><router-link tag="a" :to="{name:'Fares'}" class="nav-link">Route Fare</router-link></li>
                        <li><router-link tag="a" :to="{name:'Terminals'}" class="nav-link">Our Terminals</router-link></li>
                    </ul>
            </nav>
            
        <!-- </header> -->
    </div>
</template>

<script>
export default {
    name:"MainNav",
    methods:{
        goHome(){
            this.$router.push({name:'HelloWorld'})
        }
    }
}
</script>

<style scoped>
header{
    display: flex;
    width:90%;
    margin:auto;
    height: 10vh;
    align-items: center;
}

nav{
    height:80px;
    width:100%;
}
/* .logo-container img{
    width:130px;
} */
.logo{
    padding:0 50px;
    width:300px;
    margin-top:10px;
    cursor:pointer;
}
nav ul{
    float:right;
    margin-right:20px;
}
nav ul li{
    display: inline-block;
    line-height: 80px;
    margin:0 5px;
}
nav ul li a{
    color:#f36713;
    font-size:17px;
    /* text-transform: uppercase; */
    padding:10px 13px;
    border-radius:4px;
    text-decoration:none;
}
a.active,a:hover{
    background:indigo;
    transition:.5s;
    color:white;
}
.checkbtn{
    font-size:30px;
    color:#f36713;
    float:right;
    line-height:80px ;
    margin-right:40px;
    cursor:pointer;
    display: none;
}

#check{
    display: none;
}

@media (max-width:965px) {
    .logo{
        padding-left:5px;
        margin-top:10px;
        width:300px;
    }
    nav ul li a{
        font-size:16px;
    }
    
}

@media(max-width: 340px){
    .logo{
        margin-top:10px;
        width:250px;
    }
}

@media(max-width:856px){
    .checkbtn{
        display:block;
    }
    ul{
        position:fixed;
        width:100%;
        height:100vh;
        background:indigo;
        top:80px;
        left:-100%;
        text-align:center;
        transition:all .5s;
        z-index:1000;
        
    }
    nav ul li{
        display:block;
        margin: 50px 0;
        line-height:30px;
        color:white;
    }
    a:hover,a.active{
        background:none;
        color:#0082e6;

    }

    #check:checked ~ ul{
        left:0;
    }
}

/* .logo-container img{
    width:160px;
}
.logo-container{
    flex: 1;
} */

/* 






nav{
    flex: 2;
}

.nav-links{
    justify-content: space-around;
    list-style-type: none;
    text-transform: uppercase;
}
.logo-container, .nav-links{
    display: flex;
}
.nav-link{
    color:#f36713;
    font-size:15px;
    text-decoration: none;
}

@media (max-width:965px) {
    .checkbtn{
        display: block;
    }
    .nav-link{
        position:fixed;
        width:100%;
        height:100vh;
        background:indigo;
        top:80px;
        left:0;
        text-align:center;
        transition: all .5s;
    }
    .nav-links{
        display: block;
        margin:50px 0;
        line-height: 30px;
        
    }
    .nav-link{
        font-size:20px;
    }
    #check:checked ~ .nav-link{
        left:0;
    }
} */
</style>