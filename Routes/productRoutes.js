import { Router } from "express";

const productRouter = Router();

productRouter.get('/',(req,res)=>{
    // Return all the product Present
})

productRouter.get('/:id',(req,res)=>{
    // Return specific product with id
})

export default productRouter;