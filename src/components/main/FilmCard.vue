<template>
    <div class="card col position-relative">

        <!-- poster null and backdrop ok -->
        <img :class="(poster == null)? 'd-none' : '' " class="card-img-top mb-2 poster-img" :src="'http://image.tmdb.org/t/p/w500/' + poster"  :alt="nameSerie || title">
        <div class="poster-img-empty" v-if="poster == null && backdrop != null">{{title}} {{nameSerie}}</div> 

        <!-- solo backdrop null and poster ok-->
        <img :class="(backdrop == null)? 'd-none' : '' "  class="card-img-top back-img" :src="'http://image.tmdb.org/t/p/w500/' + backdrop" :alt="nameSerie || title">    
        <div class="back-img-empty" v-if="backdrop == null && poster != null"></div>

        <!-- entrambi null -->
        <div  class="poster-img-empty" v-if="(backdrop == null) && (poster == null)">{{title}} {{nameSerie}}</div>
        <div class="back-img-empty" v-if="(backdrop == null) && (poster == null)"></div>

        <div class="card-body px-1 text-center position-absolute">
            <h5 class="card-title">{{title}} {{nameSerie}}</h5>
            <div>
                <country-flag v-show="language != 'en'" :country='language' size='small'/>
                <country-flag v-show="language == 'en'" country="gb-eng" size='small'/> 
            </div>
            <p v-show="(originalTitle !=  title) || (originSerieName != nameSerie)" class="card-text"> {{originalTitle}} {{originSerieName}}</p>
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
        background: red;
    }
    .back-img-empty{
        width:100%;
        height: 300px;
        background: rgb(46, 44, 44);
    }
    .card-body{
        display: none;
        top: 50%;
        left: 50%;
        z-index: 1;
        transform: translate(-50%, -50%);
        color:white;
        text-shadow: 1px 1px 1px black;
        text-transform: uppercase;
        font-weight: 700;
        p{
            margin: 0;
            padding:0;
        }
        .bi-star-fill{
            color: rgb(220, 220, 23);
            margin: 0 .1rem;
        }
    }
}

.back-img{
    display: none;
}
.card:hover .poster-img{
    display: none;
}
.card:hover .poster-img-empty{
    display: none;
}


.card:hover .back-img{
    display:block;
    opacity: 0.8;
    filter: brightness(0.5);
}

.card:hover .card-body{
    display:block;
}
</style>

