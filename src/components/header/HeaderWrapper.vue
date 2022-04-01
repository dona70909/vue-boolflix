<template>
    <header>
        <section class="container-fluid">
            <div class="row align-items-center justify-content-between px-5 py-2">
                <div class="col-6">
                    <h1 class="text-danger">Boolflix</h1>
                </div>
                <div class="col-6 d-flex align-items-center justify-content-end">
                    <input v-model="modelTitle" class="me-2" type="text">
                    <button @click="getSearchFilmApi" class="btn btn-danger text-white">Cerca!</button>
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
            apiUrl:'https://api.themoviedb.org/3/search/movie?api_key=3fb6e38d8c0865b83040430153ed8475&query=',
            listFilmsEmpty:[],
            listFilms:[],
        }
    },

    methods: {
        getSearchTitle(){
            this.title = this.modelTitle;
            this.modelTitle = "";
            console.warn(this.title)
            return this.title
        },

        getSearchFilmApi(){
            let params = this.getSearchTitle();
            console.warn(params);
            this.apiUrl += params;

            axios.get(this.apiUrl)
            .then((response) => {
                /*  console.error(this.apiUrl) */
                console.log(response.data.results)
                this.giveListToParent();
                this.listFilms = response.data.results;
            })
            .catch((error) => {
                console.error(error);
            })
        },

        giveListToParent(){
            this.$emit('getListFilms',this.listFilms);
        }
    },

    created(){
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