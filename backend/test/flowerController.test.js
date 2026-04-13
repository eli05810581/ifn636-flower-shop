const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

const Flower = require('../models/Flower');
const {
  getFlowers,
  addFlower,
  updateFlower,
  deleteFlower,
} = require('../controllers/flowerController');

describe('Flower Controller Tests', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };

    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getFlowers', () => {
    it('should return all flowers successfully', async () => {
      const mockFlowers = [
        { _id: '1', name: 'Rose', description: 'Red rose', price: 10, category: 'Romantic' },
        { _id: '2', name: 'Tulip', description: 'Yellow tulip', price: 8, category: 'Spring' },
      ];

      const sortStub = sinon.stub().resolves(mockFlowers);
      sinon.stub(Flower, 'find').returns({ sort: sortStub });

      await getFlowers(req, res);

      expect(Flower.find.calledOnce).to.be.true;
      expect(sortStub.calledOnceWith({ createdAt: -1 })).to.be.true;
      expect(res.json.calledOnceWith(mockFlowers)).to.be.true;
    });

    it('should return 500 if fetching flowers fails', async () => {
      const sortStub = sinon.stub().rejects(new Error('Database error'));
      sinon.stub(Flower, 'find').returns({ sort: sortStub });

      await getFlowers(req, res);

      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnceWith({ message: 'Failed to fetch flowers' })).to.be.true;
    });
  });

  describe('addFlower', () => {
    it('should create a new flower successfully', async () => {
      req.body = {
        name: 'Lily',
        description: 'White lily',
        price: 15,
        category: 'Elegant',
      };

      const savedFlower = {
        _id: '3',
        name: 'Lily',
        description: 'White lily',
        price: 15,
        category: 'Elegant',
      };

      sinon.stub(Flower.prototype, 'save').resolves(savedFlower);

      await addFlower(req, res);

      expect(res.status.calledOnceWith(201)).to.be.true;
      expect(res.json.calledOnceWith(savedFlower)).to.be.true;
    });

    it('should return 500 if creating flower fails', async () => {
      req.body = {
        name: 'Lily',
        description: 'White lily',
        price: 15,
        category: 'Elegant',
      };

      sinon.stub(Flower.prototype, 'save').rejects(new Error('Save failed'));

      await addFlower(req, res);

      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnceWith({ message: 'Failed to create flower' })).to.be.true;
    });
  });

  describe('updateFlower', () => {
    it('should update a flower successfully', async () => {
      req.params.id = '123';
      req.body = {
        name: 'Updated Rose',
        description: 'Fresh red rose',
        price: 20,
        category: 'Luxury',
      };

      const updatedFlower = {
        _id: '123',
        name: 'Updated Rose',
        description: 'Fresh red rose',
        price: 20,
        category: 'Luxury',
      };

      sinon.stub(Flower, 'findByIdAndUpdate').resolves(updatedFlower);

      await updateFlower(req, res);

      expect(
        Flower.findByIdAndUpdate.calledOnceWith(
          '123',
          {
            name: 'Updated Rose',
            description: 'Fresh red rose',
            price: 20,
            category: 'Luxury',
          },
          { new: true }
        )
      ).to.be.true;

      expect(res.json.calledOnceWith(updatedFlower)).to.be.true;
    });

    it('should return 500 if updating flower fails', async () => {
      req.params.id = '123';
      req.body = {
        name: 'Updated Rose',
        description: 'Fresh red rose',
        price: 20,
        category: 'Luxury',
      };

      sinon.stub(Flower, 'findByIdAndUpdate').rejects(new Error('Update failed'));

      await updateFlower(req, res);

      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnceWith({ message: 'Failed to update flower' })).to.be.true;
    });
  });

  describe('deleteFlower', () => {
    it('should delete a flower successfully', async () => {
      req.params.id = '123';

      sinon.stub(Flower, 'findByIdAndDelete').resolves();

      await deleteFlower(req, res);

      expect(Flower.findByIdAndDelete.calledOnceWith('123')).to.be.true;
      expect(res.json.calledOnceWith({ message: 'Flower deleted successfully' })).to.be.true;
    });

    it('should return 500 if deleting flower fails', async () => {
      req.params.id = '123';

      sinon.stub(Flower, 'findByIdAndDelete').rejects(new Error('Delete failed'));

      await deleteFlower(req, res);

      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnceWith({ message: 'Failed to delete flower' })).to.be.true;
    });
  });
});