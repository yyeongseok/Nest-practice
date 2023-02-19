import { Body, Controller, Delete, Get , Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get.user.decorater';
import { User } from 'src/auth/user.entity';
import { Board } from './board.entity';
import { BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { createBoardDto } from './dto/create-board.dto';
import { boardStatusValidationPipe } from './pipe/board-status-validation.pipe'
import { Logger } from '@nestjs/common'

@Controller('boards')
@UseGuards(AuthGuard('bearer'))
export class BoardsController {
    private Logger = new Logger('BoardsController')
  constructor(private boardsService: BoardsService) {}

    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoard()
    // }

    @Get('/')
    getAllBoard(@GetUser()user : User) : Promise<Board[]>{
        this.Logger.verbose(`User ${user.username} trying to get all board`)
        return this.boardsService.getAllBoard(user);
    }
    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto : createBoardDto
    //     ): Board {
    //         return this.boardsService.createBoard(createBoardDto)
    //     }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: createBoardDto,
    @GetUser() user: User) : Promise <Board> {
        this.Logger.verbose(`user ${user.username} creating a new board. payload ${JSON.stringify(createBoardDto)}`)
        return this.boardsService.createBoard(createBoardDto, user)
    };

    @Get('/:id')
    getBoardById(@Param('id') id: number ) : Promise <Board> {
        return this.boardsService.getBoardById(id)
    };

    @Delete('/:id')
    deleteBoardById(@Param('id', ParseIntPipe) id, ) : Promise <void>{
        return this.boardsService.deleteBoardById(id);
    }

    // @Delete('/:id')
    // deleteBoardById(@Param('id') id: string) : void {
    //     this.boardsService.deleteBoardById(id)
    // }

    @Patch('/:id/status')
    updateBoardId(
        @Param('id', ParseIntPipe) id:number,
        @Body('status', boardStatusValidationPipe) status: BoardStatus) : Promise<Board> {
            return this.boardsService.updateBoardById(id, status)
        }

    // @Patch('/:id/status')
    // updateBoardById(
    //     @Param('id') id: string,
    //     @Body ('status' , boardStatusValidationPipe) status: BoardStatus
    //     ) {
    //         return this.boardsService.updateBoardById(id, status);
    //     }
}

