<template>
    <!-- col -->
    <div class="card">
        <!-- // # poster null and backdrop ok -->
        <img v-show="poster != null" :class="((poster == null) && (backdrop != null))? 'd-none' : '' " class="card-img-top poster-img" :src="'http://image.tmdb.org/t/p/w500/' + poster"  :alt="nameSerie">
        <img class="poster-img-empty" v-if="poster == null && backdrop != null" :src="require('@/assets/img/default_poster.jpg')" :alt="nameSerie">

        <!-- //# solo backdrop null and poster ok-->
        <img v-show="backdrop != null" :class="((backdrop == null) && (poster != null))? 'd-none' : '' "  class="card-img-top back-img" :src="'http://image.tmdb.org/t/p/w500/' + backdrop" :alt="nameSerie">    
        <img class="back-img-empty" v-show="backdrop == null && poster != null" :src="require('@/assets/img/back.png')" :alt="nameSerie">

        <!--//# entrambi null -->
        <img  class="poster-img-empty" v-if="(backdrop == null) && (poster == null)" :src="require('@/assets/img/default_poster.jpg')" :alt="nameSerie">
        <img class="back-img-empty"  v-if="(backdrop == null) && (poster == null)" :src="require('@/assets/img/back.png')" :alt="nameSerie">

        <!-- //% BODY -->
        <div class="card-body">

            <p class="text-red-bd d-inline-block me-1 text-small">Titolo:</p>
            <p class="d-inline-block text-small uppercase">{{nameSerie}}</p>

            <div class="flag-wrapper">
                <p class="d-inline-block text-red-bd me-2 text-small">Language:</p>
                <country-flag v-show="language != 'en'" :country='language' size='small'/>
                <country-flag v-show="language == 'en'" country="gb-eng" size='small'/> 
            </div>

            <p v-show="(originSerieName != nameSerie)" class="text-red-bd text-small">Original title:</p>
            <p v-show="(originSerieName != nameSerie)" class="text-small uppercase">{{originSerieName}}</p>

            <p v-show="overview != '' " class="text-red-bd">Overview:</p>
            <p v-show="overview != '' " class="overview-text mb-1">{{overview}}</p>

            <p  class="text-red-bd text-small d-inline-block me-1">Vote:</p>
            <i  v-for="(star,index) in starVote(vote)" :key="index + 'full'" class="bi bi-star-fill"></i>
            <i  v-for="(starEmpty,index) in emptyStars(vote)" :key="index + 'empty'" class="bi bi-star"></i> 
            <div>
                <p class="text-red-bd mb-0 text-small">Actors:</p>
                <span class="text-small" v-for="(actor,indexTv) in castTv" :key="indexTv">{{actor + " | "}}</span>
            </div>

            <p class="text-red-bd text-small">Genres:</p>
            <span class="text-white fst-italic text-small" v-for="(genre,index) in getGenre" :key="index + 'genres'">{{genre + " | "}}</span>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name:"TvCard",
    data(){
        return{
            castTv:[],
        }
    },

    props:{
        "nameSerie":String,
        "originSerieName":String,

        "overview":String,
        "language":String,
        "vote":Number,      
        "poster":String,
        "backdrop":String,

        "id":Number,
        "loadedTvList":Array,

        "listGenresTv":Array,
        "genres":Array,

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
            const self = this;
            //this.castTv = [];
            
                this.loadedTvList.forEach((element) =>{
                    axios.get(`https://api.themoviedb.org/3/tv/${element.id}/credits?api_key=3fb6e38d8c0865b83040430153ed8475&language=en-US`)
                    .then(function (response){
                        for(let i = 0; i < 5;i++){ 
                            if(response.data.cast[i] != null){
                                self.castTv.push(response.data.cast[i].name);
                                console.log(response.data.cast[i].name)
                            }
                        }
                    })
                    .catch((error) => {
                        console.error(error)
                    })
                    
                })
    

            return this.castTv;
        },

    },


    computed:{
        getGenre(){
            let tvGenres = [];
            this.listGenresTv.forEach((genre) => {
                this.genres.forEach((genreFilmId)  => {
                    if(genreFilmId === genre.id){
                        console.warn(genreFilmId + " film genre id");
                        console.warn(genre.id + " id") 
                        tvGenres.push(genre.name)
                    }

                })
            })

            return tvGenres;
        }
    },


}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/style.scss';
</style>