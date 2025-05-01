const {
  addPlant,
  getAllPlants,
  getOnePlant,
  deletePlant,
  updatePlant
} = require('../../../backend/controllers/PlantManagement/PlantCtrl');
const Plant = require('../../../backend/models/PlantManagement/plant');

// Mock the Plant model
jest.mock('../../../backend/models/PlantManagement/plant');

// Skip the API tests and just keep the controller tests
// This is because API tests require a running server, which might not be available in CI/CD environments
describe('Plant Management Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        imageUrl: 'http://example.com/plant.jpg',
        name: 'Test Plant',
        category: 'Vegetable',
        description: 'A test plant description',
        climate: 'Tropical',
        soilPh: '6.0-7.0',
        landPreparation: 'Prepare the soil with organic matter',
        fertilizers: 'NPK 15-15-15'
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addPlant', () => {
    it('should add a new plant and return success message', async () => {
      // Mock that plant doesn't exist yet
      Plant.findOne.mockResolvedValue(null);
      Plant.create.mockResolvedValue(req.body);

      await addPlant(req, res);

      expect(Plant.findOne).toHaveBeenCalledWith({ name: req.body.name });
      expect(Plant.create).toHaveBeenCalledWith({
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        climate: req.body.climate,
        soilPh: req.body.soilPh,
        landPreparation: req.body.landPreparation,
        fertilizers: req.body.fertilizers
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith('New Plant Added');
    });

    it('should return error if plant already exists', async () => {
      // Mock that plant already exists
      Plant.findOne.mockResolvedValue({ name: req.body.name });

      await addPlant(req, res);

      expect(Plant.findOne).toHaveBeenCalledWith({ name: req.body.name });
      expect(Plant.create).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Plant already exists' });
    });

    it('should handle errors when adding a plant', async () => {
      const error = new Error('Database error');
      Plant.findOne.mockRejectedValue(error);

      await addPlant(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('getAllPlants', () => {
    it('should return all plants sorted by name', async () => {
      const mockPlants = [
        { id: '1', name: 'Apple' },
        { id: '2', name: 'Banana' }
      ];
      
      Plant.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockPlants)
      });

      await getAllPlants(req, res);

      expect(Plant.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockPlants);
    });

    it('should handle errors when fetching all plants', async () => {
      const error = new Error('Database error');
      
      Plant.find.mockReturnValue({
        sort: jest.fn().mockRejectedValue(error)
      });

      await getAllPlants(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('getOnePlant', () => {
    it('should return a specific plant by id', async () => {
      const mockPlant = { 
        id: req.params.id, 
        name: 'Test Plant' 
      };
      
      Plant.findById.mockResolvedValue(mockPlant);

      await getOnePlant(req, res);

      expect(Plant.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPlant);
    });

    it('should handle errors when fetching a plant', async () => {
      const error = new Error('Plant not found');
      Plant.findById.mockRejectedValue(error);

      await getOnePlant(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('updatePlant', () => {
    it('should update a plant and return success message', async () => {
      Plant.findByIdAndUpdate.mockResolvedValue(req.body);

      await updatePlant(req, res);

      expect(Plant.findByIdAndUpdate).toHaveBeenCalledWith(
        req.params.id,
        {
          imageUrl: req.body.imageUrl,
          name: req.body.name,
          category: req.body.category,
          description: req.body.description,
          climate: req.body.climate,
          soilPh: req.body.soilPh,
          landPreparation: req.body.landPreparation,
          fertilizers: req.body.fertilizers
        },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Plant Updated' });
    });

    it('should handle errors when updating a plant', async () => {
      const error = new Error('Update error');
      Plant.findByIdAndUpdate.mockRejectedValue(error);

      await updatePlant(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('deletePlant', () => {
    it('should delete a plant and return success message', async () => {
      Plant.findByIdAndDelete.mockResolvedValue({});

      await deletePlant(req, res);

      expect(Plant.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Plant Deleted' });
    });

    it('should handle errors when deleting a plant', async () => {
      const error = new Error('Delete error');
      Plant.findByIdAndDelete.mockRejectedValue(error);

      await deletePlant(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
});