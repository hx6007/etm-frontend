
/**
 * 服务器根域名
 * @type {string}
 */
const GATEWAY=process.env.GATEWAY||'https://java-getway-stg.heyiit.com';
export const SITE_CODE = process.env.SITE_CODE||"97efx";
export const RESOURCE_ROOT= GATEWAY+'/java-getway/apigateway/api.do?flagForAddress=rc&api_path=';
export const ETM_ROOT = GATEWAY+'/java-getway/apigateway/api.do?flagForAddress=etm_api&api_path=';

export function setUrl(site_code='',url='') {
  const ori_url = GATEWAY+'/java-getway/apigateway/api.do';
  const query = '?api_path=';
  return ori_url + query + url + '&flagForAddress='+ site_code;
}

