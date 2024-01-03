import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PanierService } from './panier.service';
import { CreatePanierDto } from './dto/create-panier.dto';
import { UpdatePanierDto } from './dto/update-panier.dto';

@Controller('panier')
export class PanierController {
  constructor(private readonly panierService: PanierService) {}

  @Post('add')
  async create(@Body() createPanierDto: CreatePanierDto) {
    return await this.panierService.create(createPanierDto);
  }

  @Get('all')
  async findAll() {
    return await this.panierService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    return await this.panierService.findOne(+id);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updatePanierDto: UpdatePanierDto,
  ) {
    return await this.panierService.update(+id, updatePanierDto);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    return await this.panierService.remove(+id);
  }

  @Get('getByCustomer/:id')
  async getPanierByCustomer(@Param('id') id: string) {
    return await this.panierService.getPanierByCustomerId(+id);
  }

  @Get('getByCustomerSum/:id')
  async getPanierByCustomerSum(@Param('id') id: string) {
    return await this.panierService.getPanierByCustomer(+id);
  }
}
