import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { User } from 'src/users/entities/user.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { Driver } from 'src/driver/entities/driver.entity';
import { Category } from 'src/category/entities/category.entity';
import { Order } from 'src/order/entities/order.entity';
import { Truck } from 'src/truck/entities/truck.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Panier } from 'src/panier/entities/panier.entity';
import { Delivery } from 'src/delivery/entities/delivery.entity';
import { Chat } from 'src/chat/entities/chat.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Devise } from 'src/devise/entities/devise.entity';

config();

export const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRESQL_URL,
  host: process.env.DB_HOST,
  port: Number(process.env.BD_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    User,
    Admin,
    Customer,
    Driver,
    Order,
    OrderItem,
    Truck,
    Category,
    Product,
    Panier,
    Delivery,
    Chat,
    Comment,
    Notification,
    Devise,
  ],
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false, // For self-signed certificates
    },
  },
};
const dataSource = new DataSource(dataSourceOption);

export default dataSource;
