import Sequelize from 'sequelize';

// const sequelize = new Sequelize(
//     'elhive',
//     'postgres',
//     'newpassword',
//     {
//         host: 'localhost',
//         dialect: 'postgres',
//     },
// );

const sequelize = new Sequelize(
    'iqvhjlrd',
    'iqvhjlrd',
    '9ZJF3XoI9mv4joBGQJ1kvg2ydcfa-TIp',
    {
        host: 'balarama.db.elephantsql.com',
        dialect: 'postgres',
    },
);

const models = {
    User: sequelize.import('./user'),
    List: sequelize.import('./list'),
    ListItem: sequelize.import('./listItem'),
};

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };

export default models;