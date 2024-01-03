import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AdminService } from 'src/admin/admin.service';
import { CustomerService } from 'src/customer/customer.service';
import LoginDto from './dto/login-user.dto';
import { DriverService } from 'src/driver/driver.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly adminService: AdminService,
    private readonly customerService: CustomerService,
    private readonly driverService: DriverService,
  ) {}

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);

    if (createUserDto.admin_id) {
      const admin = await this.adminService.findOne(createUserDto.admin_id);
      user.admin = admin;
    }

    if (createUserDto.customer_id) {
      const customer = await this.customerService.findOne(
        createUserDto.customer_id,
      );
      user.customer = customer;
    }

    if (createUserDto.driver_id) {
      const driver = await this.driverService.findOne(createUserDto.driver_id);
      user.driver = driver;
    }

    user.password = await bcrypt.hash(createUserDto.password, 10);
    return await this.userRepository.save(user);
  }

  /** login function */
  async login(loginDto: LoginDto) {
    const phone = loginDto.phone;
    const userLog = await this.userRepository.find({
      where: { phone: phone },
      select: ['id', 'phone', 'password', 'role', 'admin', 'customer'],
      relations: ['customer', 'admin'],
    });
    if (userLog.length > 0) {
      const com = await bcrypt.compare(loginDto.password, userLog[0].password);
      if (com) {
        return {
          id: userLog[0].id,
          phone: userLog[0].phone,
          role: userLog[0].role,
          customer: userLog[0].customer,
          admin: userLog[0].admin,
        };
      } else {
        return {
          error: -1,
        };
      }
    }
    return {
      error: -1,
    };
  }

  async findAll() {
    return await this.userRepository.find({
      relations: ['admin', 'customer'],
    });
  }

  /*async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }*/

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: ['customer', 'admin', 'driver'],
    });
    return user;
  }

  async findByPhone(phone: number) {
    const user = await this.userRepository.findOneBy({ phone });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async getCustomerByUserId(id: number) {
    const users = await this.userRepository
      .createQueryBuilder()
      .select('user.phone', 'phone')
      .addSelect('user.role', 'role')
      .addSelect('customer.id', 'id')
      .addSelect('customer.lastName', 'lastName')
      .addSelect('customer.firstName', 'firstName')
      .addSelect('customer.email', 'email')
      .addSelect('customer.type', 'type')
      .from('user', 'user')
      .innerJoin('users.customer', 'customer')
      .where('user.id = :id', { id: id })
      .getRawOne();

    return users;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    await this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return user;
  }

  async getdriverByUserId(id: number) {
    const user = await this.userRepository
      .createQueryBuilder()
      .select('user.phone', 'phone')
      .addSelect('user.role', 'role')
      .addSelect('driver')
      .from('user', 'user')
      .innerJoin('user.driver', 'driver')
      .where('user.id = :id', { id: id })
      .groupBy('user.id')
      .addGroupBy('driver.id')
      .getRawOne();
    return user;
  }

  async getAdminByUserId(id: number) {
    const user = await this.userRepository
      .createQueryBuilder()
      .select('user.phone', 'phone')
      .addSelect('user.id', 'userId')
      .addSelect('admin.id', 'adminId')
      .addSelect('user.role', 'role')
      .addSelect('admin.pseudo', 'pseudo')
      .from('user', 'user')
      .innerJoin('user.admin', 'admin')
      .where('user.id = :id', { id: id })
      .groupBy('user.id')
      .addGroupBy('admin.id')
      .getRawOne();
    return user;
  }

  async getUserAdmin() {
    const user = await this.userRepository
      .createQueryBuilder()
      .select('user.phone', 'phone')
      .addSelect('user.id', 'userId')
      .addSelect('admin.id', 'adminId')
      .addSelect('user.role', 'role')
      .addSelect('admin.pseudo', 'pseudo')
      .from('user', 'user')
      .innerJoin('user.admin', 'admin')
      .groupBy('user.id')
      .addGroupBy('admin.id')
      .getRawMany();
    return user;
  }

  async getUserCustomer() {
    const user = await this.userRepository
      .createQueryBuilder()
      .select('user.phone', 'phone')
      .addSelect('user.id', 'userId')
      .addSelect('customer.id', 'customerId')
      .addSelect('user.role', 'role')
      .addSelect('customer')
      .from('user', 'user')
      .innerJoin('user.customer', 'customer')
      .groupBy('user.id')
      .addGroupBy('customer.id')
      .getRawMany();
    return user;
  }

  async getUserdriver() {
    const user = await this.userRepository
      .createQueryBuilder()
      .select('user.phone', 'phone')
      .addSelect('user.role', 'role')
      .addSelect('driver')
      .from('user', 'user')
      .innerJoin('user.driver', 'driver')
      .groupBy('user.id')
      .addGroupBy('driver.id')
      .getRawMany();
    return user;
  }
}
