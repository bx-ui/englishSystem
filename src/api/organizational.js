import request from "@/utils/request";

export function loadList({
  pageSize,
  pageIndex,
  content,
  departmentType,
  teamId
}) {
  return request({
    url: `/user/org?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    method: "post",
    data: { content, departmentType, teamId }
  });
}

// 获取所有部门
export function loadAllDeport(data) {
  return request({
    url: `/user/org/alldepartment`,
    method: "post",
    data
  });
}

// 新增部门
export function addDeport(data) {
  return request({
    url: `/user/org/department`,
    method: "post",
    data
  });
}

// 编辑部门
export function editDeport(data) {
  return request({
    url: `/user/org/department`,
    method: "put",
    data
  });
}

// 删除部门
export function delDeport(data) {
  return request({
    url: `/user/org/department`,
    method: "delete",
    data
  });
}

// 新增职位
export function addPosition(data) {
  return request({
    url: `/user/org/position`,
    method: "post",
    data
  });
}

// 编辑职位
export function editPosition(data) {
  return request({
    url: `/user/org/position`,
    method: "put",
    data
  });
}

// 删除职位
export function delPosition(data) {
  return request({
    url: `/user/org/position`,
    method: "delete",
    data
  });
}

// 组织架构图
export function chartGraph(obj) {
  return request({
    url: `/user/org/graph`,
    method: "get",
    params: obj
  });
}
