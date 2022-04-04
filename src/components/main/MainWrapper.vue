<template>
    <main>
        <section class="container-fluid">
            <!-- row-cols-5 row-cols-xl-7  -->
            <div class="row px-1 d-flex flex-wrap justify-content-center container-film-cards py-4">
                <h1 class="text-danger col-12 text-center">MOVIES</h1>
                <FilmCard class="col-12 col-sm-6 col-lg-4 col-xl-2 p-0" v-for="(film,index) in loadedFilmsList" :key="index"
                :title="film.title"
                
                :originalTitle="film.original_title"

                :overview="film.overview"
                :language="film.original_language"
                :vote="film.vote_average"
                :poster="film.poster_path"
                :backdrop="film.backdrop_path"
                :id = film.id
                />
                <h1 class="text-danger col-12 text-center">SERIES</h1>
                <TvCard class="col-12 col-sm-6 col-lg-4 col-xl-2 p-0 " v-for="(serie,index) in loadedTvList" :key="index"
                :nameSerie="serie.name"
                :originSerieName="serie.original_name"
                :id = serie.id
                :overview="serie.overview"
                :language="serie.original_language"
                :vote="serie.vote_average"
                :poster="serie.poster_path"
                :backdrop="serie.backdrop_path"
                />

                <div class="text-white" v-if="loadedFilmsList.length == 0">No results</div>
            </div>
        </section>
    </main>
</template>

<script>
import FilmCard from "./FilmCard.vue"
import TvCard from "./TvCard.vue"

export default {
    name:"MainWrapper",
    components:{
        FilmCard,
        TvCard,
    },
    props:{
        "loadedFilmsList":Array,
        "loadedTvList":Array,
    },

    data(){
        return{
            tv:"tv",
            movie:"movie"
        }
    },
}
</script>

<style lang="scss" scoped>

main{
    background: rgb(43, 40, 40);
}
.container-film-cards{
    gap: 1rem;
}
</style>