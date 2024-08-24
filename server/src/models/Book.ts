import {
  Model,
  DataTypes,
  Optional,
  BelongsToManyGetAssociationsMixin,
} from "sequelize";
import { sequelize } from "./index";
import { Author } from "./Author";
import { Store } from "./Store";

interface BookAttributes {
  id: number;
  name: string;
  pages?: number;
  author_id?: number;
}

interface BookCreationAttributes extends Optional<BookAttributes, "id"> {}

export class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public id!: number;
  public name!: string;
  public pages?: number;
  public author_id?: number;

  public readonly Author?: Author;

  public getStores!: BelongsToManyGetAssociationsMixin<Store>;

  public readonly Stores?: Store[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Book.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    pages: { type: DataTypes.INTEGER },
    author_id: {
      type: DataTypes.INTEGER,
      references: { model: "authors", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    tableName: "books",
  }
);

Author.hasMany(Book, { foreignKey: "author_id" });
Book.belongsTo(Author, { foreignKey: "author_id" });
