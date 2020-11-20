import request from "@/utils/request";

export function loadList({
  pageIndex,
  pageSize,
  departmentId,
  jobLevel,
  positionName,
  teamId,
  column,
  content
}) {
  return request({
    url: `/user/member?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: "post",
    data: { column, content, departmentId, jobLevel, positionName, teamId }
  });
}

// 新增成员
export function addMember(data) {
  return request({
    url: `/user/member/add`,
    method: "post",
    data
  });
}

// 查看成员信息
export function loadMemberInfo(obj) {
  return request({
    url: `/user/member`,
    method: "get",
    params: obj
  });
}

// 编辑成员信息
export function editMember(data) {
  return request({
    url: `/user/member`,
    method: "put",
    data
  });
}

// 删除成员
export function delMember(data) {
  return request({
    url: `/user/member`,
    method: "delete",
    data
  });
}
