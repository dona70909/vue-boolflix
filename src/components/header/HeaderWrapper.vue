<template>
    <header>
        <section class="container-fluid">
            <div class="row align-items-center justify-content-between px-5 py-2">
                <div class="col-6">
                    <h1 class="text-danger">Boolflix</h1>
                </div>
                <div class="col-6 d-flex align-items-center justify-content-end">
                    <input @keyup.enter="getSearchFilmApi" v-model="modelTitle" class="me-2" type="text">
                    <button @click="getSearchFilmApi" class="btn btn-danger text-white">Cerca!</button>
                    <!--  <p class="d-none">{{this.callTheFx()}}</p>  -->
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
            modelTitle:undefined,
            title:undefined,
            apiUrl:'https://api.themoviedb.org/3/search/movie?api_key=3fb6e38d8c0865b83040430153ed8475&query=', 
            //listFilmsEmpty:[],
            listFilms:[],
            //isTyped: false,
        }
    },
    

    methods: {

        /**
         * finction that gets the input(title) from the button and resets it each time i click  */ 
        getSearchTitle(){
            this.title = this.modelTitle;
            this.modelTitle = "";
            console.log(this.title);
            return this.title
        },

        /**
         * Fucntion that each time i click the Btn get the v-model through the fx(getSearchTitle()) and 
         * merge the v-model with the fixed url of the API in order to get a new api url each time based on the v-model input
         * at the end the Fx returns an ArrayObj that contains the response.data.whatIwant
         */
        getSearchFilmApi(){
            this.getSearchTitle();
            if((this.title != undefined)){
                axios.get(this.apiUrl += this.title)
                .then((response) => {
                    console.warn("url")
                    console.log(this.apiUrl);

                    // # prima assegno alla lista la risposta 
                    this.listFilms = response.data.results;
                    //# poi faccio la chiamata per il parent aaaaaaaaah sveglia!
                    this.giveListToParent();

                    console.warn("list");
                    console.log(this.listFilms);
                    console.log(response.data.results);

                    this.apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=3fb6e38d8c0865b83040430153ed8475&query=";

                    console.warn("url-reset")
                    console.log(this.apiUrl);
                })
                .catch((error) => {
                    console.error(error);
                })
            }else{
                console.warn("empty title")
            }
        },

        /* function that emits the Array before obtained and give it to the parent */
        giveListToParent(){
            this.$emit('getListFilms',this.listFilms);
        },
    },
}
</script>

<style lang="scss" scoped>
header{
    height: 80px;
    background-color: black;
}
</style>