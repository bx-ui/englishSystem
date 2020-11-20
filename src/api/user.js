import request from "@/utils/request";

export function loginIn(data) {
  return request({
    url: "/user/login",
    method: "post",
    data
  });
}

// 获取验证码
export function verifycode(data) {
  return request({
    url: "/user/login/verifycode",
    method: "post",
    data
  });
}
