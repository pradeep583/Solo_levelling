import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './solo_leveling.db',
  logging: false
});

export default sequelize;
