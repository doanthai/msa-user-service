import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCore } from './schemas/user-core.schema';
import { UserCoreService } from './user-core.service';

const mockUserCore = {
  firstName: 'doan',
  lastName: 'thai',
  username: 'doanthai',
};

const mockUserCoreCreated = {
  phone: 'phone1',
  password: 'password1',
  username: 'username1',
};

describe('UserCoreService', () => {
  let service: UserCoreService;
  let model: Model<UserCore>;

  const userCoresArray = [
    {
      firstName: 'firstName1',
      lastName: 'lastName1',
      username: 'username1',
    },
    {
      firstName: 'firstName2',
      lastName: 'lastName2',
      username: 'username2',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCoreService,
        {
          provide: getModelToken('UserCore'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUserCore),
            constructor: jest.fn().mockResolvedValue(mockUserCore),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserCoreService>(UserCoreService);
    model = module.get<Model<UserCore>>(getModelToken('UserCore'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all user cores', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(userCoresArray),
    } as any);
    const userCores = await service.findAll();
    expect(userCores).toEqual(userCoresArray);
  });

  it(
    'should insert a new user core', async () => {
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockUserCoreCreated));
    const newCat = await service.create({
      phone: 'phone1',
      password: 'password1',
      username: 'username1',
    });
    expect(newCat).toEqual(mockUserCoreCreated);
  });
});
