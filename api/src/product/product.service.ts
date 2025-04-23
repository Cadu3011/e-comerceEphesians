import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProductService {
  @Inject()
  private readonly prisma: PrismaService

  async create(data: Prisma.ProductCreateInput, estoqueData: Prisma.EstoqueCreateInput) {
    const product = await this.prisma.product.create({ data: {
      name: data.name,
      price: data.price,
      quantity: Number(data.quantity),
      estoques: {
        create: 
           estoqueData  
        
      },
    },
  });

  return product;
  }
  async addStockToProduct(productId: number, quantityToAdd: number): Promise<void> {
   
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { estoques: true }, 
    });

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    await this.prisma.product.update({
      where: { id: productId },
      data: {
        quantity: product.quantity + quantityToAdd,
      },
    });

    
    
      await this.prisma.estoque.create({
        data: {
          quantidade: quantityToAdd,
          produto: {
            connect: { id: productId }, 
        },
      }
      })
  }
  findAll() {
    return this.prisma.product.findMany();
  }
  findAllProductActive(nome: string) {
    return this.prisma.product.findMany({where:{name:{contains:nome},isActive:true}});
  }
  findAllInStock(id : number) {
    return this.prisma.estoque.findMany({where:{produtoId:id}})
  }
  findOne(id: Prisma.ProductWhereUniqueInput) {
    return this.prisma.product.findUnique({where:id})
  }

  async update(params:{where: Prisma.ProductWhereUniqueInput, data: Prisma.ProductUpdateInput}) {
    const{where, data} = params
    const product = await this.findOne(where)

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    return this.prisma.product.update({data,where})
  }
}
