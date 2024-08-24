import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "./index";
import { Store } from "./Store";
import { Book } from "./Book";

interface StoreBookAttributes {
  store_id: number;
  book_id: number;
  price: number;
  soldOut: boolean;
}

interface StoreBookCreationAttributes
  extends Optional<StoreBookAttributes, "store_id" | "book_id"> {}

export class StoreBook
  extends Model<StoreBookAttributes, StoreBookCreationAttributes>
  implements StoreBookAttributes
{
  public store_id!: number;
  public book_id!: number;
  public price!: number;
  public soldOut!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StoreBook.init(
  {
    store_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "Stores", key: "id" },
    },
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: { model: "Books", key: "id" },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    soldOut: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "StoreBooks",
    timestamps: true,
  }
);

Store.belongsToMany(Book, { through: StoreBook, foreignKey: "store_id" });
Book.belongsToMany(Store, { through: StoreBook, foreignKey: "book_id" });
