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
import axios from "axios"
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
            /* console.log(this.title) */
            return this.title
        },

        getSearchFilmApi(){
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=3fb6e38d8c0865b83040430153ed8475&query=ritorno+al+futuro')
            .then((response) => {
                console.log(response.data.results[0].title)
            })
            .catch((error) => {
                console.error(error);
            })
        },
    },

    mounted(){
        this.getSearchFilmApi();
    }
}
</script>

<style lang="scss" scoped>
header{
    height: 15vh;
    background-color: black;
}
</style>