<template>
    <div class="card">
        <img class="card-img-top mb-2" :src="'http://image.tmdb.org/t/p/w500/' + poster"  :alt="nameSerie || title">
        <img class="card-img-top d-none" :src="'http://backdrop.tmdb.org/t/p/w500/' + backdrop" :alt="nameSerie || title">    
        <div class="card-body">
            <h5 class="card-title">{{title}} {{nameSerie}}</h5>
            <country-flag v-if="language.length != 0" :country='language' size='small'/>
            <p v-else>language not defined</p>
            <p class="card-text"> {{originalTitle}}{{originSerieName}} - {{vote}} </p>
            <p>{{mediaType}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:"FilmCard",

    props:{
        "title":String,
        "originalTitle":String,
        "language":String,
        "vote":Number,
        "mediaType":String,
        "nameSerie":String,
        "originSerieName":String,
        "poster":String,
        "backdrop":String,
    }
}
</script>

<style lang="scss" scoped>
.card{
    width:calc(100% / 5);
}
</style>