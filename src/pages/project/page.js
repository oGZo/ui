

export default {
    name: 'index',
    data() {

        return {
            list: []
        };
    },
    created() {
        this.getPage();
    },
    methods: {
        async getPage() {
            const { projectId } = this.$route.query;
            const list = await KKL.Ajax.get('file/getHtml', { projectId});
            this.list = list;
            console.log(list);
        },
        toHtml(item){
            console.log(item);
            location.href = `${location.protocol}//${location.hostname}:4001/${item.relativePath}`;
        }
    }
};
