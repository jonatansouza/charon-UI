<template lang="html">
  <nav class="navbar navbar-inverse" id="charon-nav">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">
                <strong>Charon</strong>
            </a>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="#/servers">
                      <i class="fa fa-desktop"></i>
                        Servers
                    </a>
                </li>
                <li>
                    <a href="#/volumes">
                         <i class="fa fa-database"></i> Volumes
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
export default {
}
</script>

<style lang="css">
#charon-nav {
  z-index: 1000;
}

</style>
