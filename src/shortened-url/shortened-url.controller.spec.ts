import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedUrlController } from './shortened-url.controller';
import { ShortenedUrlService } from './shortened-url.service';

describe('ShortenedUrlController', () => {
  let controller: ShortenedUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenedUrlController],
      providers: [ShortenedUrlService],
    }).compile();

    controller = module.get<ShortenedUrlController>(ShortenedUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
