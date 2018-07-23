import styled from "styled-components";
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const MyGallery = styled.div`
  width: 400px;
  min-height: 400px;
  .image-gallery-thumbnails-wrapper{
    background: #eee;
  }
`;


const DiningGallery = styled(MyGallery)`
  width: 280px;
  min-height: 400px;
  padding-bottom: 10px;
  .image-gallery-thumbnail{
    width: 55px;
    padding: 0;
  }
  .image-gallery-left-nav{
    font-size: 40px;
  } 
  .image-gallery-right-nav{
    font-size: 40px;
  }
  .image-gallery-thumbnails-wrapper{
    position: absolute;
    bottom: 55px;
    background: rgba(238,238,238,0.5);
    //opacity:0.7;
    width: 100%;
  }
  .image-gallery-slides{
   height: 400px;
  }
  .image-gallery-slide .image-gallery-description{
    bottom: -103px;
    background: #fff;
    color: #000;
  }
`;

const Aa = styled.a`
  color: #000;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  display: block;
`;

class Gallery extends React.Component{
  constructor(){
    super();
    this.state = {
      productName: ""
    }
  }

  ToDetail(item){
    return(
        <div>
          <div className='image-gallery-image'>
          <a href={`/products/${item.sku_id}`} target="_blank">
            <div className='play-button'></div>
            <img src={item.original}/>
          </a>
          </div>
            {
              <span
                className='image-gallery-description'
                style={{right: '0', textAlign: 'center'}}
              >
                <Aa href={`/products/${item.sku_id}`} target="_blank">
                  {item.productName}
                </Aa>
              </span>
            }
        </div>
    )
  }



  render(){
    const distinguish = this.props.distinguish;
    const image = this.props.images;
    let images;
    if(distinguish == "productDetail"){
      if(image){
        images = image.map(item => {
          return {
            original: item,
            thumbnail: item
          }
        });
        return(
          <MyGallery>
            <ImageGallery items={images} showPlayButton={false} showIndex={true} autoPlay={true} lazyLoad={true}
                          showNav={false}/>
          </MyGallery>
        )
      }else{
        return <MyGallery />
      }
    }else{
      if(image){
        images=image.map(item => {
          return {
            original: item.CodeMap,
            thumbnail: item.CodeMap,
            sku_id: item.sku_id,
            productName: item.MatName,
            renderItem: this.ToDetail.bind(item)
          };
        });
        return (
          <DiningGallery>
            {images.length >0 &&<ImageGallery items={images} showPlayButton={false} autoPlay={false} lazyLoad={true} showNav={false}
              slideOnThumbnailHover={true} showFullscreenButton={false}
            />}
          </DiningGallery>
        )
      }else {
        return <DiningGallery />
      }
    }



  }

}


export default Gallery;

