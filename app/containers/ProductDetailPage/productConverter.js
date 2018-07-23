/**
 * Created by 23hp on 2017/6/30.
 * 解析商品详情接口数据到本地商品模型
 */
/**
 * 将接口商品数据填充到本地商品模型
 * @param productData
 * @param id
 * @param warehouse
 * @param userLevel 用户等级 用于判断用户价格
 * @returns {{id: number, title: string, images: Array.<*>, detail: Array.<*>, priceFace: (*|number), price: (*|number), priceVip: (*|number), count: number, warehouse: string, stock: (*|string), location: (string|*), sizeList: *, styleList: *, direction: *, questions: *}}
 */
export function parseProduct(productData, id, warehouse = '佛山仓' , userLevel = 0) {
  let item = filterProductDetail(productData, id);
  const sizeList = filterSizeListUnique(productData, id);
  const styleList = filterStyleList(productData);
  const direction = parseDirection(item.guide);
  const questions = parseQuestion(item.problem);
  const MatGroup1 = getNotNullString(item.MatGroup1);
  const warehouseData = filterWarehouseData(item.price, warehouse);
  let level = warehouseData.level||item.cv6||"";
  // const title = getNotNullString(item.brand) + getNotNullString(item.product_category_name) +
  //   getNotNullString(item.name) +  getNotNullString(item.product_no) + getNotNullString(item.spec) + level;
  const title = getNotNullString(item.material) + getNotNullString(item.matname) + getNotNullString(warehouseData.matname) +  getNotNullString(item.matcode) + getNotNullString(item.special) + level;
  const imageMain = filterMainImages(item.picture);
  const imageDetail = filterDetailImages(item.picture);
  const priceFace = item.SPprice || 0.0;
  const priceVip = warehouseData.priceVip;
  const price_unit = getNotNullString(item.Baseuom);
  const price = warehouseData.price;
  const Futures = getNotNullString(item.Futures);
  // const color = getNotNullString(item.colour);
  // const brand = getNotNullString(item.material);
  // const Texture = getNotNullString(item.Texture);
  // const Technology = getNotNullString(item.Technology);
  const goldPrice = warehouseData.goldPrice;
  const userPrice = getUserPrice(userLevel,priceFace,price,priceVip,goldPrice);
  return {
    id: item.sku_id,
    product_no: item.matcode,
    title: title,
    images: imageMain,
    detail: imageDetail,
    priceFace: priceFace,
    price: price,
    priceVip: priceVip,
    goldPrice: goldPrice,
    userPrice:userPrice,//当前用户价格
    count: 1,//当前数量
    warehouse: warehouse,
    stock: warehouseData.stock,
    // location: warehouseData.location,//发货地
    sizeList: sizeList,
    styleList: styleList,
    Texture :item.Texture,
    direction: direction,
    questions: questions,
    Technology: item.Technology,
    product_category_id: warehouseData.id,
    product_category_name: item.matname,
    brand: item.material,
    spec: item.special,
    shape: item.shape,
    color: item.colour,
    surface_craft: item.surface_craft,
    rim_category: item.rim_category,
    material: item.material,
    level:level,
    level_text: level,
    price_unit: item.Baseuom,
    base_unit: item.Baseuom,
    is_special_supply:item.IsFor,
    MatGroup1: MatGroup1,
    Futures: item.Futures,//期货还是现货只在e进口显示
    Inventory: item.Inventory,//是否清仓
  };

}

/**
 * 是否专供
 * @param special_supply
 * @returns {boolean}
 */
// function isSpecailSupply(special_supply) {
//   return special_supply[0][1]===true;
// }



// /**
//  * 转换产品等级
//  * @param rawLevel
//  * @returns {string}
//  */
// export function parseProductLevel(rawLevel){
//   switch (rawLevel) {
//     case'AAA':
//       return '优等品';
//     // case'B':
//     //   return '一级品';
//     // case'C':
//     //   return '合格品';
//     // case'D':
//     //   return '四级品';
//   }
// }

function getUserPrice(userLevel,facePrice,memberPrice,vipPrice,goldPrice) {
  switch (userLevel){
    default:
    case 0:
      return facePrice;
    case 1:
      return memberPrice;
    case 2:
      return vipPrice;
    case 3:
      return goldPrice;
  }
}

function getNotNullString(string) {
  return string ? string + ' ' : '';
}

//读取仓库数据
function filterWarehouseData(warehouseList, warehouse) {
  let stock;
  // let location;
  let level;
  let price;
  let priceVip;
  let goldPrice;
  let matname;
  for (let item of warehouseList) {
    if (item.stcode == warehouse) {
      warehouse = item.stcode;
      stock = item.inventory_quantity;
      level = item.cv6;
      matname = item.matname;
      price = item.noVipPrice || 0.0;//--非会员价
      goldPrice = item.ptprice || 0.0;//--白金价
      priceVip = item.vipPrice || 0;//--会员价
      // location = item.province + item.city + item.district + item.warehouse_address;
    }
  }
  return {
    warehouse: warehouse,
    stock: stock || '-',
    // location: location == 0 ? '-' : location,
    matname: matname,
    level: level,
    price: price || 0,
    priceVip: priceVip || 0,
    goldPrice: goldPrice || 0
  };
}

//从接口中取出当前商品详情
function filterProductDetail(productList, id) {
  for (const item of productList) {
    if (item.sku_id == id) {
      return item;
    }
  }
}

//取出商品主图
function filterMainImages(imageList) {
  let images = [];
  for (let item of imageList) {
    if (item.tabFiled === 'image1' || item.tabFiled === 'image2') {
      images.push(item.filepath);
    }
  }
  return images;
}

//取出商品详情图
function filterDetailImages(imageList) {
  let images = [];
  for (let item of imageList) {
    if (item.tabFiled === 'image5' || item.tabFiled === 'image6' || item.tabFiled === 'image7' || item.tabFiled === 'image4') {
      images.push(item.filepath);
    }
  }
  return images;
}

//过滤型号列表
function filterStyleList(productList) {
  let styleList = [];
  for (const item of productList) {
    let style = {
      id: item.sku_id,
      image: ''
    };
    if(item.picture != undefined){
      for (const pic of item.picture) {
        if (pic.tabFiled === 'image1') {
          style.image = pic.filepath;
          break;
        }
      }
    }
    styleList.push(style)
  }
  return styleList;
}

//过滤规格列表   重复的
function filterSizeList(productList) {
  let sizeList = [];
  for (const item of productList) {
    sizeList.push({
      id: item.sku_id,
      value: item.spec
    });
  }
  return sizeList;
}

//过滤规格列表  不重复的
function filterSizeListUnique(productList, id) {
  let thisProduct = {};
  let sizeMap = {};
  for (const item of productList) {
    let key = item.spec;
    let value = item.sku_id;
    sizeMap[key] = value;
    if (id == value) {
      thisProduct[key] = value;
    }
  }
  Object.assign(sizeMap, thisProduct);
  let sizeList = [];
  for (let key in sizeMap) {
    sizeList.push({
      id: sizeMap[key],
      value: key
    });
  }
  return sizeList;
}

//购买须知
function parseDirection(guide) {
  if (!guide) return [];
  let direction = [];
  let rawDirection = guide.split('\n');
  for (let i = 0; i < rawDirection.length; i += 2) {
    let item = {
      title: rawDirection[i],
      desc: rawDirection[1 + i]
    };
    direction.push(item);
  }
  return direction;
}

//常见购买须知
function parseQuestion(problem) {
  if (!problem) return [];
  let questions = [];
  let rawQuestions = problem.split('提问：');
  for (let i = 0; i < rawQuestions.length; i++) {
    let questionArr = rawQuestions[i].split('解答：');
    let item = {
      title: questionArr[0],
      answer: questionArr[1]
    };
    questions.push(item);
  }
  return questions;

}
