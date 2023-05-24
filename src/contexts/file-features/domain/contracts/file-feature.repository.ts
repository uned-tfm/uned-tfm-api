import { FileFeature } from '../models/file-feature.entity';

export interface FileFeatureRepository {
  findAvgByMalwareType(): Promise<FileFeature[]>;
  findAvgByFileType(): Promise<FileFeature[]>;
  findByFileType(): Promise<FileFeature[]>;
  findByMalwareAndFileType(): Promise<FileFeature[]>;
}
