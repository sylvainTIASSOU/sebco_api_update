import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  @InjectRepository(Admin)
  private readonly adminRepository: Repository<Admin>;

  async create(createAdminDto: CreateAdminDto) {
    const admin = await this.adminRepository.create(createAdminDto);
    return await this.adminRepository.save(admin);
  }

  async findAll() {
    return await this.adminRepository.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepository.findOneBy({ id });
    if (!admin) throw new NotFoundException('admin not found');
    return admin;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} ${updateAdminDto} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  /** get id by pseudo */
  async findIdByPseudo(pseudo: string) {
    const data = await this.adminRepository.findOneBy({ pseudo });
    if (!data)
      throw new NotFoundException('admin whith pseudo ${pseudo} not existe ');

    return data.id;
  }
}
