import { DatabaseConnector } from '../../../../../../contexts/shared/domain/contracts/database-connector';
import { Pool } from 'pg';
import { DeliveryMethodRepository } from '../../../../../../contexts/delivery-methods/domain/contracts/delivery-method.repository';
import { DeliveryMethod } from '../../../../../../contexts/delivery-methods/domain/models/delivery-method.entity';
import { DeliveryMethodPostgresDTO } from '../../../../../../contexts/delivery-methods/infrastructure/database/postgresql/postgresql-delivery-method.mapper';
import { postgresqlDeliveryMethodRepositoryBuilder } from '../../../../../../contexts/delivery-methods/infrastructure/database/postgresql/postgresql-delivery-method.repository';
import { DeliveryMethodBuilder } from '../../../__mocks__/delivery-method.builder';

describe('PostgreSQL Delivery method repository', () => {
  let queryMock: jest.Mock;
  let clientQueryMock: jest.Mock;
  let databaseConnectorMock: DatabaseConnector<Pool>;
  let postgresRepository: DeliveryMethodRepository;

  let validResult: DeliveryMethod;
  let validDTO: DeliveryMethodPostgresDTO;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    queryMock = jest.fn().mockImplementation(() => ({ rows: [], rowCount: 0 }));
    clientQueryMock = jest.fn().mockImplementation(() => ({ rows: [], rowCount: 0 }));

    databaseConnectorMock = {
      async getConnection(): Promise<Pool> {
        return {
          query: queryMock,
          connect: jest.fn(() => ({
            query: clientQueryMock,
            release: jest.fn()
          }))
        } as unknown as Pool;
      }
    };

    postgresRepository = postgresqlDeliveryMethodRepositoryBuilder({
      databaseConnector: databaseConnectorMock
    });

    validDTO = DeliveryMethodBuilder().buildDto();
    validResult = DeliveryMethodBuilder().build();
  });

  describe('findByCountry', () => {
    it('should return the delivery method data', async () => {
      queryMock.mockReturnValueOnce({
        rows: [validDTO, validDTO],
        rowCount: 2
      });

      const result = await postgresRepository.findByCountry();
      expect(result).toHaveLength(2);
      expect(result[1]).toMatchObject(validResult);
    });

    it('should return the empty array', async () => {
      queryMock.mockReturnValueOnce({
        rows: [],
        rowCount: 0
      });

      const result = await postgresRepository.findByCountry();
      expect(result).toHaveLength(0);
      expect(result).toMatchObject([]);
    });

    it('should call the sql sentence that get the delivery method data grouped by country', async () => {
      queryMock.mockReturnValueOnce({
        rows: [{ ...validDTO, file_type: undefined }],
        rowCount: 1
      });

      await postgresRepository.findByCountry();
      expect(queryMock).toHaveBeenCalledWith(
        'select country, delivery_method, count(*) from malware.malware_data_filtered GROUP BY country, delivery_method ORDER BY country asc, count(*) desc',
        []
      );
    });
  });

  describe('findByMalwareType', () => {
    it('should return the delivery method data', async () => {
      queryMock.mockReturnValueOnce({
        rows: [validDTO, validDTO],
        rowCount: 2
      });

      const result = await postgresRepository.findByMalwareType();
      expect(result).toHaveLength(2);
      expect(result[1]).toMatchObject(validResult);
    });

    it('should return the empty array', async () => {
      queryMock.mockReturnValueOnce({
        rows: [],
        rowCount: 0
      });

      const result = await postgresRepository.findByMalwareType();
      expect(result).toHaveLength(0);
      expect(result).toMatchObject([]);
    });

    it('should call the sql sentence that get the delivery method data grouped by malware type', async () => {
      queryMock.mockReturnValueOnce({
        rows: [{ ...validDTO, file_type: undefined }],
        rowCount: 1
      });

      await postgresRepository.findByMalwareType();
      expect(queryMock).toHaveBeenCalledWith(
        'select malware_type, delivery_method, count(*) from malware.malware_data_filtered WHERE year = 2022 GROUP BY malware_type, delivery_method ORDER BY malware_type asc, count(*) desc',
        []
      );
    });
  });

  describe('findByFileType', () => {
    it('should return the delivery method data', async () => {
      queryMock.mockReturnValueOnce({
        rows: [validDTO, validDTO],
        rowCount: 2
      });

      const result = await postgresRepository.findByFileType();
      expect(result).toHaveLength(2);
      expect(result[1]).toMatchObject(validResult);
    });

    it('should return the empty array', async () => {
      queryMock.mockReturnValueOnce({
        rows: [],
        rowCount: 0
      });

      const result = await postgresRepository.findByFileType();
      expect(result).toHaveLength(0);
      expect(result).toMatchObject([]);
    });

    it('should call the sql sentence that get the delivery method data grouped by malware type', async () => {
      queryMock.mockReturnValueOnce({
        rows: [{ ...validDTO, file_type: undefined }],
        rowCount: 1
      });

      await postgresRepository.findByFileType();
      expect(queryMock).toHaveBeenCalledWith(
        'select file_type, delivery_method, count(*) from malware.malware_data_filtered WHERE year = 2022 GROUP BY file_type, delivery_method ORDER BY file_type asc, count(*) desc',
        []
      );
    });
  });
});
