<template>
    <div class="no-list"  >
        <div class="hint-area">
           <!-- <img :src="noListImg" alt=""> -->
           <p>暂时没有数据</p>
        </div>
    </div>
</template>

<script>
import noListImg from '@/assets/no-list.png';

export default {
    name: 'no-list',
    data() {
        return {
            noListImg,
        };
    }
};
</script>
<style lang="less" scoped>
    @import '../base.less';
    .no-list {
        height: 449px;
    }
    .hint-area {
        padding-top: 110px;
        text-align: center;
        p {
            margin-top: 20px;
            font-size: 14px;
        	text-align: center;
	        color: @g-font-light-color;
        }
    }
</style>



