<template>
    <main>
        <section class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <ul>
                        <li class="text-dark" v-for="(film,index) in loadedFilmsList" :key="index">
                            {{film.title}}
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
export default {
    name:"MainWrapper",

    props:{
        "loadedFilmsList" :Array,
    }
}
</script>

<style lang="scss" scoped>

</style>