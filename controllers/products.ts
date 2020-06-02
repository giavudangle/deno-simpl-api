import {v4} from 'https://deno.land/std/uuid/mod.ts'

import {Product} from '../types.ts'

let products : Product[] = [
  {
    id:"1",
    name:"Product One",
    description:"This is product one",
    price:88.88,
  },
  {
    id:"2",
    name:"Product Two",
    description:"This is product two",
    price:12.88,
  },
  {
    id:"3",
    name:"Product Two",
    description:"This is product two",
    price:12.88,
  }
];

const getProducts = ({response}:{response: any}) => {
  response.body = {
    success:true,
    data:products
  }
}
//getProduct,addProduct,updateProduct,deleteProduct

const getProduct = ({params,response}:{params:{id:string},response:any}) => {
  const product : Product | undefined = products.find(p => p.id === params.id)
  if (product){
    response.status = 200
    response.body = {
      success: true,
      data:product
    }
  } else {
    response.status = 404
    response.body = {
      success:false,
      msg: 'No Product found'
    }
  }
}


const addProduct = async ({request,response}:{request:any,response:any}) => {
  const body = await request.body();
  if(!request.body){
    response.status = 400
    response.body = {
      success:false,
      msg:'No Data'
    }
  } else {
    const product : Product = body.value
    product.id=v4.generate()
    products.push(product)
    response.status = 201
    response.body = {
      success:true,
      data:product
    }
  }
}




const updateProduct = async ({params,request,response}:{params:{id:string},request:any,response:any}) => {
  const product : Product | undefined = products.find(p => p.id === params.id)
  if(product){
    const body = await request.body()
    const updateData : {
      name?:string;
      description?:string;
      price?:number;
    } = body.value
    products = products.map(p => p.id === params.id ? {...p,...updateProduct}:p)
    response.status = 200
    response.body = {
      success:true,
      data:products
    }
  } else {
    response.status = 404
    response.body = {
      success:false,
      msg:'No product found'
    }
  }
}

const deleteProduct = ({params,response}:{params:{id:string},response:any}) => {
  products = products.filter(p => p.id !== params.id)
  response.body = {
    success:true,
    msg:'Product removed'
  }
}

export {getProducts,addProduct,updateProduct,deleteProduct,getProduct}