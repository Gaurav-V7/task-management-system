import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    dialectModule: sqlite3,
    storage: 'database.sqlite',
});

export default sequelize;