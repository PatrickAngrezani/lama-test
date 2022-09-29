import {internalError} from './swagger.user/error/internal-error.swagger';
import {badRequestSwagger} from './swagger.user/error/bad-request.swagger';
import {userSwagger} from './swagger.user/user.swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
  Request,
  UseGuards,
} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto.user/create-user.dto';
import {UpdateUserDto} from './dto.user/update-user.dto';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {createUserSwagger} from './swagger.user/createUser.swagger';
import {usersSwagger} from './swagger.user/users.swagger';
import {updateUserSwagger} from './swagger.user/updateUser.swagger';
import {notFoundSwagger} from './swagger.user/error/not-found.swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    description: 'Internal-error',
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
  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  //getOne
  @ApiResponse({
    status: 500,
    description: 'Internal-error',
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
  @Get(':User')
  findOne(@Param('User') User: string) {
    return this.userService.findOne(User);
  }

  //update
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
  @UseGuards(JwtAuthGuard)
  @Patch(':User')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('User') User: string,
    @Response() res,
    @Request() req,
  ) {
    return this.userService.update(updateUserDto, User, res, req);
  }

  //removeAll
  @ApiResponse({
    status: 500,
    description: 'Internal-error',
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
    description: 'Internal-error',
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
  @Delete('delete/:Id')
  remove(@Param('Id') Id: string) {
    return this.userService.remove(Id);
  }
}
