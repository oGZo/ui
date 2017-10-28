import moment from 'moment';


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
            list.forEach(item => {
                item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm');
                item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm');
            });
            this.list = list;
            console.log(list);
        },
        toHtml(item) {
            console.log(item);
            this.$router.push({
                name: 'project',
                query: {
                    projectId: item.id
                }
            });
            // location.href = `${location.protocol}//${location.hostname}:4001/${item.relativePath}`;
        },
        addProject() {
            this.$prompt('请输入项目名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[0-9a-zA-Z\u4e00-\u9fa5]{2,12}$/,
                inputErrorMessage: '项目名称不正确'
            }).then(async({ value }) => {
                const project = await KKL.Ajax.post('project/addProject', { name: value });
                project.updateTime = moment(project.updateTime).format('YYYY-MM-DD HH:mm');
                project.createTime = moment(project.createTime).format('YYYY-MM-DD HH:mm');
                this.list.push(project);
                this.$message({
                    message: '创建成功',
                    type: 'success'
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }
};
