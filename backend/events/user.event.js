const eventEmitter = require('./emitter.event');

eventEmitter.on('userRegistered', (user) => {
    console.log(`User registered: ${user.name}`);
});

module.exports.triggerUserRegistered = (user) => {
    eventEmitter.emit('userRegistered', user);
};

