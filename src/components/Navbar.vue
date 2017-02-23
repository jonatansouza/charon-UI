<template lang="html">
  <nav class="navbar navbar-inverse" id="charon-nav">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">
                <strong>Charon</strong> |
                <small>
                  <span v-if="apiConnect"> Connected
                    <i class="fa fa-plug"></i>
                  </span>
                  <span v-if="!apiConnect"> Lost Connection
                    <i class="fa fa-circle-o-notch fa-spin"></i>
                  </span>
                </small>
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
                <li>
                    <a href="#/images">
                         <i class="fa fa-linux"></i> Images
                    </a>
                </li>
                <li>
                    <a href="#/flavors">
                         <i class="fa fa-shopping-cart"></i> Flavors
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
export default {
  props: {
    apiConnect : {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="css">
#charon-nav {
  z-index: 1000;
}

</style>
