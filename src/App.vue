<template>
<div id="app">
    <SideBar v-if="!$route.meta.hiddens" />
    <div class="content" v-if="!$route.meta.hiddens">
        <NavBar />
        <div class="views">
            <router-view />
        </div>
    </div>

    <div class="templete-login" v-if="$route.meta.hiddens">
        <router-view />
    </div>
</div>
</template>

<script>
import SideBar from "./components/Sidebar";
import NavBar from "./components/Navbar";

export default {
    components: {
        SideBar,
        NavBar,
    },
};
</script>

<style lang="scss">
* {
    font-family: BoonBaan;

}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

.content {
    margin-left: 260px !important;
    background-color: #f4f7f8 !important;
    min-height: 100vh;
}

.views {
    padding: 50px 30px 30px 30px !important;
    // min-height: 100vh;
}

// Custom Css
.vs-sidebar-content {
    border-radius: 0 !important;
}

.vs-sidebar__item__text {
    font-size: 14px !important;
}

.vs-sidebar__group__content .vs-sidebar__item {
    font-weight: normal !important;
    color: #020202;
}

.vs-sidebar-content .vs-sidebar__logo {
    margin-top: -20px;
    margin-left: -15px;
}

.vs-sidebar-content .vs-sidebar__logo img {
    max-height: 50px !important;
}

.vs-navbar-content {
    -webkit-box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, var(--vs-shadow-opacity));
    box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, var(--vs-shadow-opacity));
    padding: 5px;
}

// Tables
.content table td,
.content table th {
    padding: 8px !important;
    border-radius: 0 !important;
    font-size: 15px;
    background: #ffff !important;
}

.vs-table__th__content {
    font-size: 16px !important;
}

.vs-table__footer {
    // background: none !important;
    text-align: right !important;
    border-radius: 0 !important;
}

.vs-dialog {
    border-radius: 10px !important;

}

.vs-select {
    width: 183% !important;
    border: none !important;
}

.vs-select__chips__chip__close {
    background: none !important;
    display: none !important;
}

.vs-select__chips__input {
    font-family: BoonBaan !important;
    font-size: 16px !important;
}

.vs-select__chips__chip {
    background: blue !important;
    color: #fff !important;
    padding: 4px 6px 4px 6px !important;
}

.vs-notification {
    padding: 10px !important;
    border-radius: 5px !important;
}

.vs-notification__content {
    .vs-notification__content__header {
        h4 {
            font-size: 16px !important;
            font-weight: normal !important;
        }
    }

    .vs-notification__content__text {
        p {
            font-size: 15px !important;
            font-weight: normal !important;
        }
    }
}

.vs-loading {
    background: none !important;
}
</style>
