<template>
    <!-- col -->
    <div class="card">
        <!-- // # poster null and backdrop ok -->
        <img v-show="poster != null" :class="((poster == null) && (backdrop != null))? 'd-none' : '' " class="card-img-top poster-img" :src="'http://image.tmdb.org/t/p/w500/' + poster"  :alt="title">
        <img class="poster-img-empty" v-if="poster == null && backdrop != null" :src="require('@/assets/img/default_poster.jpg')" :alt="title">

        <!-- //# solo backdrop null and poster ok-->
        <img v-show="backdrop != null" :class="((backdrop == null) && (poster != null))? 'd-none' : '' "  class="card-img-top back-img" :src="'http://image.tmdb.org/t/p/w500/' + backdrop" :alt="title">    
        <img class="back-img-empty" v-show="backdrop == null && poster != null" :src="require('@/assets/img/back.png')" :alt="title">

        <!--//# entrambi null -->
        <img  class="poster-img-empty" v-if="(backdrop == null) && (poster == null)" :src="require('@/assets/img/default_poster.jpg')" :alt="title">
        <img class="back-img-empty"  v-if="(backdrop == null) && (poster == null)" :src="require('@/assets/img/back.png')" :alt="title">

        <!-- //% BODY -->
        <div class="card-body">

            <p class="text-red-bd d-inline-block me-1">Titolo:</p>
            <p class="d-inline-block uppercase">{{title}}</p>

            <div class="flag-wrapper">
                <p class="d-inline-block text-red-bd me-1">Language:</p>
                <country-flag v-show="language != 'en'" :country='language' size='small'/>
                <country-flag v-show="language == 'en'" country="gb-eng" size='small'/> 
            </div>

            <p v-show="(originalTitle !=  title)" class="text-red-bd d-inline-block me-1">Original title:</p>
            <p v-show="(originalTitle !=  title)" class="card-text d-inline-block text-small uppercase">{{originalTitle}}</p>

            <p v-show="overview != '' " class="text-red-bd m-0">Overview:</p>
            <p v-show="overview != '' " class="overview-text mb-3">{{overview}}</p>

            <p class="text-red-bd d-inline-block me-1">Vote:</p>
            <i  v-for="(star,index) in starVote(vote)" :key="index + 'full'" class="bi bi-star-fill"></i>
            <i  v-for="(starEmpty,index) in emptyStars(vote)" :key="index + 'empty'" class="bi bi-star"></i>   
            <div>
                <p class="text-red-bd mb-0">Actors:</p>
                <span class="text-small" v-for="(actor,indexAct) in castMovie" :key="indexAct + 'name' ">{{actor + " | "}}</span>
            </div>

            <p class="text-red-bd">Genres</p>
            <span class="text-white fst-italic text-small" v-for="(genre,index) in getGenre" :key="index + 'genres'">{{genre + " | "}}</span>
            <!-- <p class="text-primary" v-for="(genre,index) in genres" :key="index + 'gen' ">{{genre}}</p> -->
            <span> {{ this.id }} id</span>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name:"FilmCard",
    data(){
        return{
            castMovie:[],
            firstMovie:"https://api.themoviedb.org/3/movie/",
            lastMovie:"/credits?api_key=3fb6e38d8c0865b83040430153ed8475&language=en-US",
            //movieGenres:[],
        }
    },

    props:{
        "title":String,
        "originalTitle":String,

        "overview":String,
        "language":String,
        "vote":Number,      
        "poster":String,
        "backdrop":String,

        "id":Number,

        "loadedFilmsList":Array,
        "genres":Array,

        "listGenresMovies":Array,

    },

    methods:{
        languageFlag(langString){
            if(langString == "en"){
                langString == "gb-eng";
            } else {
                langString;
            }
        },

        starVote(number){
            if(number > 5){
                number = 5;
            } else {
                number = Math.round(number);
            }

            return number;
        },

        emptyStars(number){ 
            if(number > 5){
                number = 5;
                number = 5 - number;
            } else {
                number = Math.round(number);
                number = 5 - number;
            }
            return number;
        },

        getCast(){ 
            axios.get(this.firstMovie + this.id + this.lastMovie)
                .then((response)=>{
                    for(let i = 0; i < 5 ; i++){
                        if(response.data.cast[i] != null){
                            this.castMovie.push(response.data.cast[i].name);
                        }
                    }

                    
                })
                .catch((error) => {
                    console.error(error)
                })

            return this.castMovie; 

        },
        
    }, 

    //prova computed return castMovie list
    mounted(){
        this.getCast();
    }, 

    computed:{
        getGenre(){
            let movieGenres = [];
            this.listGenresMovies.forEach((genre) => {
                this.genres.forEach((genreFilmId)  => {
                    if(genreFilmId === genre.id){
                       /*  console.warn(genreFilmId + " film genre id");
                        console.warn(genre.id + " id")  */
                        movieGenres.push(genre.name)
                    }

                })
            })

            return movieGenres;
        }
    },

    watch:{
        id(){
            console.log('whatch out')
            this.castMovie=[];
            this.id;
            this.getCast();
        }
    } 
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
</style>

