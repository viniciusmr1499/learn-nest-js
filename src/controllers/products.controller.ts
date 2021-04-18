import { uuid } from 'uuidv4';
import { Controller, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

interface IData {
  id?: string;
  name: string;
  description: string;
  price: number;
}

@Controller('/products')
export class ProductsController {
  private productsAll: Array<IData> = [];

  @Get('/')
  public async index(
    @Req() _: Request,
    @Res() response: Response,
  ): Promise<Response> {
    return response.status(200).json(this.productsAll);
  }

  @Get('/:id')
  public async show(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const productExists = this.productsAll.find((item) => item.id === id);
      if (!productExists) throw new Error('Product not exists!');
      return response.status(200).json(productExists);
    } catch (err) {
      return response.status(404).json({
        error: 'fail',
        data: {
          message: err.message,
        },
      });
    }
  }

  @Post('/')
  public async create(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const { name, description, price } = request.body;
    const newProduct = { id: uuid(), name, description, price };
    this.productsAll.push(newProduct);
    return response.status(201).json(newProduct);
  }

  @Put('/:id')
  public async update(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { id } = request.params;
      const { name, description, price } = request.body;
      const productExists = this.productsAll.find((item) => {
        if (item.id === id) {
          item.name = name;
          item.description = description;
          item.price = price;
          return item;
        }
      });
      if (!productExists) throw new Error('Product not exists!');
      return response.status(200).json(productExists);
    } catch (err) {
      return response.status(404).json({
        error: 'fail',
        data: {
          message: err.message,
        },
      });
    }
  }

  @Delete('/:id')
  public async destroy(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const { id } = request.params;
      if (!id) throw new Error('The id does not exist!');
      const productExists = this.productsAll.find((item) => item.id === id);
      if (!productExists) throw new Error('The product does not exist!');
      this.productsAll.splice(productExists as any, 1);
      return response.status(200).json({
        error: 'success',
        data: {
          message: 'Product removed with success!',
        },
      });
    } catch (err) {
      return response.status(404).json({
        error: 'fail',
        data: {
          message: err.message,
        },
      });
    }
  }
}
