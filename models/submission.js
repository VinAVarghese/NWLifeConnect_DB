module.exports = function(sequelize, DataTypes) {
    let Submission = sequelize.define("Submission", {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        apt: DataTypes.STRING,
        city: DataTypes.STRING,
        zip: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        birthday: DataTypes.STRING,
        occupation: DataTypes.STRING,
        age: DataTypes.STRING,
        invitedBy: DataTypes.STRING,
        attendance: DataTypes.STRING,
        nextStepFreshStart: DataTypes.STRING,
        nextStepLordsPrayer: DataTypes.STRING,
        readyToServe: DataTypes.STRING,
        prayerPraise: DataTypes.STRING,
        confidential: DataTypes.STRING
    });
    return Submission;
}

        