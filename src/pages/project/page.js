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
            isLogin: KKL.isLogin(),
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
        },
        async deleteFile(item, index) {
            try{
                await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await KKL.Ajax.post('file/deleteFile', item);
                this.list.splice(index, 1);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }catch(err){
                console.log(err);
            }
        },
        async updateFileName(item) {
            try{
                let confirmInfo = await this.$prompt('请输入新名字', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValue: item.filename,
                    inputPlaceholder: '请输入新名称',
                    inputPattern: /.{2,20}/,
                    inputErrorMessage: '名字必须为2-20个字符'
                });
                let newName = confirmInfo.value.trim();
                let oldName = item.filename;
                let data = {
                    ...item,
                    oldName,
                    newName,
                };
                await KKL.Ajax.post('file/updateFileName', data);
                // let str = JSON.stringify(item);
                // let regStr = `${oldName}`;
                // let reg = new RegExp(regStr,'g');
                // let newStr = str.replace(/`${oldName}`/g, newName);
                // let newData = JSON.parse(newStr);
                // Object.assign(item, newData);
                let keys = ['absolutePath', 'relativePath'];
                let indexInfo = '/index.html';
                let indexLength = indexInfo.length;
                let oldNameLength = oldName.length;
                item.filename = newName;
                Object.keys(item).forEach(key => {
                    let val = item[key];
                    if(keys.indexOf(key) > -1 && val.length){
                        item[key] = val.slice(0, 0 - indexLength - oldNameLength) + newName + indexInfo;
                    }
                });
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
            }catch(err){
                console.log(err);
            }
        }
    }
};
