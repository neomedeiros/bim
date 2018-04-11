var chai = require('chai');
var sinon = require('sinon');
var chaiAsPromised = require('chai-as-promised');

var DiffService = require('../services/diffService');
var DiffModel = require('../domain/diffModel');

chai.use(chaiAsPromised);

var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

describe('Tests for diffService', function () {

    var diffService;

    before(function () {
        this.diffService = new DiffService();
    });

    describe('Tests for storeValue', function () {
        it('should throw error when code is undefined', function () {

            var diffModelSaveStub = sinon.stub(DiffModel, "findOneAndUpdate");

            expect(this.diffService.storeValue(undefined, 'left', 'battery')).to.be.eventually.rejected;

            diffModelSaveStub.restore();
        });

        it('should throw error when code is empty', function () {

            var diffModelSaveStub = sinon.stub(DiffModel, "findOneAndUpdate");

            expect(this.diffService.storeValue('', 'center', 'battery')).to.be.eventually.rejected;

            diffModelSaveStub.restore();
        });

        it('should throw error when side is undefined', function () {

            var diffModelSaveStub = sinon.stub(DiffModel, "findOneAndUpdate");

            expect(this.diffService.storeValue('abc123', undefined, 'battery')).to.be.eventually.rejected;

            diffModelSaveStub.restore();
        });

        it('should throw error when side is invalid', function () {

            var diffModelSaveStub = sinon.stub(DiffModel, "findOneAndUpdate");

            expect(this.diffService.storeValue('abc123', 'center', 'battery')).to.be.eventually.rejected;

            diffModelSaveStub.restore();
        });

        it('should throw error when value is undefined', function () {

            var diffModelSaveStub = sinon.stub(DiffModel, "findOneAndUpdate");

            expect(this.diffService.storeValue('abc123', 'left', undefined)).to.be.eventually.rejected;

            diffModelSaveStub.restore();
        });

        it('should throw error when value is empty', function () {

            var diffModelSaveStub = sinon.stub(DiffModel, "findOneAndUpdate");

            expect(this.diffService.storeValue('abc123', 'right', '')).to.be.eventually.rejected;

            diffModelSaveStub.restore();
        });

        it('should save value', function () {

            var diffModelSaveStub = sinon.stub(DiffModel, "findOneAndUpdate");

            this.diffService.storeValue('abc123', 'left', 'battery').then((obj) => {
                diffModelSaveStub.calledOnce.should.be.equals(true);

                diffModelSaveStub.restore();
            });
        });

    });


    describe('Tests for compare', function () {
        it('should throw error when code is undefined', function () {

            expect(this.diffService.compare(undefined)).to.eventually
                .be.rejectedWith("Invalid code")
                .and.be.an.instanceOf(Error)
        });

        it('should return insuficient data when code does not exists', function () {

            var findOneStub = sinon.stub(DiffModel, "findOne").resolves(null);

            var result = this.diffService.compare('abc123');

            var message = result.then(
                (diffData) => {
                    findOneStub.calledOnce.should.be.equals(true);
                    diffData.message.should.be.equals('empty_data');
                });

            findOneStub.restore();

        });

        it('should return insuficient data when left is not filled', function () {

            var findOneStub = sinon.stub(DiffModel, "findOne").resolves({
                code: 'abc123',
                left: null,
                right: 'batteries'
            });

            var result = this.diffService.compare('abc123');

            var message = result.then(
                (diffData) => {
                    findOneStub.calledOnce.should.be.equals(true);
                    diffData.message.should.be.equals('insuficient_data_left');
                });

            findOneStub.restore();

        });

        it('should return insuficient data when right is not filled', function () {

            var findOneStub = sinon.stub(DiffModel, "findOne").resolves({
                code: 'abc123',
                left: 'battery',
                right: null
            });

            var result = this.diffService.compare('abc123');

            var message = result.then(
                (diffData) => {
                    findOneStub.calledOnce.should.be.equals(true);
                    diffData.message.should.be.equals('insuficient_data_right');
                });

            findOneStub.restore();
        });

        it('should compare and return equality when data are equal', function () {

            var findOneStub = sinon.stub(DiffModel, "findOne").resolves({
                code: 'abc123',
                left: 'battery',
                right: 'battery'
            });

            var result = this.diffService.compare('abc123');

            var message = result.then(
                (diffData) => {
                    findOneStub.calledOnce.should.be.equals(true);
                    diffData.message.should.be.equals('content_identical');
                });

            findOneStub.restore();
        });
    });

});