
//core
const async = require("async");

//models
const JobModel = require("./../models/Job");
const PaymentSchema = require("./../models/schemas/Payment");
const TransactionSchema = require("./../models/schemas/Transaction");

//services
const JobsHandler = require("./JobsHandler");

module.exports = class
{
    constructor()
    {
        const config = process.env;
        this.stripe = require("stripe")(config.STRIPE_KEY);
    }

    //customer
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

    //custom account
    createCustomAccount(token, user, ip)
    {
        return this.stripe.accounts.create({
            country: 'GB',
            type: 'custom',
            external_account: token,
            legal_entity: {
                type: "individual",
                first_name: user.carer.first_name,
                last_name: user.carer.surname,
                dob: {
                    day: user.carer.date_of_birth.getDate(),
                    month: user.carer.date_of_birth.getMonth() + 1,
                    year: user.carer.date_of_birth.getFullYear(),
                }
            },
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
            email: user.email,
            legal_entity: {
                type: "individual",
                first_name: user.carer.first_name,
                last_name: user.carer.surname,
                dob: {
                    day: user.carer.date_of_birth.getDate(),
                    month: user.carer.date_of_birth.getMonth() + 1,
                    year: user.carer.date_of_birth.getFullYear(),
                },
                address: {
                    postal_code: user.address.postal_code,
                    city: user.address.city,
                    line1: user.address.address_line_1
                }
            },
            tos_acceptance: {
                date: Math.floor(Date.now() / 1000),
                ip: ip
            },
            metadata: {
                user_id: user.id
            }
        });
    }

    getAccount(id)
    {
	    return new Promise(resolve => this.stripe.accounts.retrieve(id).then(account => resolve(account)).catch(error => resolve(null)))
    }

	sendIdentityProof(account, file)
	{
		return new Promise((resolve, reject) => {
			this.stripe.fileUploads.create({
				purpose: 'identity_document',
				file: {
					data: file,
				}
			}).then(response => {
				return this.stripe.accounts.update(account, {
					legal_entity: {
						verification: {
						    document: response.id
                        }
					}
				});
            })
            .then(response => resolve(response))
            .catch(error => reject(error));
        });
	}

    //charge
    createCustomerChargeToken(customer, account)
    {
        return this.stripe.tokens.create({ customer: customer }, { stripe_account: account })
    }

    createDirectCharge(amount, fee, token, account , job)
    {
        return this.stripe.charges.create({
                amount: Math.round(amount * 100),
                currency: "gbp",
                source: token.id,
                application_fee: Math.round(fee * 100),
                description: "Charge for job: " + job._id.toString(),
                metadata: {
                    job_id: job._id.toString()
                }
            },
            { stripe_account: account })
    }

    //transfer
    createFundsTransferToSubaccount(amount, account, job)
    {
        return this.stripe.transfers.create({
            amount: Math.round(amount * 100),
            currency: "gbp",
            destination: account,
            description: "Payment completion for Job ID: "+ job._id.toString(),
            metadata: {
                job_id: job._id.toString()
            }
        });
    }

    //balance
    getTransactionBalance(transaction, account = null)
    {
        let config = {};
        if(account)
            config["stripe_account"] = account;

        return this.stripe.balance.retrieveTransaction(transaction, config);
    }

    getAccountBalance(account = null)
    {
        let config = {};
        if(account)
            config["stripe_account"] = account;

        return this.stripe.balance.retrieve(config);
    }

    //payments handle
    processPayment(job, carer, careHome)
    {
        return new Promise((resolve, reject) => {

            const customer = careHome.care_home.payment_system.customer_id;
            const account = carer.carer.payment_system.account_id;

            if(
                customer && // care home is connected to payment system
                account && // carer is connected to payment system
                job.status == JobModel.statuses.PENDING_PAYMENT && // summary sent or half charge applied
                !job.charge && // care home is not charged yet
                (
                    job.assignment &&
                    job.assignment.payment &&
                    job.assignment.payment.debit_date.getTime() <= new Date().getTime() && // debit date allows to process payment
                    job.assignment.payment.status == PaymentSchema.statuses.IN_PROGRESS // payment waits for processing
                )
            )
            {
                this.getAccountBalance()
                    .then(balance => {

                        //getting available funds
                        let availableAccountFunds = 0;
                        balance.available.forEach(fundsItem => {
                            if(fundsItem.currency == "gbp")
                                availableAccountFunds += (fundsItem.amount / 100);
                        });

                        //getting pending reducers
                        const creditsReducerIndex = careHome.care_home.credits.findIndex(credit => credit.job && credit.job.toString() == job._id.toString() && credit.status == TransactionSchema.transactionStatuses.PENDING);
                        const deductionReducerIndex = carer.carer.deductions.findIndex(deduction => deduction.job && deduction.job.toString() == job._id.toString() && deduction.status == TransactionSchema.transactionStatuses.PENDING);

                        //preparing amounts
                        const { job_income, applicationFee, total_cost, job_cost, manual_booking_cost } = JobsHandler.calculateJobCost(job);
                        const reducedDeduction = Math.min(parseFloat(((job_income * job.booking_pricing.max_to_deduct) / 100).toFixed(2)), carer.carer.getDeductionsBalance());
                        const reducedCredits = Math.min(total_cost, careHome.care_home.getCreditsBalance());

                        const applicationTransactionFee = Math.max(applicationFee + manual_booking_cost + reducedDeduction - reducedCredits, 0);
                        const chargeAmount = total_cost - reducedCredits;
                        const transferAmount = job_income - reducedDeduction - chargeAmount;

                        //insufficient funds to complete charge
                        if(availableAccountFunds < transferAmount)
                        {
                            console.log("Insufficient funds")
                            return reject(job);
                        }

                        //charging
                        async.waterfall([

                            //when direct charge should be applied
                            (callback) => {
                                if(chargeAmount > 0) // don't create token for charge if charge amount is 0
                                {
                                    this.createCustomerChargeToken(customer, account)
                                        .then(token => callback(null, token))
                                        .catch(error => callback(error))
                                }
                                else
                                    callback(null, null);
                            },
                            (token, callback) => {
                                if(token)
                                {
                                    this.createDirectCharge(chargeAmount, applicationTransactionFee, token, account, job)
                                        .then(charge => callback(null, charge))
                                        .catch(error => callback(error))
                                }
                                else
                                    callback(null, null);
                            },
                            (charge, callback) => {
                                if(charge)
                                {
                                    this.getTransactionBalance(charge["balance_transaction"], account)
                                        .then(chargeTransaction => callback(null, { charge, chargeTransaction } ))
                                        .catch(error => callback(error))
                                }
                                else
                                    callback(null, { charge: null, chargeTransaction: null })
                            },

                            //when transfer should be applied
                            (chargePack, callback) => {
                                if(transferAmount > 0)
                                {
                                    this.createFundsTransferToSubaccount(transferAmount, account, job)
                                        .then(transfer => callback(null, chargePack, transfer))
                                        .catch(error => callback(error))
                                }
                                else
                                    callback(null, chargePack, null)
                            },
                            (chargePack, transfer, callback) => {
                                if(transfer)
                                {
                                    this.getTransactionBalance(transfer["balance_transaction"])
                                        .then(transferTransaction => callback(null, { chargePack, transferPack: { transfer, transferTransaction } } ))
                                        .catch(error => callback(error))
                                }
                                else
                                    callback(null, { chargePack, transferPack: { transfer: null, transferTransaction: null }})
                            },
                        ], (errors, result) => {

                            if(errors)
                            {
                                console.log(errors)
                                return reject(job);
                            }

                            //changing job status
                            job.status = JobModel.statuses.PAID;

                            //saving charge
                            job.charge = {
                                deductions: reducedCredits,
                                job_cost: job_cost,
                                manual_booking_cost: manual_booking_cost,
                                total_cost: total_cost,
                                net_cost: total_cost - reducedCredits,
                                charge_date: new Date()
                            };


                            //calculation of transaction charges
                            let transactionCosts = 0;
                            if(result.chargePack["chargeTransaction"])
                            {
                                result.chargePack["chargeTransaction"]["fee_details"].forEach(fee => {
                                    if(fee.type == "stripe_fee" && fee.currency == "gbp")
                                        transactionCosts += (fee.amount / 100)
                                });
                            }

                            if(result.transferPack.transferTransaction)
                            {
                                result.transferPack.transferTransaction["fee_details"].forEach(fee => {
                                    if(fee.type == "stripe_fee" && fee.currency == "gbp")
                                        transactionCosts += (fee.amount / 100)
                                });
                            }

                            //net income
                            let netIncome = 0;
                            netIncome += result.chargePack.chargeTransaction ? (result.chargePack.chargeTransaction["net"] / 100) : 0;
                            netIncome += result.transferPack.transferTransaction ? - (result.transferPack.transferTransaction["net"] / 100) : 0;

                            //saving payment
                            job.assignment.payment = {
                                debit_date: job.assignment.payment.debit_date,
                                deductions: reducedDeduction,
                                job_income: job_income,
                                transaction_charge: transactionCosts,
                                application_fee: applicationFee,
                                net_income: parseFloat(netIncome.toFixed(2)),
                                status: PaymentSchema.statuses.PAID,
                                payment_date: new Date()
                            }


                            //handling reducers
                            if(creditsReducerIndex != -1 && careHome.care_home.credits[creditsReducerIndex].amount == reducedCredits)
                                careHome.care_home.credits[creditsReducerIndex].status = TransactionSchema.transactionStatuses.CONFIRMED;

                            if(deductionReducerIndex != -1 && carer.carer.deductions[deductionReducerIndex].amount == reducedDeduction)
                                carer.carer.deductions[deductionReducerIndex].status = TransactionSchema.transactionStatuses.CONFIRMED;

                            return resolve({ job, carer, careHome });
                        })
                    })
                    .catch(error => console.log(error));
            }
            else
                reject();
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
