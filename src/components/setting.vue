
<template>
  <!-- <div class="page_component"> -->
    <!-- -->
    <div>
      <el-form :model="configForm" ref="configForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="预算" prop="configForm">
        <el-input v-model="configForm.value"></el-input>
      </el-form-item>

      <el-form-item style="margin-left: 42%;">
        <el-button type="primary" @click="submitForm('configForm')">增加</el-button>
        <el-button @click="resetForm('configForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="configTable"
      border
      style="width: 400">
      <el-table-column
        prop="key"
        label="名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="value"
        label="对应值"
        width="200">
      </el-table-column>
    </el-table>
    </div>
  <!-- </div> -->
  
</template>

<script>

export default {
  name: 'Category',
  components: {
    
  },
  data () {
    return {
        configForm: {
            key: "预算",
            value: 0
        },
        rules: {
          value: [
              { required: true, message: '请输入预算', trigger: 'blur' },
              { min: 1, message: '至少1个字符', trigger: 'blur' }
          ]
        },
        configTable: []
        /*{
            id: 0,
            key: "",
            value: 2000
        }*/
    }
  },
  mounted() {
    this.getConfig();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          // this.$router.push("/home/overview")
          //提交config
          console.log(this.$refs[formName].model.value);
          console.log(this.$refs[formName].model.key)
          this.$http({
              url: "http://localhost:8089/config/save",
              method: "post",
              data: {
                  key: this.$refs[formName].model.key,
                  value: this.$refs[formName].model.value,
                  uid: this.$cookie.get("uid")
              },
              transformRequest: [function (data) {
                // Do whatever you want to transform the data
                let ret = '';
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret;
            }],
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
          }).then((response) => {
              //返回数据进行处理
              console.log(response);
              var data = response.data;
              if(Object.is(data.error, undefined)) {
              //   flag = true;
                //验证成功提交数据
                alert('完成!');
                this.configForm.value = "";
                //初始版本只有设置预算
                this.configTable[0].value = data.value;
              }
          })
        } else {
          console.log('填写有误!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getConfig() {
      this.$http({
            method: "GET",
            url: "http://localhost:8089/config/getConfig",
            params: {
                uid: this.$cookie.get("uid")
            }
        }).then((response) => {
            let data = response.data;
            if(Object.is(data.error, undefined)) {
                let config = {};
                config.id = data.id;
                config.key = data.key;
                config.value = data.value;
                this.configTable.push(config);
            }
        })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-ruleForm {
  display: inline-block;
  width: 460px;
  vertical-align: middle;
}
</style>
