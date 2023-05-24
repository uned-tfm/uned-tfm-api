import { DatabaseConnector } from '../../../../../../contexts/shared/domain/contracts/database-connector';
import { Pool } from 'pg';
import { FileFeatureRepository } from '../../../../../../contexts/file-features/domain/contracts/file-feature.repository';
import { FileFeature } from '../../../../../../contexts/file-features/domain/models/file-feature.entity';
import { FileFeaturePostgresDTO } from '../../../../../../contexts/file-features/infrastructure/database/postgresql/postgresql-file-feature.mapper';
import { postgresqlFileFeatureRepositoryBuilder } from '../../../../../../contexts/file-features/infrastructure/database/postgresql/postgresql-file-feature.repository';
import { FileFeatureBuilder } from '../../../__mocks__/file-feature.builder';

describe('PostgreSQL File feature repository', () => {
  let queryMock: jest.Mock;
  let clientQueryMock: jest.Mock;
  let databaseConnectorMock: DatabaseConnector<Pool>;
  let postgresRepository: FileFeatureRepository;

  let validResult: FileFeature;
  let validDTO: FileFeaturePostgresDTO;

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

    postgresRepository = postgresqlFileFeatureRepositoryBuilder({
      databaseConnector: databaseConnectorMock
    });

    validDTO = FileFeatureBuilder().buildDto();
    validResult = FileFeatureBuilder().build();
  });

  describe('findAvgByMalwareType', () => {
    it('should return the file feature data', async () => {
      queryMock.mockReturnValueOnce({
        rows: [validDTO, validDTO],
        rowCount: 2
      });

      const result = await postgresRepository.findAvgByMalwareType();
      expect(result).toHaveLength(2);
      expect(result[1]).toMatchObject(validResult);
    });

    it('should return the empty array', async () => {
      queryMock.mockReturnValueOnce({
        rows: [],
        rowCount: 0
      });

      const result = await postgresRepository.findAvgByMalwareType();
      expect(result).toHaveLength(0);
      expect(result).toMatchObject([]);
    });

    it('should call the sql sentence that get the file feature data grouped by malware type', async () => {
      queryMock.mockReturnValueOnce({
        rows: [{ ...validDTO, file_type: undefined }],
        rowCount: 1
      });

      await postgresRepository.findAvgByMalwareType();
      expect(queryMock).toHaveBeenCalledWith(
        'select malware_type, avg(file_size) as result from malware.malware_data_filtered GROUP BY malware_type ORDER BY malware_type asc, avg(file_size) desc',
        []
      );
    });
  });

  describe('findAvgByFileType', () => {
    it('should return the file feature data', async () => {
      queryMock.mockReturnValueOnce({
        rows: [validDTO, validDTO],
        rowCount: 2
      });

      const result = await postgresRepository.findAvgByFileType();
      expect(result).toHaveLength(2);
      expect(result[1]).toMatchObject(validResult);
    });

    it('should return the empty array', async () => {
      queryMock.mockReturnValueOnce({
        rows: [],
        rowCount: 0
      });

      const result = await postgresRepository.findAvgByFileType();
      expect(result).toHaveLength(0);
      expect(result).toMatchObject([]);
    });

    it('should call the sql sentence that get the file feature data grouped by file type', async () => {
      queryMock.mockReturnValueOnce({
        rows: [{ ...validDTO, malware_type: undefined }],
        rowCount: 1
      });

      await postgresRepository.findAvgByFileType();
      expect(queryMock).toHaveBeenCalledWith(
        'select file_type, avg(file_size) as result from malware.malware_data_filtered GROUP BY file_type ORDER BY file_type asc, avg(file_size) desc',
        []
      );
    });
  });

  describe('findByFileType', () => {
    it('should return the file feature data', async () => {
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

    it('should call the sql sentence that get the file feature data grouped by file type', async () => {
      queryMock.mockReturnValueOnce({
        rows: [{ ...validDTO, malware_type: undefined }],
        rowCount: 1
      });

      await postgresRepository.findByFileType();
      expect(queryMock).toHaveBeenCalledWith(
        'select file_type, count(*) as result from malware.malware_data_filtered GROUP BY file_type ORDER BY count(*) desc',
        []
      );
    });
  });

  describe('findByMalwareAndFileType', () => {
    it('should return the file feature data', async () => {
      queryMock.mockReturnValueOnce({
        rows: [validDTO, validDTO],
        rowCount: 2
      });

      const result = await postgresRepository.findByMalwareAndFileType();
      expect(result).toHaveLength(2);
      expect(result[1]).toMatchObject(validResult);
    });

    it('should return the empty array', async () => {
      queryMock.mockReturnValueOnce({
        rows: [],
        rowCount: 0
      });

      const result = await postgresRepository.findByMalwareAndFileType();
      expect(result).toHaveLength(0);
      expect(result).toMatchObject([]);
    });

    it('should call the sql sentence that get the file feature data grouped by malware type', async () => {
      queryMock.mockReturnValueOnce({
        rows: [{ ...validDTO }],
        rowCount: 1
      });

      await postgresRepository.findByMalwareAndFileType();
      expect(queryMock).toHaveBeenCalledWith(
        'select malware_type, file_type, count(*) as result from malware.malware_data_filtered GROUP BY malware_type, file_type ORDER BY malware_type asc, count(*) desc',
        []
      );
    });
  });
});
