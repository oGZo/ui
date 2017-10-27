

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
            const list = await KKL.Ajax.get('project/getProjectList');
            this.list = list;
            console.log(list);
        },
        toHtml(item){
            console.log(item);
            this.$router.push({
                name: 'project',
                query: {
                    projectId: item.id
                }
            });
            // location.href = `${location.protocol}//${location.hostname}:4001/${item.relativePath}`;
        }
    }
};
