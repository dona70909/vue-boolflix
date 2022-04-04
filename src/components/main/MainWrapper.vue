<template>
    <main>
        <section class="container-fluid">
            <!-- row-cols-5 row-cols-xl-7  -->
            <div class="row px-1 d-flex flex-wrap justify-content-center container-film-cards py-4">
                <FilmCard class="col-12 col-sm-6 col-lg-4 col-xl-2 p-0" v-for="(film,index) in loadedFilmsList" :key="index"
                    :title="film.title"
                    :nameSerie="film.name"
                    :originalTitle="film.original_title"
                    :originSerieName="film.original_name"
                    :overview="film.overview"
                    :language="film.original_language"
                    :vote="film.vote_average"
                    :poster="film.poster_path"
                    :backdrop="film.backdrop_path"
                />

                <div class="text-white" v-if="loadedFilmsList.length == 0">No results</div>
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