import {
  Model,
  DataTypes,
  Association,
  Optional,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyCountAssociationsMixin,
} from "sequelize";
import { sequelize } from "./index";
import { Book } from "./Book";
import { StoreBook } from "./StoreBook";

interface StoreAttributes {
  id: number;
  name: string;
  address?: string;
}

interface StoreCreationAttributes extends Optional<StoreAttributes, "id"> {}

export class Store
  extends Model<StoreAttributes, StoreCreationAttributes>
  implements StoreAttributes
{
  public id!: number;
  public name!: string;
  public address?: string;

  public getBooks!: BelongsToManyGetAssociationsMixin<Book>;
  public addBook!: BelongsToManyAddAssociationMixin<Book, number>;
  public addBooks!: BelongsToManyAddAssociationsMixin<Book, number>;
  public hasBook!: BelongsToManyHasAssociationMixin<Book, number>;
  public countBooks!: BelongsToManyCountAssociationsMixin;

  public readonly StoreBook?: StoreBook;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    books: Association<Store, Book>;
  };
}

Store.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
  },
  {
    sequelize,
    tableName: "stores",
  }
);
