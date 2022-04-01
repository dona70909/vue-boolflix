<template>
    <main>
        <section class="container-fluid">
            <div class="row py-4 ">
                <div class="col-12 d-flex flex-wrap  justify-content-center container-film-cards">
                    <FilmCard v-for="(film,index) in loadedFilmsList" :key="index"
                    :title="film.title"
                    :originalTitle="film.original_title"
                    :language="film.original_language"
                    :vote="film.vote_average"
                    :mediaType ="film.media_type"
                    :nameSerie="film.name"
                    :originSerieName="film.original_name"
                    />
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import FilmCard from "./FilmCard.vue"

export default {
    name:"MainWrapper",
    components:{
        FilmCard,
    },
    props:{
        "loadedFilmsList" :Array,
    },

    data(){
        return{
            /*  filterFilms:[],
            filterSeries:[], */
            tv:"tv",
            movie:"movie"
        }
    },
}
</script>

<style lang="scss" scoped>
.container-film-cards{
    gap: 1rem 2rem;
}
</style>