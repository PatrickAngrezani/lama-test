import {UpdateUserDto} from './dto.user/update-user.dto';
import {CreateUserDto} from './dto.user/create-user.dto';
import {UserService} from './user.service';
import {Test, TestingModule} from '@nestjs/testing';
import {UserController} from './user.controller';
import {UserEntity} from './entities/user.entity';

//const[] (mock)
const userEntityList: UserEntity[] = [
  new UserEntity(),
  new UserEntity(),
  new UserEntity(),
];
const newUserEntity = new UserEntity();
const oneUserEntity = new UserEntity();
const updatedUserEntity = new UserEntity();
const removedUserEntityList = new UserEntity();
const removedUserEntity = new UserEntity();

describe('userController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(newUserEntity),
            findAll: jest.fn().mockResolvedValue(userEntityList),
            findOne: jest.fn().mockResolvedValue(oneUserEntity),
            update: jest.fn().mockResolvedValue(updatedUserEntity),
            removeAll: jest.fn().mockResolvedValue(removedUserEntityList),
            remove: jest.fn().mockResolvedValue(removedUserEntity),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  //defined
  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  //findAll
  describe('findAll', () => {
    it('should return a usersList succesfully', async () => {
      //act
      const result = await userController.findAll();
      //assert
      expect(result).toEqual(userEntityList);
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });

    //findAll(exception)
    it('should throw an exception', () => {
      //arrange
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error());
      //assert
      expect(userController.findAll()).rejects.toThrowError();
    });

    //create
    describe('create', () => {
      it('should create a new user succesfully', async () => {
        //arrange
        const body: CreateUserDto = {
          User: 'teste',
          Email: 'teste@gmail.com',
          Phone: '5551998707070',
        };

        //act
        const result = await userController.create(body);

        //assert
        expect(result).toEqual(newUserEntity);
        expect(userService.create).toHaveBeenCalledTimes(1);
        expect(userService.create).toHaveBeenCalledWith(body);
      });

      //create(exception)
      it('should throw an exception', () => {
        //arrange
        const body: CreateUserDto = {
          User: 'teste',
          Email: 'teste@gmail.com',
          Phone: '5551998707070',
        };
        jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());
        //assert
        expect(userController.create(body)).rejects.toThrowError();
      });

      //findOne
      describe('findOne', () => {
        it('should return just an user', async () => {
          //act
          const result = await userController.findOne('id');
          //assert
          expect(result).toEqual(oneUserEntity);
          expect(userService.findOne).toHaveBeenCalledTimes(1);
        });

        //findOne(exception)
        it('should throw an exception', () => {
          //arrange
          jest.spyOn(userService, 'findOne').mockRejectedValueOnce(new Error());
          //assert
          expect(userController.findOne('id')).rejects.toThrowError();
        });

        //update
        describe('update', () => {
          it('should update an user succesfully', async () => {
            //arrange
            const body: UpdateUserDto = {
              User: 'mockTest',
              Email: 'mocktest@gmail.com',
              Phone: '5551985647070',
            };
            //act
            const result = await userController.update('id', body);
            //assert
            expect(result).toEqual(updatedUserEntity);
            expect(userService.update).toHaveBeenCalledTimes(1);
          });

          //updated(exception)
          it('should throw an exception', () => {
            //arrange
            const body: UpdateUserDto = {
              User: 'mockTest',
              Email: 'mocktest@gmail.com',
              Phone: '5551985647070',
            };
            jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());
            //assert
            expect(userController.update('id', body)).rejects.toThrowError();
          });

          //removeAll
          describe('removeAll', () => {
            it('should delete all user', async () => {
              //act
              const result = await userController.removeAll();
              //assert
              expect(result).toEqual(removedUserEntityList);
              expect(userService.removeAll).toHaveBeenCalledTimes(1);
            });
          });

          //removeAll(exception)
          it('should throw an exception', () => {
            //arrange
            jest.spyOn(userService, 'removeAll').mockRejectedValueOnce(new Error());
            //assert
            expect(userController.removeAll()).rejects.toThrowError();
          });

          //removeOne
          describe('remove', () => {
            it('should remove an user', async () => {
              //act
              const result = await userController.remove('id');
              //assert
              expect(result).toEqual(removedUserEntity);
              expect(userService.remove).toHaveBeenCalledTimes(1);
            });
          });
          it('should throw an exception', () => {
            //arrange
            jest.spyOn(userService, 'remove').mockRejectedValueOnce(new Error());
            //assert
            expect(userController.remove('id')).rejects.toThrowError();
          });
        });
      });
    });
  });
});
