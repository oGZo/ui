export default {
  data() {
    return {
      form: {
        name: '',
        pwd: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请填写密码', trigger: 'change' },
          { min: 6, max: 25, message: '长度在 6 到 25 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    isLogin() {
        let route = this.$route;
        return !!KKL.cookie.get('kkl_ui_token') && !!route;
    }
  },
  created () {
    if(this.isLogin){
        this.$router.replace({
            name: 'index'
        });
      }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
            const { name, pwd } = this.form;
            try{
                const da = { name, pwd };
                const data = await KKL.Ajax.post('user/login', da);
                KKL.cookie.set('kkl_ui_token', data.token);
                let { query } = this.$route;
                if(query.redirect){
                    this.$router.replace({
                        name: query.redirect,
                        query: query.paramter && JSON.parse(query.paramter) || {}
                    });
                    return;
                }
                this.$router.push({
                    name: 'index'
                });
            }catch(err){
                this.$message.error(err.message);
            }
        } else {
            // this.$message.error('账号或密码错误');
          return false;
        }
      });
    },
    enter() {
        this.submitForm('ruleForm');
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

  }
};
