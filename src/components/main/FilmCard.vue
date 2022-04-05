<template>
    <!-- col -->
    <div class="card position-relative">
        <!-- poster null and backdrop ok -->
        <img v-show="poster != null" :class="((poster == null) && (backdrop != null))? 'd-none' : '' " class="card-img-top poster-img" :src="'http://image.tmdb.org/t/p/w500/' + poster"  :alt="title">
        <div class="poster-img-empty " v-if="poster == null && backdrop != null">
            <h5 class="text-poster-empty text-center">{{title}}</h5>
        </div>  

        <!-- solo backdrop null and poster ok-->
        <img v-show="backdrop != null" :class="((backdrop == null) && (poster != null))? 'd-none' : '' "  class="card-img-top back-img" :src="'http://image.tmdb.org/t/p/w500/' + backdrop" :alt="title">    
        <div class="back-img-empty" v-show="backdrop == null && poster != null"></div>

        <!-- entrambi null -->
        <div class="poster-img-empty" v-if="(backdrop == null) && (poster == null)">
            <h5 class="text-poster-empty text-center">{{title}}</h5>
        </div>
        <div class="back-img-empty" v-if="(backdrop == null) && (poster == null)"></div>

        <div class="card-body p-0 position-absolute">

            <p class="text-danger">Titolo:</p>
            <p class="card-title">{{title}}</p>

            <div class="flag-wrapper">
                <p class="d-inline-block text-danger me-2">Language:</p>
                <country-flag v-show="language != 'en'" :country='language' size='small'/>
                <country-flag v-show="language == 'en'" country="gb-eng" size='small'/> 
            </div>

            <p v-show="(originalTitle !=  title)" class="text-danger">Original title:</p>
            <p v-show="(originalTitle !=  title)" class="card-text">{{originalTitle}}</p>

            <p v-show="overview != '' " class="text-danger">Overview:</p>
            <p v-show="overview != '' " class="overview-text mb-1">{{overview}}</p>

            <p v-if="vote != 0" class="text-danger">Vote:</p>
            <i v-for="(star,index) in starVote(vote)" :key="index" class="bi bi-star-fill"></i> 
            <div>
                <p class="text-danger mb-0">Actors/Actress</p>
                <span  class="text-actors" v-for="(actor,indexAct) in castMovie" :key="indexAct + 'name' ">{{actor + " | "}}</span>
            </div>
            <p class="text-danger">{{id}}</p>
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
            //apiUrlIdMovie:"https://api.themoviedb.org/3/movie/{{movieid}}/credits?api_key=3fb6e38d8c0865b83040430153ed8475&language=en-US",
            firstMovie:"https://api.themoviedb.org/3/movie/",
            lastMovie:"/credits?api_key=3fb6e38d8c0865b83040430153ed8475&language=en-US"
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

        getCast(){
            //`https://api.themoviedb.org/3/movie/${this.id}/credits?api_key=3fb6e38d8c0865b83040430153ed8475&language=en-US` 
            axios.get(this.firstMovie + this.id + this.lastMovie)
                .then((response)=>{
                    //console.log(this.id);
                    for(let i = 0; i < 5 ; i++){
                        if(response.data.cast[i] != null){
                            this.castMovie.push(response.data.cast[i].name);
                            console.log(response.data.cast[i].name)
                        }
                    }

                    
                })
                .catch((error) => {
                    console.error(error)
                })

            return this.castMovie; 

            /*for(let i = 0;i < 5;i++){
                axios.get(this.firstMovie + id + this.lastMovie)
                .then((response)=>{
                    //console.log(this.id);
                    for(let i = 0; i < 5 ; i++){
                        if(response.data.cast[i] != null){
                            this.castMovie.push(response.data.cast[i].name);
                            console.log(response.data.cast[i].name)
                        }
                    }

                    
                })
                .catch((error) => {
                    console.error(error)
                })
            }

            return this.castMovie*/

        },
        
    }, 

    mounted(){
        console.warn(this.id);
        this.getCast();
    }, 

    watch:{
        id(){
            this.castMovie=[];
            this.id;
            this.getCast();
        }
    } 
}
</script>

<style lang="scss" scoped>
.card{
    height: 300px; 

    box-shadow: 2px 2px 2px rgb(14, 13, 13);
    border: none;
    img{
        width:100%;
        height: 300px;

        object-fit: center;
    }
    .poster-img-empty{
        /* only when poster image == null */
        width:100%;
        height: 300px;

        background: rgb(162, 20, 20);
        font-weight: 900;
        text-shadow: 2px 2px 10px black;
        text-transform: uppercase;
        display:flex; 
        justify-content: center; 
        align-items:center;
    }
    .back-img-empty{
        /* only backdrop == null  */
        display: none;

        width:100%;
        height: 300px;

        background: rgb(46, 44, 44);
    }
    .card-body{
        /* text/body visible only in hover */
        display: none;
        top:.3rem;

        height: 300px;

        left: .5rem;
        color:white;
        text-shadow: 1px 1px 1px black;
        text-transform: uppercase;
        font-weight: 700;
        p{
            margin: 0;
            padding:0;
            font-size: .8rem;
        }
        .bi-star-fill{
            color: rgb(220, 220, 23);
            margin: 0 .1rem;
        }

        .overview-text{
            font-size: .6rem;
            height: 3.5rem;
            overflow-y:auto;
            padding: 0 .2rem;
            scrollbar-color: #993338 #5f625f;
            scrollbar-width: thin;
        }

        .text-actors{
            font-size: .5rem;
        }
    }
}

// # d-none di base- cambia in hover 
.back-img{
    display: none;
}

// # hover and d-none del poster-poster-bg-text 
.card:hover .poster-img{
    display: none;
}
.card:hover .poster-img-empty{
    display: none;
    
}

.card:hover .text-poster-empty{
    display: none;
}

// # hover backdropb visible 
.card:hover .back-img{
    display:block;
    /* opacity: 0.8; */
    filter: brightness(0.5);
}
.card:hover .back-img-empty{
    display: block;
}

.card:hover .card-body{
    display:block;
}
</style>

