<template>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{{title}} {{nameSerie}}</h5>
            <country-flag v-if="language.length != 0" :country='language' size='small'/>
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
    }
}
</script>

<style lang="scss" scoped>

</style>