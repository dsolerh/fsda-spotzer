import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the version of the project', () => {
      /* it doesn't make much sense to test for the exact version since it's goin to
        change with each time I make an update, the point is this route should return something
        to test accurately I would have to repeat the same code here that I use in the service
       */
      expect(appController.getVersion()).toBeDefined();
    });
  });
});
