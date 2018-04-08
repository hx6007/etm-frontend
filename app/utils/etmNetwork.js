/**
 * Created by 23hp on 2017/4/13.
 * 基于Promise的网络请求库,包含GET POST请求，上传下载功能
 * 使用方法：
 * 先引入： import {get,post,...} from 本文件;
 * · get请求:    get("http://api.lolatc.com/v1",{id:2}).then(data=>{}).catch(error=>{});
 * · post请求:    post("http://api.lolatc.com/v1",{id:2}).then(data=>{}).catch(error=>{});
 *  then方法里的参数第一个是成功回调，第二个是失败回调，两个回调都是可选的
 */
import request from "./request";
import 'whatwg-fetch';

/**
 * 发送get 请求
 * @param url  路径 必填
 * @param headers 请求头参数 可选
 */
export function get(url, headers={'Content-Type': 'application/json'}) {
    return request(url,{
      method: "GET",
      headers: headers,
    });
}
/**
 * 发送POST请求
 * @param url 路径 必填
 * @param param 参数 可选
 * @param headers 请求头参数 可选
 */
export function post(url, param,headers={'Content-Type': 'application/json'}) {
    return request(url, {
      method: "POST",
      headers:headers,
      body: JSON.stringify(param)
    });
}
