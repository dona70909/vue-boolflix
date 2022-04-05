<template>
    <main>
        <section class="container-fluid">
            <!-- row-cols-5 row-cols-xl-7  -->
            <div class="row px-1 d-flex flex-wrap justify-content-center container-film-cards py-4">

                <!-- !!!!  **************** FILMS CARDS ************************* -->
                <h1 class="col-12 text-uppercase">Films</h1>
                <FilmCard :loadedFilmsList="loadedFilmsList" class="col-12 col-sm-6 col-lg-4 col-xl-2 p-0" v-for="(film,indexMovie) in filterMovies" :key="indexMovie.id"
                :title="film.title"
                :originalTitle="film.original_title"

                :id = film.id

                :overview="film.overview"
                :language="film.original_language"
                :vote="film.vote_average"
                :poster="film.poster_path"
                :backdrop="film.backdrop_path"
                :genres="film.genre_ids"
                />
                <!-- !!!!  **************** SERIE CARDS ************************* -->
                <h1 class="col-12 text-uppercase">Series</h1>
                <TvCard class="col-12 col-sm-6 col-lg-4 col-xl-2 p-0 " v-for="(serie,indexTv) in filterTv" :key="indexTv.id"
                :nameSerie="serie.name"
                :originSerieName="serie.original_name"

                :id = serie.id
                :overview="serie.overview"
                :language="serie.original_language"
                :vote="serie.vote_average"
                :poster="serie.poster_path"
                :backdrop="serie.backdrop_path"
                />

                <h1 class="text-white text-uppercase" v-if="loadedFilmsList.length == 0 || loadedTvList.length == 0">No results...</h1>
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

        "listGenresMovies":Array,
        "selectedFilm":Number,

        "listGenresTv":Array,
        "selectedTv":Number,
    },

    computed:{
        filterMovies(){
            if(this.selectedFilm === -1){
                return this.loadedFilmsList;
            }

            return this.loadedFilmsList.filter(element => element.genre_ids[0] === this.selectedFilm)
        
        },

        filterTv(){
            if(this.selectedTv === -1){
                return this.loadedTvList;
            }

            return this.loadedTvList.filter(element => element.genre_ids[0] === this.selectedTv)
        
        }

        
    }

}
</script>

<style lang="scss">
@import '@/assets/scss/partials/_variables.scss';
main{
    background:$mainColorBg;
}
.container-film-cards{
    gap: 1rem;

    h1{
        color:$textRed;
        background: $bgBlack;
        padding: 2rem 1rem;
    }
}



</style>