import React, { useState } from 'react';
import axios from 'axios';
import Scroll from '../../hooks/useScroll';

const CostCalculator = () => {
  const [crop, setCrop] = useState('');
  const [area, setArea] = useState(0);
  const [waterResources, setWaterResources] = useState('');
  const [soilType, setSoilType] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('http://localhost:3000/api/costCalculator/calculate', {
        crop,
        area,
        waterResources,
        soilType
      });
      setResult(response.data);
    } catch (error) {
      setError('Error calculating cost. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-20 items-center text-center'>
      <Scroll/>
      <h1 className='text-4xl font-bold'>Cost Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div className='mt-4'>
          <label>Crop:</label>
          <input type="text" className='bg-slate-200 rounded-md' value={crop} onChange={(e) => setCrop(e.target.value)} required />
        </div>
        <div className='mt-4'>
          <label>Area (in acres):</label>
          <input type="number" className='bg-slate-200 rounded-md' value={area} onChange={(e) => setArea(e.target.value)} required />
        </div>
        <div className='mt-4'>
          <label>Water Resources:</label>
          <input type="text" className='bg-slate-200 rounded-md' value={waterResources} onChange={(e) => setWaterResources(e.target.value)} required />
        </div>
        <div className='mt-4'>
          <label>Soil Type:</label>
          <input type="text" className='bg-slate-200 rounded-md' value={soilType} onChange={(e) => setSoilType(e.target.value)} required />
        </div>
        <button className='mt-6 bg-secondary rounded-md text-white p-5' type="submit" disabled={loading}>Calculate</button>
      </form>

      {loading && <p>Calculating...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div>
          <h2>Estimated Cost</h2>
          <p>Crop: {result.crop}</p>
          <p>Area: {result.area} acres</p>
          <p>Estimated Cost: {result.estimatedCost} USD</p>
          <p>Fertilizer Needs: {result.fertilizerNeeds}</p>
          <p>Water Needs: {result.waterNeeds}</p>
        </div>
      )}
    </div>
  );
};

export default CostCalculator;
