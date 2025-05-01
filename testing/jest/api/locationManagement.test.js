const mongoose = require('mongoose');
const { 
  addLocation,
  getAllLocations,
  getOneLocation,
  updateLocation,
  deleteLocation
} = require('../../../backend/controllers/LocationManagement/locationCtrl');
const Location = require('../../../backend/models/LocationManagement/location');

// Mock the Location model
jest.mock('../../../backend/models/LocationManagement/location');

describe('Location Management Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        province: 'Western',
        district: 'Colombo',
        city: 'Nugegoda',
        latitude: 6.8649,
        longitude: 79.8997,
        areaSize: '5 acres',
        soilType: 'Clay',
        irrigationType: 'Drip'
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

  describe('addLocation', () => {
    it('should add a new location and return success message', async () => {
      Location.create.mockResolvedValue(req.body);

      await addLocation(req, res);

      expect(Location.create).toHaveBeenCalledWith({
        province: req.body.province,
        district: req.body.district,
        city: req.body.city,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        areaSize: req.body.areaSize,
        soilType: req.body.soilType,
        irrigationType: req.body.irrigationType
      });
      expect(res.json).toHaveBeenCalledWith('New Location Added');
    });

    it('should handle errors when adding a location', async () => {
      const error = new Error('Database error');
      Location.create.mockRejectedValue(error);

      await addLocation(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('getAllLocations', () => {
    it('should return all locations', async () => {
      const mockLocations = [
        { id: '1', city: 'Colombo' },
        { id: '2', city: 'Kandy' }
      ];
      
      Location.find.mockResolvedValue(mockLocations);

      await getAllLocations(req, res);

      expect(Location.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockLocations);
    });

    it('should handle errors when fetching all locations', async () => {
      const error = new Error('Database error');
      Location.find.mockRejectedValue(error);

      await getAllLocations(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('getOneLocation', () => {
    it('should return a specific location by id', async () => {
      const mockLocation = { 
        id: req.params.id, 
        city: 'Colombo' 
      };
      
      Location.findById.mockResolvedValue(mockLocation);

      await getOneLocation(req, res);

      expect(Location.findById).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockLocation);
    });

    it('should handle errors when fetching a location', async () => {
      const error = new Error('Location not found');
      Location.findById.mockRejectedValue(error);

      await getOneLocation(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('updateLocation', () => {
    it('should update a location and return success message', async () => {
      Location.findByIdAndUpdate.mockResolvedValue(req.body);

      await updateLocation(req, res);

      expect(Location.findByIdAndUpdate).toHaveBeenCalledWith(
        req.params.id,
        {
          province: req.body.province,
          district: req.body.district,
          city: req.body.city,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          areaSize: req.body.areaSize,
          soilType: req.body.soilType,
          irrigationType: req.body.irrigationType
        },
        { new: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Location Updated' });
    });

    it('should handle errors when updating a location', async () => {
      const error = new Error('Update error');
      Location.findByIdAndUpdate.mockRejectedValue(error);

      await updateLocation(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });

  describe('deleteLocation', () => {
    it('should delete a location and return success message', async () => {
      Location.findByIdAndDelete.mockResolvedValue({});

      await deleteLocation(req, res);

      expect(Location.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Location Deleted' });
    });

    it('should handle errors when deleting a location', async () => {
      const error = new Error('Delete error');
      Location.findByIdAndDelete.mockRejectedValue(error);

      await deleteLocation(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
});