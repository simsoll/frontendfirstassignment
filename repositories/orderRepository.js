'use strict';

module.exports = (function() {
    var orders = [
        {
            id: 1,
            creator: 'Simon',
            timestamp: new Date(),
            status: 'submitted',
            products: [
                {
                    amount: 3,
                    product: {
                        filtered: true,
                        description: 'Product description 1'
                    }
                },
                {
                    amount: 2,
                    product: {
                        filtered: true,
                        description: 'Product description 4'
                    }
                },
                {
                    amount: 6,
                    product: {
                        filtered: true,
                        description: 'Product description 5'
                    }
                }]
        },
        {
            id: 2,
            creator: 'John',
            timestamp: new Date(),
            status: 'approved',
            products: [
                {
                    amount: 1,
                    product: {
                        filtered: true,
                        description: 'Product description 1'
                    }
                },
                {
                    amount: 4,
                    product: {
                        filtered: true,
                        description: 'Product description 3'
                    }
                },
                {
                    amount: 2,
                    product: {
                        filtered: true,
                        description: 'Product description 9'
                    }
                }]
        }];

    return {
        addToPending: addToPending,
        getAll: getAll,
        getByStatus: getByStatus,
        removeFromPending: removeFromPending
    };

    function addToPending(product) {
        var order = getByStatus('pending')[0];
        var isNewOrder = !order;
        
        if (isNewOrder) {
            order = {
                id: generateId(),
                products: [],
                status: 'pending'
            };
        }
        
        order.products.push(product);
        
        if (isNewOrder) {
            orders.push(order);
        }
    }
    
    function removeFromPending(product) {
        var order = getByStatus('pending')[0];
        
        if (!order) {
            return;
        }
        
        var products = order.products;
        
        var index = products.map(function(item) {
            return item.id;
        }).indexOf(product.id);

        if (index > -1) {
            products.splice(index, 1);
        }
    }

    function getAll() {
        return orders;
    }

    function getByStatus(status) {
        return orders.filter(function(order) {
            return order.status === status;
        });
    }
    
    function generateId() {
        if (orders.length === 0) {
            return 1;
        }
        var maxId = orders[0].id;
        
        for (var i = 1; i < orders.length; i++) {
            if (maxId < orders[i].id) {
                maxId = orders[i].id;
            }
        }
        
        return maxId + 1;
    }
})();