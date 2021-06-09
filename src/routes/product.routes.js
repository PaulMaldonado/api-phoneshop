import { Router } from 'express';
import * as ProductController from '../controllers/productController';

const router = Router();

router.get('/products', ProductController.findAllProducts);
router.get('/product/:productId', ProductController.findProductById);
router.get('/count', ProductController.countProducts);
router.post('/create', ProductController.createProduct);
router.put('/update/:productId', ProductController.updateProductById);
router.put('/edit/:id', ProductController.editProductById);
router.delete('/delete/:productId', ProductController.deleteProductById);

export default router;