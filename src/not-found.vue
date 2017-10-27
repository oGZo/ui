<template>
    <div id="NotFound" class="not-found">
        <img src="/static/images/404.png" alt="">
    </div>
</template>

<script>

export default {
    name: 'not-found',
    data() {
        return {
        };
    }
};
</script>
<style lang="less" scoped>
@import (reference) './base.less';

.not-found {
    margin: 60px auto 0;
    width: 455px;
    height: 402px;
}
</style>


