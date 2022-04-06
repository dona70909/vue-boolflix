<template>
    <header>
        <section class="container-fluid">
            <div class="row flex-column flex-sm-row align-items-center justify-content-between px-5 py-4">
                <div class="col-6 mb-2 mb-sm-0">
                    <img :src="require('@/assets/img/logo-netflix.png')" alt="">
                </div>
                <div class="col-6 d-flex align-items-center justify-content-sm-end justify-content-center w-50">
                    <input @keyup.enter="getSearchFilmApi" v-model="modelTitle" class="me-2" type="text">
                    <button @click="getSearchFilmApi" class="btn text-white">Search!</button>
                </div>
            </div>

            <!-- // ! SELECT SOLO SE LE LISTE NON SONO VUOTE -->
            <div v-show="listFilms.length != 0 || listsTv.length != 0 "  class="row flex-column flex-sm-row align-items-center justify-content-around py-4 selects-container">
                <div  class="col-6 col-md-3 mb-2 mb-sm-0">
                    <label for="select-movie">Choose Movie Genre</label>
                    <select id="select-movie"  v-model="selectedMovie"  @change="$emit('changedSelGenre',selectedMovie)" class="form-select">
                        <option class="text-white bg-dark" :value="defaultValueMovie">Choose Movie Genre</option>
                        <option class="text-white bg-dark" :value="genreFilms.id" v-for="(genreFilms,index) in listGenresFilms" :key="index + 'films'">{{genreFilms.name}}</option>
                    </select>
                </div>

                <div  class="col-6 col-md-3">
                    <label for="select-tv">Choose Tv Genre</label>
                    <select id="select-tv" v-model="selectedTv" @change="$emit('changedSelTv',selectedTv)" class="form-select">
                        <option class="text-white bg-dark" :value="defaultValueTv">Choose Tv Genre</option>
                        <option class="text-white bg-dark" :value="genreTv.id" v-for="(genreTv,index) in listGenresTv" :key="index + 'tv' ">{{genreTv.name}}</option>
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

            /* //& liste generi film and tvseries */
            listGenresTv:[],
            listGenresFilms:[],

            //& api uri per ottenere la lista dei generi
            filmsGenresUri:"https://api.themoviedb.org/3/genre/movie/list?api_key=3fb6e38d8c0865b83040430153ed8475&language=en-US",
            tvGenresUri:"https://api.themoviedb.org/3/genre/tv/list?api_key=3fb6e38d8c0865b83040430153ed8475&language=en-US",

            //& select v-model movies
            selectedMovie:undefined,
            selectedTv:undefined,

            //% default value confronto senza valori
            defaultValueMovie:-1,
            defaultValueTv:-1,
        }
    },
    

    methods: {

        /**
         * !finction that get the input(title) from the button and resets it each time i click  */ 
        getSearchTitle(){
            this.title = this.modelTitle;
            this.modelTitle = "";
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

    created(){
        axios.all([axios.get(this.filmsGenresUri),axios.get(this.tvGenresUri)])
        .then(axios.spread((genresFilms,genresTv) => {

            this.listGenresFilms = genresFilms.data.genres;
            this.listGenresTv = genresTv.data.genres;

            //& emit to the parent in order to get the genres lists 
            this.$emit('getGenresFilms', this.listGenresFilms);
            this.$emit('getGenresTv', this.listGenresTv);
        }))
        .catch((errors) => {
            if(errors.response.status == 422){
                console.error("empty content");
            }
        })
    },
    
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

    .selects-container{
        background-color:$bgHeader;
    }

    label{
        color: $textRed;
        text-transform: uppercase;
        font-weight: 700;
        margin-bottom: .3rem;
    }
}
</style>