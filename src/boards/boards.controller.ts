import { Body, Controller, Delete, Get , Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board } from './board.entity';
import { BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { createBoardDto } from './dto/create-board.dto';
import { boardStatusValidationPipe } from './pipe/board-status-validation.pipe'

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoard()
    // }

    @Get('/')
    getAllBoard() : Promise<Board[]>{
        return this.boardsService.getAllBoard();
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
    createBoard(@Body() createBoardDto: createBoardDto) : Promise <Board> {
        return this.boardsService.createBoard(createBoardDto)
    };

    @Get('/:id')
    getBoardById(@Param('id') id: number ) : Promise <Board> {
        return this.boardsService.getBoardById(id)
    };

    @Delete('/:id')
    deleteBoardById(@Param('id', ParseIntPipe) id ) : Promise <void>{
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

