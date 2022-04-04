<template>
    <div class="card col position-relative">

        <!-- poster null and backdrop ok -->
        <img v-show="poster != null" :class="((poster == null) && (backdrop != null))? 'd-none' : '' " class="card-img-top mb-2 poster-img" :src="'http://image.tmdb.org/t/p/w500/' + poster"  :alt="nameSerie || title">
        <div class="poster-img-empty " v-if="poster == null && backdrop != null">
            <h5 class="text-poster-empty">{{title}} {{nameSerie}}</h5>
        </div>  

        <!-- solo backdrop null and poster ok-->
        <img v-show="backdrop != null" :class="((backdrop == null) && (poster != null))? 'd-none' : '' "  class="card-img-top back-img" :src="'http://image.tmdb.org/t/p/w500/' + backdrop" :alt="nameSerie || title">    
        <div class="back-img-empty" v-show="backdrop == null && poster != null"></div>

        <!-- entrambi null -->
        <div class="poster-img-empty" v-if="(backdrop == null) && (poster == null)">
            <h5 class="text-poster-empty">{{title}} {{nameSerie}}</h5>
        </div>
        <div class="back-img-empty" v-if="(backdrop == null) && (poster == null)"></div>

        <div class="card-body p-0 position-absolute">

            <p class="text-danger">Titolo:</p>
            <p class="card-title">{{title}} {{nameSerie}}</p>

            <div class="flag-wrapper">
                <p class="d-inline-block text-danger me-2">Language:</p>
                <country-flag v-show="language != 'en'" :country='language' size='small'/>
                <country-flag v-show="language == 'en'" country="gb-eng" size='small'/> 
            </div>

            <p v-show="(originalTitle !=  title) || (originSerieName != nameSerie)" class="text-danger">Original title:</p>
            <p v-show="(originalTitle !=  title) || (originSerieName != nameSerie)" class="card-text">{{originalTitle}} {{originSerieName}}</p>

            <p v-show="overview != '' " class="text-danger">Overview:</p>
            <p v-show="overview != '' " class="overview-text mb-1">{{overview}}</p>

            <p v-if="vote != 0" class="text-danger">Vote:</p>
            <i v-for="(star,index) in starVote(vote)" :key="index" class="bi bi-star-fill"></i> 
        </div>
    </div>
</template>

<script>
export default {
    
    name:"FilmCard",

    props:{
        "title":String,
        "originalTitle":String,
        "nameSerie":String,
        "originSerieName":String,

        "overview":String,
        "language":String,
        "vote":Number,      
        "poster":String,
        "backdrop":String,

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
        }
    }
}
</script>

<style lang="scss" scoped>
.card{
    width:300px;
    height: 300px;
    box-shadow: 2px 2px 2px rgb(14, 13, 13);
    border: none;
    img{
        width:100%;
        /*  height: 100%;*/
        height: 300px;
        object-fit: center;
    }
    .poster-img-empty{
        width:100%;
        height: 300px;
        background: rgb(202, 25, 25);
        font-weight: 900;
        text-shadow: 2px 2px 10px black;
        text-transform: uppercase;

        display:flex; 
        justify-content: center; 
        align-items:center;
    }
    .back-img-empty{
        display: none;
        width:100%;
        height: 300px;
        background: rgb(46, 44, 44);
    }
    .card-body{
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

