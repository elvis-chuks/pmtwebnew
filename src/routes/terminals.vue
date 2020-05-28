<template>
    <div>
        <MainNav/>
        <main>
            <section class="top">
                <h1 class="big">Our Terminals</h1>
                <p>Find the terminal closest to you and travel with us.</p>
            </section>
            <section >
                <Grid 
                    :data-items="rows"
                    :columns="columns">
                </Grid>
            </section>
        </main>
        <Footer/>
    </div>
</template>

<script>
import MainNav from '@/components/mainnav'
import Footer from '@/components/footer'
export default {
    name:"Terminals",
    components:{
        MainNav,
        Footer
    },
    mounted(){
        this.mountTable()

    },
    data(){
        return {
            baseUrl:this.$store.getters.getUrl,
            columns:[
                {
                    label:'S/N',
                    field:'s/n',
                },
                {
                    label:'Terminal',
                    field:'depot',
                },
                {
                    label:'Address',
                    field:'address',
                },
                {
                    label: 'Manager',
                    field: 'manager',
                },
                {
                    label: 'Phone',
                    field: 'number',
                },
            ],
            rows:[
                
            ],
        }
    },
    methods:{
        mountTable(){
            console.log(this.baseUrl)
            fetch(this.baseUrl+'/v3/terminals')
            .then(resp => resp.json())
            .then(data => {
                if(data.status == "done"){
                    console.log(data.terminals)
                    this.rows = data.terminals
                }
            })
        },
        flit(row){
            Object.keys(row).filter(i => {
                this.columns.forEach(col =>{
                    if(i == col.field){
                        return row[i]
                    }
                })
            })
        }
        
    },
    computed:{
        
    }
}
</script>

<style scoped>
main{
    width:90%;
    margin:auto;
}
.top{
    margin-top:20px;
    margin-bottom:20px;
}
.top h1{
    font-size:40px;
}
.terminal-table{
    margin-top:30px;
    width:100%;
    background: white;
    overflow-x:auto;
    border:none;
}
table{
    width:100%;
    text-align: left;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
td{
    border:none;
}
</style>