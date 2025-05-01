const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Mock the entire Fertilizer module
jest.mock('../../../backend/models/FertilizerManagement/Fertilizer', () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
  };
});

const fertilizerModel = require('../../../backend/models/FertilizerManagement/Fertilizer');
const fertilizers = require('../../../backend/controllers/FertilizerManagement/FertilizerCtrl');

describe('Fertilizer Management Controller', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    
    req = {
      body: {
        imageUrl: 'http://example.com/fertilizer.jpg',
        productName: 'Test Fertilizer',
        category: 'Organic',
        description: 'Test description',
        quantity: 100,
        price: 25.99
      },
      params: {
        id: 'mockId123'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('addFertilizer', () => {
    it('should add a new fertilizer and return success message', async () => {
      fertilizerModel.create.mockResolvedValue(req.body);

      await fertilizers.addFertilizer(req, res);

      expect(fertilizerModel.create).toHaveBeenCalledWith({
        imageUrl: req.body.imageUrl,
        productName: req.body.productName,
        category: req.body.category,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price
      });
      expect(res.json).toHaveBeenCalledWith('New Fertilizer Added');
    });

    it('should handle errors when adding a fertilizer', async () => {
      const error = new Error('Database error');
      fertilizerModel.create.mockRejectedValue(error);

      await fertilizers.addFertilizer(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('getAllFertilizers', () => {
    it('should return all fertilizers', async () => {
      const mockFertilizers = [
        { id: '1', productName: 'Fertilizer 1' },
        { id: '2', productName: 'Fertilizer 2' }
      ];
      
      fertilizerModel.find.mockResolvedValue(mockFertilizers);

      await fertilizers.getAllFertilizers(req, res);

      expect(fertilizerModel.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockFertilizers);
    });

    it('should handle errors when fetching all fertilizers', async () => {
      const error = new Error('Database error');
      fertilizerModel.find.mockRejectedValue(error);

      await fertilizers.getAllFertilizers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('getOneFertilizer', () => {
    test('should return a specific fertilizer by id', async () => {
      const mockFertilizer = { 
        _id: req.params.id, 
        productName: 'Test Fertilizer' 
      };
      
      // We need to modify how we mock this to handle variable shadowing in the controller
      fertilizerModel.findById.mockImplementation(() => Promise.resolve(mockFertilizer));

      await fertilizers.getOneFertilizer(req, res);

      expect(fertilizerModel.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockFertilizer);
    });

    test('should handle errors when fetching a fertilizer', async () => {
      const error = new Error('Fertilizer not found');
      
      fertilizerModel.findById.mockImplementation(() => Promise.reject(error));

      await fertilizers.getOneFertilizer(req, res);

      expect(fertilizerModel.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('updateFertilizer', () => {
    it('should update a fertilizer and return success message', async () => {
      fertilizerModel.findByIdAndUpdate.mockResolvedValue(req.body);

      await fertilizers.updateFertilizer(req, res);

      expect(fertilizerModel.findByIdAndUpdate).toHaveBeenCalledWith(
        req.params.id,
        {
          imageUrl: req.body.imageUrl,
          productName: req.body.productName,
          category: req.body.category,
          description: req.body.description,
          quantity: req.body.quantity,
          price: req.body.price,
        },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Fertilizer Updated' });
    });

    it('should handle errors when updating a fertilizer', async () => {
      const error = new Error('Update error');
      fertilizerModel.findByIdAndUpdate.mockRejectedValue(error);

      await fertilizers.updateFertilizer(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('deleteFertilizer', () => {
    it('should delete a fertilizer and return success message', async () => {
      fertilizerModel.findByIdAndDelete.mockResolvedValue({});

      await fertilizers.deleteFertilizer(req, res);

      expect(fertilizerModel.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Fertilizer Deleted' });
    });

    it('should handle errors when deleting a fertilizer', async () => {
      const error = new Error('Delete error');
      fertilizerModel.findByIdAndDelete.mockRejectedValue(error);

      await fertilizers.deleteFertilizer(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
});