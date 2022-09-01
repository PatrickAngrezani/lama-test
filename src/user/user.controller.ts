import { addPasswordDto } from './dto/addpassword.dto';
import {internalError} from './swagger/error/internal-error.swagger';
import {badRequestSwagger} from './swagger/error/bad-request.swagger';
import {userSwagger} from './swagger/user.swagger';
import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {createUserSwagger} from './swagger/createUser.swagger';
import {usersSwagger} from './swagger/users.swagger';
import {updateUserSwagger} from './swagger/updateUser.swagger';
import {notFoundSwagger} from './swagger/error/not-found.swagger';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //addPassword
  @Post('addPassword')
  addPassword(@Param('Id') Id: string, @Body() addPasswordDto: addPasswordDto) {
    return this.userService.addPassword(Id, addPasswordDto)
  }



  //verifyToken
  @ApiResponse({
    status: 500,
    description: 'Internal-error',
    type: internalError,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    type: badRequestSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 201,
    description: 'Token verified succesfully',
    isArray: true,
  })
  @ApiOperation({summary: 'AuthToken'})
  @Get('verify')
  verifyToken(@Param('Id') Id: string) {
    return this.userService.verifyToken();
  }

  //create
  @ApiResponse({
    status: 500,
    description: 'Internal-error',
    type: internalError,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    type: badRequestSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 201,
    description: 'User added succesfully',
    type: createUserSwagger,
    isArray: true,
  })
  @ApiOperation({summary: 'Add new user'})
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  //findAll
  @ApiResponse({
    status: 500,
    description: 'Interna-error',
    type: internalError,
    isArray: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Users List',
    type: usersSwagger,
    isArray: true,
  })
  @ApiOperation({summary: 'Get all users'})
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  //findOne
  @ApiResponse({
    status: 500,
    description: 'Interna-error',
    type: internalError,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: notFoundSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 200,
    description: 'UserData returned succesfully',
    type: userSwagger,
    isArray: true,
  })
  @ApiOperation({summary: 'Get an user'})
  @Get('id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  //update
  @ApiResponse({
    status: 500,
    description: 'Interna-error',
    type: internalError,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid parameters',
    type: badRequestSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: notFoundSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 200,
    description: 'UserData updated succesfully',
    type: updateUserSwagger,
    isArray: true,
  })
  @ApiOperation({summary: 'Update user'})
  @Patch()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  //removeAll
  @ApiResponse({
    status: 500,
    description: 'Interna-error',
    type: internalError,
    isArray: true,
  })
  @ApiResponse({
    status: 200,
    description: 'All UsersData removed succesfully',
    isArray: true,
  })
  @ApiOperation({summary: 'Remove all users'})
  @Delete()
  removeAll() {
    return this.userService.removeAll();
  }

  //removeOne
  @ApiResponse({
    status: 500,
    description: 'Interna-error',
    type: internalError,
    isArray: true,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: notFoundSwagger,
    isArray: true,
  })
  @ApiResponse({status: 204, description: 'UserData removed succesfully'})
  @ApiOperation({summary: 'Remove especific user'})
  @Delete('id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
