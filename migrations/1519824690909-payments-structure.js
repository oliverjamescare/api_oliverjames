exports.up = async function(next) {
    await this.model("User").schema.update(
        {
            carer: { exists: true }
        },
        {
            $unset: { transactions: undefined },
            $set: {
                'carer.transactions': [],
                'carer.payment_system.account_id': null,
                'carer.payment_system.bank_number': null
            },
        },
        {
            multi: true,
            strict: false
        });

    await this.model("User").schema.update(
        {
            care_home: { exists: true }
        },
        {
            $unset: { transactions: undefined },
            $set: {
                'care_home.transactions': [],
                'care_home.payment_system.customer_id': null,
                'care_home.payment_system.card_number': null
            },
        },
        {
            multi: true,
            strict: false
        });

    next();
};

exports.down = function(next) {
  next();
};