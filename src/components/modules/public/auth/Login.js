import Auth from 'src/shared/dto/Auth'
import { mapActions } from 'vuex'
import LoginService from 'src/shared/service/LoginService'

export default {
  data () {
    return {
      model: new Auth(),
      loading: true,
      rules: {
        username: [
          {required: true, message: 'Favor informar o usuário', trigger: 'blur'}
        ],
        secret: [
          {required: true, message: 'Favor informar a senha', trigger: 'blur'}
        ]
      }
    }
  },
  async created () {
    this.service = new LoginService(this.$resource)
    this.loading = false
    await this.attemptLogin({})
  },
  methods: {
    ...mapActions(['attemptLogin']),
    handleSubmit () {
      this.$refs['model'].validate((valid) => {
        if (valid) this.login()
        else {
          this.$notify.error({
            title: 'Erro',
            message: 'Favor verificar os campos em vermelho.'
          })
          return false
        }
      })
    },
    login () {
      this.loading = true
      let model = this.model.toJSON()

      this.service.login(model)
        .then((data) => {
          this.loading = false
          this.$notify.success({
            title: 'Success',
            message: 'Login realizado com sucesso'
          })
          data.username = this.model.username
          this.attemptLogin({data})
            .then(() => {
              this.$router.push({name: 'dashboard'})
            })
        }, () => {
          this.loading = false
          this.$notify.error({
            title: 'Erro',
            message: 'Usuário ou senha incorreta'
          })
        })
    },
    checkEnter (data) {
      console.log(data)
      debugger
    }
  }
}
