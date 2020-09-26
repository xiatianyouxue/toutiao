<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 登录表单 -->
    <van-form @submit="onLogin"
              :show-error="false"
              :show-error-message="false"
              validate-first
              ref="login-form"
              @failed="onFailed">
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="loginFormRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        name="code"
        placeholder="请输入验证码"
        :rules="loginFormRules.code"
      >
        <template #button>
          <van-button
            type="primary"
            size="small"
            @click.prevent="onSendSms"
          >发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button type="info" block class="login-btn">登录</van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '../../api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      // 表单验证规则
      loginFormRules: {
        mobile: [
          {
            required: true,
            message: '请填写手机号'
          },
          {
            pattern: /^1[3|4|5|7|8]\d{9}$/,
            message: '手机号不符合规则'
          }
        ],
        code: [
          {
            required: true,
            message: '请填写验证码'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码不符合规则'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    // 用户登录
    async onLogin () {
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try {
        const result = await login(this.user)
        console.log(result)
        this.$toast.success('登录成功')
      } catch (e) {
        console.log(e)
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    },
    // 表单验证错误时
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message, // 提示消息
          position: 'top' // 防止手机键盘太高看不见提示消息
        })
      }
    },
    // 发送验证码
    async onSendSms () {
      try {
        // 校验手机号码
        await this.$refs['login-form'].validate('mobile')
        // 验证通过，请求发送验证码
        await sendSms(this.user.mobile)
      } catch (err) {
        // try 里面任何代码的错误都会进入 catch
        // 不同的错误需要有不同的提示，那就需要判断了
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }

        // 提示用户
        this.$toast({
          message,
          position: 'top'
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import './../../styles/index';

  .login-container {
    .van-field {
      height: 45px;
    }

    .login-btn-wrap {
      padding: 26px 16px;

      .login-btn {
        background-color: #6bd4fb;
        border: none;
      }
    }
  }

</style>
