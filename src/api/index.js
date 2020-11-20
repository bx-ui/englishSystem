import request from "@/utils/request";
import axios from "axios";
export function pie() {
  return request({
    url: "/sss/bbb",
    method: "get"
  });
}

export function getOne() {
  return axios.get("/api/courses");
}
