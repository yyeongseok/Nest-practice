import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { createBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Board } from './board.entity';
import { BoardStatus } from './boards.model';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository : BoardRepository
    ){}
    
    async getAllBoard(user : User) : Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board')

        query.where('board.userId = user.id', {userId: user.id})

        const board = await query.getMany()

        return board ;
    }

    async createBoard(createBoardDto: createBoardDto, user: User) : Promise <Board> {
        const {title, description} = createBoardDto
        
        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.boardRepository.save(board)
        return board

    }
        
    async getBoardById(id: number) : Promise <Board> {
        const found = await this.boardRepository.findOneBy({id})

        if(!found){
            throw new NotFoundException(`Cannot find with id ${id}`)
        }

        return found
    }

    async deleteBoardById(id: number) : Promise<void> {
        const result = await this.boardRepository.delete(id)

        if(result.affected === 0){
            throw new NotFoundException(`cannot delete with this id ${id}`)
        }
    }
    
    async updateBoardById(id: number, status : BoardStatus) : Promise <Board> {
        const board = await this.getBoardById(id)

        board.status = status;
        await this.boardRepository.save(board)

        return board
    }
}

