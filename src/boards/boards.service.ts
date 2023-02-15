import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid'
import { BoardRepository } from './board.repository';
import { createBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Board } from './board.entity';
import { BoardStatus } from './boards.model';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository : BoardRepository
    ){}

    // getAllBoard(): Board[] {
    //     return this.boards
    // }
    
    async getAllBoard() : Promise<Board[]> {
        return this.boardRepository.find();
    }

    // createBoard(createBoardDto: createBoardDto) {
    //     const { title, description } = createBoardDto
    //     const board : Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }
    //     this.boards.push(board)
    //     return board;
    // } 

    async createBoard(createBoardDto: createBoardDto) : Promise <Board> {
        const {title, description} = createBoardDto
        
        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.boardRepository.save(board)
        return board

        // return this.boardRepository.createBoard(createBoardDto)
    }
        
        // getBoardById( id: string ) : Board {
        //     const found = this.boards.find((board) => board.id === id);
            
        //     if(!found) {
        //         throw new NotFoundException(`Cannot find with id ${id}`)
        //     }
    
        //     return found 
        // }
    async getBoardById(id: number) : Promise <Board> {
        const found = await this.boardRepository.findOneBy({id})

        if(!found){
            throw new NotFoundException(`Cannot find with id ${id}`)
        }

        return found
    }


    // deleteBoardById( id : string ) : void {
    //     const found = this.getBoardById(id)
            
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    async deleteBoardById(id: number) : Promise<void> {
        const result = await this.boardRepository.delete(id)

        if(result.affected === 0){
            throw new NotFoundException(`cannot delete with this id ${id}`)
        }
    }
    // updateBoardById( id: string, status: BoardStatus) : Board {
    //     const board = this.getBoardById(id)
    //     board.status = status
    //     return board
    // }
    
    async updateBoardById(id: number, status : BoardStatus) : Promise <Board> {
        const board = await this.getBoardById(id)

        board.status = status;
        await this.boardRepository.save(board)

        return board
    }
}

