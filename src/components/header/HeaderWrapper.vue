<template>
    <header>
        <section class="container-fluid">
            <div class="row align-items-center justify-content-between px-5 py-2">
                <div class="col-6">
                    <h1 class="text-danger">Boolflix</h1>
                </div>
                <div class="col-6 d-flex align-items-center justify-content-end">
                    <input v-model="modelTitle" class="me-2" type="text">
                    <button @click="getSearchTitle" class="btn btn-danger text-white">Cerca!</button>
                    <!-- <p class="text-white">{{this.searchTitle}}</p> -->
                </div>
            </div>
        </section>
    </header>
</template>

<script>
export default {
    name:"HeaderWrapper",
    data(){
        return {
            modelTitle:"",
            title:"",
        }
    },

    methods: {
        getSearchTitle(){
            this.title = this.modelTitle;
            this.modelTitle = "";
            console.log(this.title)
        }
    }
}
</script>

<style lang="scss" scoped>
header{
    height: 15vh;
    background-color: black;
}
</style>