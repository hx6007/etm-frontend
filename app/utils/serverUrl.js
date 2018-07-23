
/**
 * 服务器根域名
 * @type {string}
 */
export const RESOURCE_ROOT= 'https://java-getway.51etm.com/java-getway/apigateway/api.do?flagForAddress=rc&api_path=';
export const ETM_ROOT = 'https://java-getway.51etm.com/java-getway/apigateway/api.do?flagForAddress=etm_api&api_path=';
export const SITE_CODE = "51exc";

export function setUrl(site_code='',url='') {
  const ori_url = 'https://java-getway.51etm.com/java-getway/apigateway/api.do'
  const query = '?api_path=';
  const request_url = ori_url + query + url + '&flagForAddress='+ site_code;
  return request_url;
}
