import request from "@/utils/request";

// 上传文件
export function uploadFile(data) {
  return request({
    url: `/file/upload`,
    method: "post",
    data
  });
}

// 团队信息查看
export function loadInfo(obj) {
  return request({
    url: `/user/org/team`,
    method: "get",
    params: obj
  });
}

// 团队信息修改
export function editInfo(data) {
  return request({
    url: `/user/org/team`,
    method: "post",
    data
  });
}
