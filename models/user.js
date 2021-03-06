module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define("User", {
		user_email: DataTypes.STRING,
		user_name: DataTypes.STRING,
		user_password: DataTypes.STRING,
		user_level: DataTypes.INTEGER,
		isReal: DataTypes.BOOLEAN
	}, {
      classMethods: {
        associate: function(models) {
          User.hasMany(models.Goal);
        },
        associate: function(models) {
          User.hasMany(models.Menu);
        },
        associate: function(models) {
          User.hasMany(models.Shift);
        },
        associate: function(models) {
          User.hasMany(models.Job);
        }
      }
    });
	return User;
}