module.exports = class
{
    constructor()
    {
        const config = process.env;
        this.stripe = require("stripe")(config.STRIPE_KEY);
    }

    createCustomer(token, user)
    {
        return this.stripe.customers.create({
            description: `Customer ${user.care_home.name}`,
            source: token,
            email: user.email,
            metadata: {
                user_id: user.id
            }
        });
    }

    updateCustomer(token, user)
    {
        return this.stripe.customers.update(user.care_home.payment_system.customer_id, {
            description: `Customer ${user.care_home.name}`,
            source: token,
            email: user.email,
            metadata: {
                user_id: user.id
            }
        });
    }

    createCustomAccount(token, user)
    {
        return this.stripe.accounts.create({
            country: 'GB',
            type: 'custom',
            external_account: token,
            email: user.email,
            metadata: {
                user_id: user.id
            }
        });
    }

    updateCustomAccount(token, user)
    {
        return this.stripe.accounts.update(user.carer.payment_system.account_id, {
            external_account: token,
            email: user.email,
            metadata: {
                user_id: user.id
            }
        });
    }

    calculatePaymentTime(startDate)
    {
        //working days
        const workingDays = [
            {
                day: "monday",
                dayNumber: 1,
            },
            {
                day: "tuesday",
                dayNumber: 2,
            },
            {
                day: "wednesday",
                dayNumber: 3,
            },
            {
                day: "thursday",
                dayNumber: 4,
            },
            {
                day: "friday",
                dayNumber: 5,
            }
        ];

        console.log("Start date entry:", startDate);

        //bounds in ms
        const startBound = 1000  * 60 * 60 * 9;
        const endBound = 1000 * 60 * 60 * 15;
        let timestampDelay = 1000 * 60 * 60  * 18; //three working days
        let dailyDelay = 1000 * 60 * 60  * 6;

        //preparing start date
        let startDateWorkingDayIndex = workingDays.findIndex(startDateWorkingDay => startDateWorkingDay.dayNumber == startDate.getDay());
        let startDateHours = startDate.getMilliseconds() + (startDate.getSeconds() * 1000) + (startDate.getMinutes() * 60 * 1000) + (startDate.getHours() * 60 * 60 * 1000);

        while (startDateWorkingDayIndex == -1 || startDateHours < startBound || startDateHours >= endBound)
        {
            if(startDateWorkingDayIndex == -1) //not working day then add one day, set hours to beginning and check again
            {
                startDate.setDate(startDate.getDate() + 1);
                startDate.setHours(9,0,0,0);
            }
            else if(startDateHours < startBound) // working day before working hours then set hours to beginning and check again
                startDate.setHours(9,0,0,0);
            else if(startDateHours > endBound)
            {
                startDate.setDate(startDate.getDate() + 1);
                startDate.setHours(9,0,0,0);
            }

            //update
            startDateWorkingDayIndex = workingDays.findIndex(startDateWorkingDay => startDateWorkingDay.dayNumber == startDate.getDay());
            startDateHours = startDate.getMilliseconds() + (startDate.getSeconds() * 1000) + (startDate.getMinutes() * 60 * 1000) + (startDate.getHours() * 60 * 60 * 1000);
        }

        console.log("Start date calculated:", startDate);

        //Debit date calculation
        let debitDate = new Date(startDate.getTime());

        //preparing debit date
        let debitDateWorkingDayIndex = workingDays.findIndex(debitDateWorkingDay => debitDateWorkingDay.dayNumber == debitDate.getDay());
        let debitDateHours = debitDate.getMilliseconds() + (debitDate.getSeconds() * 1000) + (debitDate.getMinutes() * 60 * 1000) + (debitDate.getHours() * 60 * 60 * 1000);

        while(timestampDelay > 0)
        {
            if(debitDateWorkingDayIndex != -1) // working day, before working hours then set hours to beginning and check again
            {
                let availableTime = 0;
                let timeToDelay = 0;

                if(debitDateHours < startBound) // full forking day to use
                    availableTime = dailyDelay;
                else if(debitDateHours >= startBound && debitDateHours < endBound) // time is between working hours
                    availableTime = endBound - debitDateHours;


                if(timestampDelay - availableTime >= 0)
                {
                    debitDate.setDate(debitDate.getDate() + 1);
                    debitDate.setHours(9,0,0,0);
                }
                else
                    debitDate.setTime(debitDate.getTime() + availableTime - timestampDelay)

                timestampDelay -= availableTime; // reducing timestamp delay
                
            }
            else
            {
                debitDate.setDate(debitDate.getDate() + 1);
                debitDate.setHours(9,0,0,0);
            }

            //update
            debitDateWorkingDayIndex = workingDays.findIndex(debitDateWorkingDay => debitDateWorkingDay.dayNumber == debitDate.getDay());
            debitDateHours = debitDate.getMilliseconds() + (debitDate.getSeconds() * 1000) + (debitDate.getMinutes() * 60 * 1000) + (debitDate.getHours() * 60 * 60 * 1000);
        }

        console.log("Calculated debit date:", debitDate);
    }
}
