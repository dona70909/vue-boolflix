<template>
    <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{{title}}</h5>
            <country-flag :country='language' size='small'/>
            <p class="card-text"> {{originalTitle}} - {{language}} -  {{vote}} </p>
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
    }
}
</script>

<style lang="scss" scoped>

</style>