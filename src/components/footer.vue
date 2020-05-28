<template>
    <footer>
        <div class="footer-body">
            <div class="footer-column">
                <div class="logo-container">
                    <img src="../assets/pmt_log.png" alt="logo" class="logo">
                </div>
            </div>
            <div class="footer-column">
                <p class="title">Our Subsidiaries</p>
                <ul class="sub-links">
                    <li><a href="#" class="sub-link">Peace Group Of Companies</a></li>
                    <li><a href="#" class="sub-link">Peace Mass Transit Ltd</a></li>
                    <li><a href="#" class="sub-link">Peace Petroleum Nig Ltd</a></li>
                    <li><a href="#" class="sub-link">Peace Engineering Ltd</a></li>
                    <li><a href="#" class="sub-link">Peace MicroFinance Bank Ltd</a></li>
                    <li><a href="#" class="sub-link">Peace Capital Market Ltd</a></li>
                    <li><a href="#" class="sub-link">Peace Bureau De Change</a></li>
                    <li><a href="#" class="sub-link">PMT Beijing Trade Co. China Ltd</a></li>
                </ul>
            </div>
            <div class="footer-column">
                <p class="title">Connect With Us</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>© 2020 Copyright : Peace Mass Transit</p>
        </div>
    </footer>
</template>

<script>
export default {
    name:"Footer",
}
</script>

<style scoped>
footer{
    /* position: absolute; */
    bottom: 0;
    width: 100%;
    color:white;
    /* height:10.5rem; */
}
.footer-body{
    background: #2F0054;
    display:flex;
    padding:20px;
}

.logo-container img{
    width:160px;
}
.footer-column{
    flex:1;
}
.footer-bottom{
    text-align: center;
    padding:10px;
    background:rgb(64, 32, 87);
}

.sub-links{
    list-style-type: none;
}
.sub-link{
    color:white;
    text-decoration: none;
}
.title{
    font-size:20px;
}

@media (max-width:1024px) {
    .footer-body{
        flex-direction: column;
    }
}
</style>