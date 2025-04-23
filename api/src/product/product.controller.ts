import { Controller, Get, Post, Body, Patch, Param, ValidationPipe, ParseIntPipe, HttpStatus, } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from 'generated/prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, estoque: Prisma.EstoqueCreateInput) {
    return this.productService.create(createProductDto,estoque);
  }

  @Post(':productId/add-stock')
  async addStock(@Body(new ValidationPipe()) body: { quantity: number }, @Param('productId' ,new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) productId:number
  ) {
    return this.productService.addStockToProduct(productId, body.quantity);
  }
 
  @Get()
  findAll() {
    return this.productService.findAll();
  }
  @Get('stock/:produtoId')
  findAllInStock(@Param('produtoId' ,new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) produtoId:number ,) {
    return this.productService.findAllInStock(produtoId)
  }

  @Get(':id')
  findOne(@Param('id' ,new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number) {
    return this.productService.findOne({id});
  }
  @Get('/nome/:nome')
   async findByName( @Param('nome') nome: string) {
    try {
      const product = await this.productService.findAllProductActive(nome);
      if (!product) {
        return {
          message: 'Product not found',
          data: [], 
        };
      }
      return  product 
      ;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw('An error occurred');
    }
  }

  @Patch(':id')
  update(@Body(new ValidationPipe()) productData: UpdateProductDto, @Param('id' ,new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id:number) {
    return this.productService.update({where: {id},data:productData});
  }
}