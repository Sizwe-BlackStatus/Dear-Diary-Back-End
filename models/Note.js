module.exports = (sequelize, DataTypes) => {
    const Notes = sequelize.define('Notes', {
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Notes
}