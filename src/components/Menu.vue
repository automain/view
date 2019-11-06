<template>
    <div>
        <template v-for="(item, key) in this.menuData">
            <el-submenu :index="item.menuName" :key="key" v-if="item.children">
                <template slot="title">
                    <i :class="item.menuIcon" style="color:#f5fffa;"></i>
                    <span slot="title">{{item.menuName}}</span>
                </template>
                <Menu :menuData="item.children"></Menu>
            </el-submenu>
            <el-menu-item :index="item.menuPath" :key="key" v-else>
                <i :class="item.menuIcon" style="color:#f5fffa;"></i>
                <span slot="title">{{item.menuName}}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
    export default {
        props: ["menuData"],
        name: "Menu"
    };
</script>