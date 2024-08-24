import { Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize';
import { sequelize } from './index';
import { Book } from './Book';

interface AuthorAttributes {
  id: number;
  name: string;
}

interface AuthorCreationAttributes {
  name: string;
}

export class Author extends Model<AuthorAttributes, AuthorCreationAttributes> implements AuthorAttributes {
  public id!: number;
  public name!: string;

  public getBooks!: HasManyGetAssociationsMixin<Book>;
  public addBook!: HasManyAddAssociationMixin<Book, number>;
  public addBooks!: HasManyAddAssociationsMixin<Book, number>;
  public createBook!: HasManyCreateAssociationMixin<Book>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Author.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize,
  tableName: 'authors'
});
