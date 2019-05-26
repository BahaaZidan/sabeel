import bcrypt from 'bcrypt';

const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        bio: {
            type: DataTypes.STRING,
        },
        avatar: {
            type: DataTypes.STRING,
        },
        maintainedListsIDs: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            defaultValue: [],
        },
    });

    User.beforeCreate(async user => {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
    });

    return User;
};

export default user;