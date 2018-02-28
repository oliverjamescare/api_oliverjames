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
}
