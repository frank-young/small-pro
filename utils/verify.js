function verify (v) {
  let res = {}
  let rePhone = /^1[3|5|4|7|8|9]\d{9}$/

  if (v.name === '') {
     res = returnErr('姓名不能为空')
  } else if (v.name.length > 30) {
    res = returnErr('姓名长度不合适')
  } else if (v.phone === '') {
    res = returnErr('手机号不能为空')
  } else if (rePhone.test(v.phone) === false) {
    res = returnErr('手机号格式不正确')
  } else if (v.school === '') {
    res = returnErr('请填写学校')
  } else if (v.wechat_id === '') {
    res = returnErr('请填写微信号')
  } else {
    res = {
      status: true,
      text: '成功'
    }
  }
  return res;
}

function commentVerify (v) {
  let res = {}
  if (v === '') {
    res = returnErr('评论内容不能为空')
  } else if (v.length < 2) {
    res = returnErr('评论内容2个字以上')
  }  else if (v.length > 200) {
    res = returnErr('评论内容200个字以内')
  } else {
    res = {
      status: true,
      text: '成功'
    }
  }
  return res;
}

function returnErr (text){
  return {
    status: false,
    text: text
  }
}

module.exports = {
  verify,
  commentVerify
}
