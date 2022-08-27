import {CreateUserDto} from './dto/create-user.dto';
import {UserEntity} from './entities/user.entity';
import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {UserService} from './user.service';
import {Repository} from 'typeorm';
import {UpdateUserDto} from './dto/update-user.dto';

//const[] (mock)
const newUserEntity = new UserEntity();
const userEntityList: UserEntity[] = [
  new UserEntity(),
  new UserEntity(),
  new UserEntity(),
];
const userEntity = new UserEntity();
const updatedUserEntity = new UserEntity();
const removedUserEntity = new UserEntity();

describe('userService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn().mockReturnValue(newUserEntity),
            save: jest.fn().mockResolvedValue(newUserEntity),
            findAll: jest.fn().mockReturnValue(userEntityList),
            find: jest.fn().mockReturnValue(userEntityList),
            findOne: jest.fn().mockReturnValue(userEntity),
            update: jest.fn().mockResolvedValue(updatedUserEntity),
            removeAll: jest.fn().mockResolvedValue(removedUserEntity),
            remove: jest.fn().mockReturnValue(removedUserEntity),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));
  });

  //defined
  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  //create
  describe('create', () => {
    it('should create a new user', async () => {
      //arrange
      const body: CreateUserDto = {
        User: 'teste',
        Email: 'teste@email.com',
        Phone: '5551980327070',
      };
      //act
      const result = await userService.create(body);
      //assert
      expect(result).toEqual(newUserEntity);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    //create(exception)
    it('should throw an exception', () => {
      //arrange
      const body: CreateUserDto = {
        User: 'teste',
        Email: 'teste@email.com',
        Phone: '5551980327070',
      };
      jest.spyOn(userRepository, 'save').mockRejectedValueOnce(new Error());
      //assert
      expect(userService.create(body)).rejects.toThrowError();
    });
  });

  //findAll
  describe('findAll', () => {
    it('should return userList', async () => {
      //act
      const result = await userService.findAll();
      //assert
      expect(result).toEqual(userEntityList);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    //findAll(exception)
    it('should throw an exception', () => {
      //act
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());
      //assert
      expect(userService.findAll()).rejects.toThrowError();
    });
  });

  //findOne
  describe('findOne', () => {
    it('should return just an user', async () => {
      //act
      const result = await userService.findOne('id');
      //assert
      expect(result).toEqual(userEntity);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    //findOne(exception)
    it('should throw an exception', () => {
      //act
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
      //assert
      expect(userService.findOne('id')).rejects.toThrowError();
    });
  });

  //update
  describe('update', () => {
    it('should update an user', async () => {
      //arrange
      const body: UpdateUserDto = {
        User: 'mockTest',
        Email: 'mocktest@gmail.com',
        Phone: '5551985647070',
      };
      //act
      const result = await userService.update('id', body);
      //assert
      expect(result).toEqual(updatedUserEntity);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    //updated(exception)
    it('should throw an exception', () => {
      //arrange
      const body: UpdateUserDto = {
        User: 'mockTest',
        Email: 'mocktest@gmail.com',
        Phone: '5551985647070',
      };
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
      //assert
      expect(userService.update('id', body)).rejects.toThrowError();
    });
  });

  //removeAll
  describe('removeAll', () => {
    it('should remove all users', async () => {
      //act
      const result = await userService.removeAll();
      //assert
      expect(result).toBe(removedUserEntity);
      expect(userRepository.remove).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      //arrange
      jest.spyOn(userRepository, 'remove').mockRejectedValueOnce(new Error());
      //assert
      expect(userService.removeAll()).rejects.toThrowError();
    });
  });

  //remove
  describe('remove', () => {
    it('remove just an user', async () => {
      //act
      const result = await userService.remove('id');
      //assert
      expect(result).toBe(removedUserEntity);
      expect(userRepository.remove).toHaveBeenCalledTimes(1);
    });
  });

  it('should throw an exception', () => {
    //arrange
    jest.spyOn(userRepository, 'remove').mockRejectedValueOnce(new Error());
    //assert
    expect(userService.remove('id')).rejects.toThrowError();
  });
});
