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

    calculatePaymentTime(summaryDate)
    {
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

        //checking if summary date is within working days and hours
        let workingDayIndex = workingDays.findIndex(workingDay => workingDay.dayNumber == summaryDate.getDay());
        let timestampDelay = 1000 * 60 * 60  * 18; //three working days
        let debitDate = new Date(summaryDate.getTime());
        let processedDay = workingDayIndex != -1 ? workingDayIndex : 0;

        const startHourBound = 1000  * 60 * 60 * 9;
        const endHourBound = 1000 * 60 * 60 * 15;
        let summaryDateTimestamp = summaryDate.getMilliseconds() + (summaryDate.getSeconds() * 1000) + (summaryDate.getMinutes() * 60 * 1000) + (summaryDate.getHours() * 60 * 60 * 1000);
        

        if(workingDayIndex != -1 && (summaryDateTimestamp > startHourBound && summaryDateTimestamp <= endHourBound))
        {
            while (timestampDelay > 0)
            {
                timestampDelay -= (endHourBound - summaryDateTimestamp);
            }
        }
    }
}
