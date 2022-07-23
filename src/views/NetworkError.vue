<template>
    <div class="networkError">
        <h1>Uh-Oh!</h1>

        <h3>
            It looks like you're experiencing some network issues, please take a breath and <a href="#" @click="$router.go(-1)">Click here</a> to try again,
        </h3>
    </div>
    <h1>Oops!</h1>
    <h3>The {{ resource }} you're looking for is not here.</h3>
    <router-link :to="{ name: 'EventList' }">Back to the home page</router-link>
</template>