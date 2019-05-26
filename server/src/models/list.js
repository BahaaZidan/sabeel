const list = (sequelize, DataTypes) => {
    const List = sequelize.define('list', {
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        coverPhoto: {
            type: DataTypes.STRING,
        },
        creatorID: {
            type: DataTypes.INTEGER,
        },
        maintainersIDs: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: [],
        },
        listItemIDs: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: [],
        },
    });

    return List;
};

export default list;