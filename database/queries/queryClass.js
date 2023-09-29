const userHandler = require('../schemas/user.js');

var query = {

    create: async function (discordID, nickname) {

        const user = new userHandler({
            discordID: discordID,
            nickname: nickname,
            attendanceYear: 0,
            attendanceDates: [],
        });

        const savedUser = await user.save();

        return savedUser ? true : false;
    },
    
    mark: async function (discordID, date) {

        const updatedUser = await userHandler.findOneAndUpdate(
            { 
                discordID: discordID 
            },
            {
                $push: { attendanceDates: date },
                $inc: { attendanceYear: 1 }
            },
            { 
                new: true 
            }
        );

        return updatedUser ? true : false;

    }

}

module.exports = query;