import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => Math.round(Date.now() / 1000),
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
});

export default Task;