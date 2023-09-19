const {
  authenticateToken,
  } = require('./user');
  const fs = require('fs');


  describe('authenticateToken', () => {
    it('return 401 if token does not exist', () => {
      const next = jest.fn();
      const req = { body: { name: 'existing-task' }, user: { username: "Erik" }, headers: { authorization: null } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn(), sendStatus: jest.fn().mockReturnThis() };
    
      // Llama a la función
      authenticateToken(req, res, next);
      expect(res.sendStatus).toHaveBeenCalledWith(401); // Verifica el código de estado usando res.sendStatus
    });
    it('return 403 if token is not valid', () => {
      const next = jest.fn();
      const req = { body: { name: 'existing-task' }, user: { username: "Erik" }, headers: { authorization: "no valido" } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn(), sendStatus: jest.fn().mockReturnThis() };
    
      // Llama a la función
      authenticateToken(req, res, next);
      expect(res.sendStatus).toHaveBeenCalledWith(403); // Verifica el código de estado usando res.sendStatus
    });
});