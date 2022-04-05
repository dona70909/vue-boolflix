<template>
    <header>
        <section class="container-fluid">
            <div class="row flex-column flex-sm-row align-items-center justify-content-between px-5 py-4">
                <div class="col-6 mb-2 mb-sm-0">
                    <!-- <h1 class="text-danger">Boolflix</h1> -->
                    <img :src="require('@/assets/img/logo-netflix.png')" alt="">
                </div>
                <div class="col-6 d-flex align-items-center justify-content-sm-end justify-content-center w-50">
                    <input @keyup.enter="getSearchFilmApi" v-model="modelTitle" class="me-2" type="text">
                    <button @click="getSearchFilmApi" class="btn text-white">Cerca!</button>
                </div>
            </div>

            <!-- // ! SELECT SOLO SE LE LISTE NON SONO VUOTE -->
            <div class="row">
                <div v-show="this.listFilms.length != 0" class="col-6">
                    <select  name="" id="">
                        <option class="text-white bg-dark" value="" v-for="(genreFilms,index) in listGenresFilms" :key="index + 'films'">{{genreFilms.name}}</option>
                    </select>
                </div>

                <div v-show="this.listsTv.length != 0" class="col-6">
                    <select class="form-select">
                        <option class="text-white bg-dark" value="" v-for="(genreTv,index) in listGenresTv" :key="index + 'tv' ">{{genreTv.name}}</option>
                    </select>
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
            apiUrlMovie:'https://api.themoviedb.org/3/search/movie?api_key=3fb6e38d8c0865b83040430153ed8475&query=',
            apiUrlTv:'https://api.themoviedb.org/3/search/tv?api_key=3fb6e38d8c0865b83040430153ed8475&query=', 
            
            listFilms:[],
            listsTv:[],

            listGenresTv:[],
            listGenresFilms:[],

            filmsGenresUri:"https://api.themoviedb.org/3/genre/movie/list?api_key=3fb6e38d8c0865b83040430153ed8475&language=en-US",
            tvGenresUri:"https://api.themoviedb.org/3/genre/tv/list?api_key=3fb6e38d8c0865b83040430153ed8475&language=en-US"
            
        }
    },
    

    methods: {

        /**
         * !finction that get the input(title) from the button and resets it each time i click  */ 
        getSearchTitle(){
            this.title = this.modelTitle;
            this.modelTitle = "";
            console.log(this.title);
            return this.title
        },

        /**
         * !Function: each time i click the Btn get the v-model through the fx(getSearchTitle()) and 
         * !merge the v-model with the fixed url of the API in order to get a new api url each time based on the v-model input
         * !at the end the Fx returns an ArrayObj that contains the response.data.results
         */
        getSearchFilmApi(){
            this.getSearchTitle();
            if((this.title != undefined)){
                axios.all([axios.get(this.apiUrlTv += this.title),axios.get(this.apiUrlMovie += this.title)])
                .then(axios.spread((responseTv,responseMovie) => {
                    // # prima assegno alla lista la risposta 
                    this.listFilms = responseMovie.data.results;
                    this.listsTv = responseTv.data.results;
                    //Array.prototype.push.apply(this.listFilms,this.listsTv); 
                    //# poi faccio la chiamata per il parent 
                    this.giveListToParent();
                    this.apiUrlMovie = "https://api.themoviedb.org/3/search/movie?api_key=3fb6e38d8c0865b83040430153ed8475&query=";
                    this.apiUrlTv = "https://api.themoviedb.org/3/search/tv?api_key=3fb6e38d8c0865b83040430153ed8475&query=";
                }))
                .catch((errors) => {
                    if(errors.response.status == 422){
                        console.error("empty content");
                    }
                })
            }else{
                console.warn("empty title")
            }
        },

        // !function that emits the Array before obtained and give it to the parent 
        giveListToParent(){
            this.$emit('getListFilms',this.listFilms,this.listsTv);
        },
    },

    mounted(){
        axios.all([axios.get(this.filmsGenresUri),axios.get(this.tvGenresUri)])
        .then(axios.spread((genresFilms,genresTv) => {

            this.listGenresFilms = genresFilms.data.genres;
            this.listGenresTv = genresTv.data.genres;
            console.log(genresFilms.data.genres);
            console.warn(this.listGenresFilms);
        }))
        .catch((errors) => {
            if(errors.response.status == 422){
                console.error("empty content");
            }
        })
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/partials/_variables.scss';
header{
    background-color: black;

    img{
        height:40px;
    }

    button{
        background-color:$bgRed;
        font-weight: 600;
        text-transform: uppercase;
    }
}
</style>