$(function () {
    let $form = $('.log_in_box')
    $form.on('submit',function(e){
      e.preventDefault()
      let hash = {}
      let need = ['tel', 'password', 'repassword','code']
      need.forEach((name)=>{
        let value = $form.find(`[name=${name}]`).val()
        hash[name] = value
      })
      $form.find('.error').each((index, span)=>{
        $(span).text('')
      })
      if(hash['tel'] === ''){
        $form.find('[name="tel"]').siblings('.error')
          .text('填电话呀同学')
        return
      }
      if(hash['password'] === ''){
        $form.find('[name="password"]').siblings('.error')
          .text('填密码呀同学')
        return
      }
      if(hash['repassword'] === ''){
        $form.find('[name="repassword"]').siblings('.error')
          .text('确认密码呀同学')
        return
      }
      if(hash['password'] !== hash['repassword']){
        $form.find('[name="repassword"]').siblings('.error')
          .text('密码不匹配')
        return
        }
        if(hash['code'] === ''){
            $form.find('[name="code"]').siblings('.error')
              .text('验证码呀同学')
            return
          }
          if(hash['get_code'] !== hash['code']){
            $form.find('[name="get_code"]').siblings('.error')
              .text('验证码不匹配')
            return
          }
      $.post('/register', hash)
        .then((response)=>{
          console.log(response)
        }, (request)=>{
          let {errors} = request.responseJSON
          if(errors.tel && errors.tel === 'invalid'){
            $form.find('[name="tel"]').siblings('.error')
              .text('电话格式错误')
          }
        })
    })
})