const listItem = (sequelize, DataTypes) => {
    const ListItem = sequelize.define('listItem', {
        name: {
            type: DataTypes.STRING,
        },
        link: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        mainLanguages: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
        tranlationLanguages: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
        creatorID: {
            type: DataTypes.INTEGER,
        },
    });

    return ListItem;
};

export default listItem;