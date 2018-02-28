exports.up = function(next) {
     this.model("User").schema.find().then(users => {
        users.forEach(user => {
            if(user.carer)
            {
                user.carer.set({
                    transactions: [],
                    payment_system: {
                        account_id: null,
                        bank_number: null,
                    }
                })
            }
            else if(user.care_home)
            {
                user.care_home.set({
                    transactions: [],
                    payment_system: {
                        customer_id: null,
                        card_number: null,
                    }
                })
            }

            user.save().catch(error => console.log(error));
        });
     });

     next();
};

exports.down = function(next) {
  next();
};