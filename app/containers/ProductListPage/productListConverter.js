/**
 * Created by 23hp on 2017/6/30.
 * 解析商品详情接口数据到本地商品模型
 */
/**
 * 将接口商品数据填充到本地商品模型
 * @param productListData
 */
export function parseProductList(productListData) {
  let productList = [];
    for (const item of productListData) {
        // let level = item.cv6;
        // switch (item.cv6) {
        //     case'AAA':
        //         level = '优等品';
        //         break;
        //     // case'B':
        //     //     level = '一级品';
        //     //     break;
        //     // case'C':
        //     //     level = '合格品';
        //     //     break;
        //     // case'D':
        //     //     level = '四级品';
        //     //     break;
        // }
        let title = getNotNullString(item.material)+getNotNullString(item.matname) + getNotNullString(item.matcode)+getNotNullString(item.special)+getNotNullString(item.cv6);
        let product = {
            id: item.sku_id,
            image: item.codemap,
            title: title,
            unit:item.baseuom,
            price: item.price || 0.0
        };
        productList.push(product);
    }
    return productList;

}

function getNotNullString(string) {
    return string?string+' ':'';
}
