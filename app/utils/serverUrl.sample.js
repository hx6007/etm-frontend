
/**
 * 服务器根域名
 * @type {string}
 * site_code => 资源中心：rc,e特卖：etm_api,用户中心（java）：user_api,资源中心（java）:rc_api
 */
export const RESOURCE_ROOT= 'https://api-stg.lolatc.com/api/gateway/rc?api_path=';
export const ETM_ROOT = 'https://api-stg.lolatc.com/api/gateway/etm_api?api_path=';
export const SITE_CODE = "51etm";

export function setUrl(site_code='',url='') {
	const ori_url = 'https://api-stg.lolatc.com/api/gateway/'
	const query = '?api_path=';
  return ori_url + site_code + query + url ;
}
