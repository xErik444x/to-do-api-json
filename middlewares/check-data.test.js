const {
    checkIfJsonExists,
    checkIfTaskNameExists,
    checkBodyPost,
  } = require('./check-data');
  const fs = require('fs');


  describe('checkIfJsonExists', () => {
    it('should call next() if tasks.json exists', () => {
      // Mock de fs.existsSync para que devuelva true
      const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      const next = jest.fn();
  
      // Llama a la función
      checkIfJsonExists({}, {}, next);
  
      // Verifica que next() haya sido llamado
      expect(next).toHaveBeenCalled();
  
      // Restaura el mock
      existsSyncMock.mockRestore();
    });
  
    it('should create tasks.json and call next() if it does not exist', () => {
      // Mock de fs.existsSync para que devuelva false
      const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
      const writeFileMock = jest.spyOn(fs, 'writeFile').mockImplementation((path, data, callback) => {
        callback(null);
      });
      const next = jest.fn();
  
      // Llama a la función
      checkIfJsonExists({}, {}, next);
  
      // Verifica que fs.writeFile haya sido llamado
      expect(writeFileMock).toHaveBeenCalled();
  
      // Verifica que next() haya sido llamado
      expect(next).toHaveBeenCalled();
  
      // Restaura los mocks
      existsSyncMock.mockRestore();
      writeFileMock.mockRestore();
    });
  });
  
  describe('checkIfTaskNameExists', () => {
    it('should call next() if task name does not exist', () => {
      const readFileMock = jest.spyOn(fs, 'readFile').mockImplementation((path, callback) => {
        // Simula un archivo con tareas vacías
        callback(null, '[]');
      });
      const next = jest.fn();
      const req = { body: { name: 'new-task-v3'}, user:{username:"Erik"} };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  
      // Llama a la función
      checkIfTaskNameExists(req, res, next);
  
      // Verifica que next() haya sido llamado
      expect(next).toHaveBeenCalled();
  
      // Restaura el mock
      readFileMock.mockRestore();
    });
  
    it('should return a 400 status if task name already exists', () => {
      const readFileMock = jest.spyOn(fs, 'readFile').mockImplementation((path, callback) => {
        // Simula un archivo con una tarea existente
        const tasks = [{ name: 'existing-task', user:"Erik" }];
        callback(null, JSON.stringify(tasks));
      });
      const next = jest.fn();
      const req = { body: { name: 'existing-task' }, user:{username:"Erik"} };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
  
      // Llama a la función
      checkIfTaskNameExists(req, res, next);
  
      // Verifica que res.status y res.send hayan sido llamados con el valor esperado
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: 'Duplicate task name' });
  
      // No debe llamar a next()
      expect(next).not.toHaveBeenCalled();
  
      // Restaura el mock
      readFileMock.mockRestore();
    });
  });
  
  describe('checkBodyPost', () => {
    it('should call next() if req.body is valid', () => {
      const req = { body: { name: 'task', description: 'description' } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
  
      // Llama a la función
      checkBodyPost(req, res, next);
  
      // Verifica que next() haya sido llamado
      expect(next).toHaveBeenCalled();
    });
  
    it('should return a 401 status if req.body is invalid', () => {
      const req = { body: {} }; // req.body está vacío
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
  
      // Llama a la función
      checkBodyPost(req, res, next);
  
      // Verifica que res.status y res.send hayan sido llamados con el valor esperado
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({ message: 'invalid body' });
  
      // No debe llamar a next()
      expect(next).not.toHaveBeenCalled();
    });

    it('should return a 401 status if fs.readFile encounters an error', () => {
        const readFileMock = jest.spyOn(fs, 'readFile').mockImplementation((path, callback) => {
          // Simula un error al leer el archivo
          callback(new Error('File read error'), null);
        });
        const req = { body: { name: 'task' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();
      
        // Llama a la función
        checkIfTaskNameExists(req, res, next);
      
        // Verifica que res.status y res.send hayan sido llamados con el valor esperado
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'No tasks found' });
      
        // No debe llamar a next()
        expect(next).not.toHaveBeenCalled();
      
        // Restaura el mock
        readFileMock.mockRestore();
    });
       it('should return a 401 status if fs.readFile encounters an error', () => {
        const readFileMock = jest.spyOn(fs, 'readFile').mockImplementation((path, callback) => {
          // Simula un error al leer el archivo
          callback(new Error('File read error'), null);
        });
        const req = { body: { name: 'task' } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
        const next = jest.fn();
      
        // Llama a la función
        checkIfTaskNameExists(req, res, next);
      
        // Verifica que res.status y res.send hayan sido llamados con el valor esperado
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith({ message: 'No tasks found' });
      
        // No debe llamar a next()
        expect(next).not.toHaveBeenCalled();
      
        // Restaura el mock
        readFileMock.mockRestore();
    });

  });
  describe('checkIfJsonExists', () => {
    it('should create tasks.json and call next() if it does not exist', () => {
      // Mock de fs.existsSync para que devuelva false
      const existsSyncMock = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
      const writeFileMock = jest.spyOn(fs, 'writeFile').mockImplementation((path, data, callback) => {
        callback(null);
      });
      const next = jest.fn();
  
      // Llama a la función
      checkIfJsonExists({}, {}, next);
  
      // Verifica que fs.writeFile haya sido llamado
      expect(writeFileMock).toHaveBeenCalledWith(
        expect.any(String), // Comprueba que se llama con una ruta
        "[]", // Comprueba que se intenta escribir un JSON vacío
        expect.any(Function) // Comprueba que se proporciona una función de devolución de llamada
      );
  
      // Verifica que next() haya sido llamado
      expect(next).toHaveBeenCalled();
  
      // Restaura los mocks
      existsSyncMock.mockRestore();
      writeFileMock.mockRestore();
    });
});