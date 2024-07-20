
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('search')
  async search(
    @Query('q') query: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ page: number, limit: number, total: number, results: Product[] }> {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      throw new BadRequestException('The query parameter \'q\' is required and must be a non-empty string.');
    }

    const { results, total } = await this.productsService.search(query, page, limit);

    return {
      page,
      limit,
      total,
      results,
    };
  }
}
