import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { Repository, EntityRepository } from "typeorm";
import { Board } from "./board.entity";
import { BoardStatus } from "./boards.model";
import { createBoardDto } from "./dto/create-board.dto";


@Injectable()
export class BoardRepository extends Repository<Board> {

    async createBoard(createBoardDto: createBoardDto, user:User) : Promise <Board> {
        const {title, description} = createBoardDto
        
        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user
        })

        await this.save(board)
        return board
    }
}


