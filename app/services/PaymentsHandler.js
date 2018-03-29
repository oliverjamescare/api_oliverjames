
//core
const async = require("async");

//models
const User = require("./../models/User").schema;

module.exports = class
{
    constructor()
    {
        const config = process.env;
        this.stripe = require("stripe")(config.STRIPE_KEY);
    }

    //stripe methods
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

    createCustomAccount(token, user, ip)
    {
        return this.stripe.accounts.create({
            country: 'GB',
            type: 'custom',
            external_account: token,
            email: user.email,
            tos_acceptance: {
                date: Math.floor(Date.now() / 1000),
                ip: ip
            },
            metadata: {
                user_id: user.id
            }
        });
    }

    updateCustomAccount(token, user, ip)
    {
        return this.stripe.accounts.update(user.carer.payment_system.account_id, {
            //external_account: token,
            email: user.email,
            tos_acceptance: {
                date: Math.floor(Date.now() / 1000),
                ip: ip
            },
            metadata: {
                user_id: user.id
            }
        });
    }

    getTransactionBalance(transaction, account)
    {
        return this.stripe.balance.retrieve({
            stripe_account: account,
        });
    }

    createCustomAccountPayout(amount, account)
    {
        return this.stripe.payouts.create({
            amount: amount * 100,
            currency: "gbp",
        }, {
            stripe_account: account,
        });
    }

    createChargeTransfer(amount, fee, customer, account)
    {
        return new Promise((resolve, reject) => {
            this.stripe.tokens.create({
                customer: customer,
            }, {
                stripe_account: account,
            })
            .then(token => {
                return this.stripe.charges.create({
                        amount: amount * 100,
                        currency: "gbp",
                        source: token.id,
                        application_fee: fee * 100,
                    },
                    {
                        stripe_account: account,
                    });
            })
            .then(charge => resolve(charge))
            .catch(error => reject(error));
        });

        // return this.stripe.customers.list();
    }

    //payments methods
    processPayment(job, req)
    {
        return new Promise((resolve, reject) => {
            async.parallel({
                care_home: (callback) => User.findOne({ _id: job.care_home }).then(careHome => callback(null, careHome)),
                carer: (callback) => User.findOne({ _id: job.assignment.carer }).then(carer => callback(null, carer)),
            }, (errors, results) => {

                if(results.care_home.care_home.payment_system.customer_id && results.carer.carer.payment_system.account_id)
                {
                    const jobCost = job.calculateJobCost();
                    const appFee = ((jobCost * 10) / 100).toPrecision(2);
                    console.log(jobCost)
                    console.log(appFee);


                    // this.updateCustomAccount("123", results.carer,req.connection.remoteAddress)
                    //     .then(charge => {
                    //         resolve(charge);
                    //     })
                    //     .catch(error => {
                    //         reject(error);
                    //     })
                    this.createCustomAccountPayout(299.05 - 0.1 - 2, results.carer.carer.payment_system.account_id)
                        .then(charge => {
                            resolve(charge);
                        })
                        .catch(error => {
                            reject(error);
                        })
                    this.getTransactionBalance("txn_1CAciaDePpjss4klp3bzC6t0", results.carer.carer.payment_system.account_id)
                        .then(charge => {
                            resolve(charge);
                        })
                        .catch(error => {
                            reject(error);
                        })
                    // this.createChargeTransfer(200, 10, results.care_home.care_home.payment_system.customer_id, results.carer.carer.payment_system.account_id)
                    //     .then(charge => {
                    //         resolve(charge);
                    //     })
                    //     .catch(error => {
                    //         reject(error);
                    //     })
                }
            });
        });

    }

    calculateDebitDate(input)
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

        //bounds in ms
        const startBound = 1000  * 60 * 60 * 9;
        const endBound = 1000 * 60 * 60 * 15;
        let timestampDelay = 1000 * 60 * 60  * 18; //three working days
        let dailyDelay = 1000 * 60 * 60  * 6;

        //preparing start date
        let startDate = new Date(input.getTime());
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
            else if(startDateHours >= endBound)
            {
                startDate.setDate(startDate.getDate() + 1);
                startDate.setHours(9,0,0,0);
            }

            //update
            startDateWorkingDayIndex = workingDays.findIndex(startDateWorkingDay => startDateWorkingDay.dayNumber == startDate.getDay());
            startDateHours = startDate.getMilliseconds() + (startDate.getSeconds() * 1000) + (startDate.getMinutes() * 60 * 1000) + (startDate.getHours() * 60 * 60 * 1000);
        }

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

                if(debitDateHours < startBound) // full forking day to use
                    availableTime = dailyDelay;
                else if(debitDateHours >= startBound && debitDateHours < endBound) // time is between working hours
                    availableTime = endBound - debitDateHours;

                if(timestampDelay - availableTime > 0) //add full day and set hours to start next day
                {
                    debitDate.setDate(debitDate.getDate() + 1);
                    debitDate.setHours(9,0,0,0);
                }
                else if(timestampDelay - availableTime  == 0)
                    debitDate.setTime(debitDate.getTime() + availableTime); //add full available time
                else
                    debitDate.setTime(debitDate.getTime() + timestampDelay); // add rest

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

        return debitDate;
    }

}
