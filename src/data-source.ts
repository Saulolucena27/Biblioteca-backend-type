import "reflect-metadata";
import { DataSource } from "typeorm";
import { Livro } from "./entity/livro";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "biblioteca.db",
  synchronize: true,
  logging: false,
  entities: [Livro],
});
