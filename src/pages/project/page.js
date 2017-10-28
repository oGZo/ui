import moment from 'moment';

export default {
    name: 'index',
    data() {
        const { projectId } = this.$route.query;
        const param = {
            projectId
        };
        return {
            param,
            list: [],
            projectName: '',
            projectId,
            loading: true,
            action: `${CONFIG.url || ''}/file/saveFile`
        };
    },
    created() {
        this.getPage();
    },
    methods: {
        async getPage() {
            const { projectId } = this;
            const { list, projectName } = await KKL.Ajax.get('file/getHtml', { projectId });
            this.projectName = projectName;
            list.forEach(item => {
                item.createdTime = moment(item.createdTime).format('YYYY-MM-DD HH:mm');
            });
            this.list = list;
            this.loading = false;
            console.log(list);
        },
        toHtml(item) {
            console.log(item);
            location.href = `${location.protocol}//${location.hostname}:4001/${item.relativePath}`;
        },
        uploadBefore() {
            this.loading = true;
        },
        async uploadComplete() {
            await this.getPage();
            this.loading = false;
        }
    }
};
