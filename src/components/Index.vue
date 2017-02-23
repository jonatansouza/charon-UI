<style lang="css">

#top {
    z-index: -1;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background: url("../assets/bg.jpg") no-repeat center center scroll;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    -o-background-size: cover;
}

.content {
    margin-top: 10%;
}

</style>

<template lang="html">

<div>
    <div id="top">
    </div>
    <div class="content text-center">
        <h1><strong>CHARON</strong><br><small>Middleware Cloud IOT integrate</small></h1>
        <a href="#/login" class="btn btn-default btn-lg">Sign in</a>
    </div>
</div>

</template>

<script>

export default {
    name: 'index'
}

</script>
