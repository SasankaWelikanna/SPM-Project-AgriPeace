const { calculateCost, previousCalculations } = require('../../../backend/controllers/CostCalculator/CostCalculatorController');
const CostCalculator = require('../../../backend/models/CostCalculator/costCalculator');

// Mock the CostCalculator model
jest.mock('../../../backend/models/CostCalculator/costCalculator');

describe('Cost Calculator Controller', () => {
  let req, res;
  let mockCalculation;

  beforeEach(() => {
    mockCalculation = {
      crop: 'Tomato',
      area: 2.5,
      waterResources: 'Moderate',
      soilType: 'Moderately Fertile',
      estimatedCost: 181500,
      fertilizerNeeds: 'High Potassium and Nitrogen; 180kg NPK per acre, 50kg Potassium',
      waterNeeds: '3.00 acre-feet per season',
      userId: 'user123'
    };

    req = {
      body: {
        crop: 'Tomato',
        area: 2.5,
        waterResources: 'Moderate',
        soilType: 'Moderately Fertile',
        userId: 'user123'
      },
      query: {
        userId: 'user123'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Clear all mock implementations
    jest.clearAllMocks();

    // Mock the CostCalculator constructor and its save method
    CostCalculator.prototype.save = jest.fn().mockResolvedValue(mockCalculation);
    
    // Mock the static methods
    CostCalculator.find = jest.fn();
  });

  describe('calculateCost', () => {
    it('should calculate cost and save calculation to database', async () => {
      // Override this specific save implementation for this test
      CostCalculator.prototype.save.mockImplementation(function() {
        return Promise.resolve({...this});
      });

      await calculateCost(req, res);

      // Check if the save method was called
      expect(CostCalculator.prototype.save).toHaveBeenCalled();
      
      // Check the response
      expect(res.status).toHaveBeenCalledWith(200);
      // We can't predict the exact object, so just verify the function was called
      expect(res.json).toHaveBeenCalled();
    });

    it('should handle missing required fields', async () => {
      // Remove required field
      req.body.crop = undefined;

      await calculateCost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error calculating cost. Please try again.'
      });
    });

    it('should handle database errors during calculation saving', async () => {
      // Mock a database error
      CostCalculator.prototype.save.mockRejectedValue(new Error('Database connection error'));

      await calculateCost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error calculating cost. Please try again.'
      });
    });
  });

  describe('previousCalculations', () => {
    it('should fetch previous calculations for a user', async () => {
      const mockCalculations = [
        { crop: 'Tomato', area: 2.5, estimatedCost: 181500 },
        { crop: 'Carrot', area: 1.5, estimatedCost: 74250 }
      ];
      
      CostCalculator.find.mockResolvedValue(mockCalculations);

      await previousCalculations(req, res);

      expect(CostCalculator.find).toHaveBeenCalledWith({ userId: req.query.userId });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCalculations);
    });

    it('should handle missing userId', async () => {
      // Remove userId from query
      req.query = {};

      await previousCalculations(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User ID is required'
      });
    });

    it('should handle database errors when fetching calculations', async () => {
      const error = new Error('Database error');
      CostCalculator.find.mockRejectedValue(error);

      await previousCalculations(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Error fetching calculations. Please try again.'
      });
    });
  });
});