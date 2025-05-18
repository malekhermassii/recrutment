module.exports = (app) => {
    const promotions = require('../controllers/promotion.controller.js');


    app.post('/promotions', promotions.create);

    
    app.get('/promotions', promotions.findAll);

   
    app.get('/promotions/:promotionId', promotions.findOne);

    
    app.put('/promotions/:promotionId', promotions.update);

    
    app.delete('/promotions/:promotionId', promotions.delete);
}
