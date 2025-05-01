const {
  getDiseasesByPlantId,
  getDiseaseById,
  getAllDiseases,
  createDisease,
  updateDisease,
  deleteDisease
} = require('../../../backend/controllers/PlantManagement/diseaseController');
const Disease = require('../../../backend/models/PlantManagement/Disease');

// Mock the Disease model
jest.mock('../../../backend/models/PlantManagement/Disease');

describe('Disease Management Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        name: 'Test Disease',
        causalAgent: 'Bacteria XYZ',
        diseaseTransmission: 'Through soil and water',
        diseaseSymptoms: 'Yellowing leaves, wilting',
        control: 'Apply fungicide XYZ',
        fertilizers: ['Organic compost', 'NPK 5-5-5'],
        plantId: 'plantId123',
        imageUrl: 'http://example.com/disease.jpg'
      },
      params: {
        id: 'diseaseId123',
        plantId: 'plantId123'
      }
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getDiseasesByPlantId', () => {
    it('should return diseases for a specific plant ID', async () => {
      const mockDiseases = [
        { id: '1', name: 'Disease 1', plantId: 'plantId123' },
        { id: '2', name: 'Disease 2', plantId: 'plantId123' }
      ];
      
      Disease.find.mockResolvedValue(mockDiseases);

      await getDiseasesByPlantId(req, res);

      expect(Disease.find).toHaveBeenCalledWith({ plantId: req.params.plantId });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockDiseases);
    });

    it('should handle errors when fetching diseases by plant ID', async () => {
      const error = new Error('Database error');
      Disease.find.mockRejectedValue(error);

      await getDiseasesByPlantId(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('getDiseaseById', () => {
    it('should return a disease by ID', async () => {
      const mockDisease = { 
        id: req.params.id, 
        name: 'Test Disease' 
      };
      
      Disease.findById.mockResolvedValue(mockDisease);

      await getDiseaseById(req, res);

      expect(Disease.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockDisease);
    });

    it('should return 404 if disease is not found', async () => {
      Disease.findById.mockResolvedValue(null);

      await getDiseaseById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Disease not found' });
    });

    it('should handle errors when fetching a disease by ID', async () => {
      const error = new Error('Database error');
      Disease.findById.mockRejectedValue(error);

      await getDiseaseById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('getAllDiseases', () => {
    it('should return all diseases', async () => {
      const mockDiseases = [
        { id: '1', name: 'Disease 1' },
        { id: '2', name: 'Disease 2' }
      ];
      
      Disease.find.mockResolvedValue(mockDiseases);

      await getAllDiseases(req, res);

      expect(Disease.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockDiseases);
    });

    it('should handle errors when fetching all diseases', async () => {
      const error = new Error('Database error');
      Disease.find.mockRejectedValue(error);

      await getAllDiseases(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('createDisease', () => {
    it('should create a new disease and return it', async () => {
      const mockSavedDisease = {
        ...req.body,
        _id: 'newDiseaseId123'
      };
      
      Disease.prototype.save.mockResolvedValue(mockSavedDisease);

      await createDisease(req, res);

      expect(Disease.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockSavedDisease);
    });

    it('should handle validation errors when creating a disease', async () => {
      const error = new Error('Validation error');
      Disease.prototype.save.mockRejectedValue(error);

      await createDisease(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('updateDisease', () => {
    it('should update a disease and return it', async () => {
      const existingDisease = {
        _id: req.params.id,
        name: 'Old Disease Name',
        causalAgent: 'Old Agent',
        save: jest.fn().mockResolvedValue({
          _id: req.params.id,
          name: req.body.name,
          causalAgent: req.body.causalAgent
        })
      };
      
      Disease.findById.mockResolvedValue(existingDisease);

      await updateDisease(req, res);

      expect(Disease.findById).toHaveBeenCalledWith(req.params.id);
      expect(existingDisease.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        _id: req.params.id,
        name: req.body.name
      }));
    });

    it('should return 404 if disease to update is not found', async () => {
      Disease.findById.mockResolvedValue(null);

      await updateDisease(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Disease not found' });
    });

    it('should handle validation errors when updating a disease', async () => {
      const existingDisease = {
        _id: req.params.id,
        name: 'Old Disease Name',
        save: jest.fn().mockRejectedValue(new Error('Validation error'))
      };
      
      Disease.findById.mockResolvedValue(existingDisease);

      await updateDisease(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Validation error' });
    });
  });

  describe('deleteDisease', () => {
    it('should delete a disease and return success message', async () => {
      Disease.findByIdAndDelete.mockResolvedValue({ _id: req.params.id });

      await deleteDisease(req, res);

      expect(Disease.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Disease Deleted' });
    });

    it('should return 404 if disease to delete is not found', async () => {
      Disease.findByIdAndDelete.mockResolvedValue(null);

      await deleteDisease(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Disease not found' });
    });

    it('should handle errors when deleting a disease', async () => {
      const error = new Error('Database error');
      Disease.findByIdAndDelete.mockRejectedValue(error);

      await deleteDisease(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
});