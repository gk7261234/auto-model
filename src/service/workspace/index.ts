import Axios from "../../utils/request";

export async function getListByPage(currentPageIndex: number) {
  return await Axios.get(`/api/topologies?pageIndex=${currentPageIndex}&pageCount=8`);
}


export async function getNodeById(id: string) {
  return await Axios.get(`/api/topology/${id}`);
}